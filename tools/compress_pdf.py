#!/usr/bin/env python3
"""
compress_pdf.py — shrink PDFs (Canva exports, posters, reports) for the portfolio
site with no visible quality loss, make a cover image, and print a ready-to-paste
entry for assets/guidance/guidance.js.

Setup (once):
    pip install pikepdf pillow          # required
    pip install pymupdf                 # optional, used to render the cover image

Usage (run from the repository folder):
    python tools/compress_pdf.py "Guide book Kelompok X.pdf" --cohort 2025 --name smart-greenhouse
      -> assets/guidance/2025/smart-greenhouse.pdf   (compressed)
         assets/guidance/2025/smart-greenhouse.webp  (cover, page 1)
         + prints a guidance.js entry to copy

    python tools/compress_pdf.py a.pdf b.pdf --cohort 2025      # several files, names from file names
    python tools/compress_pdf.py big.pdf --out small.pdf         # just compress, anywhere

Options:
    --max-px N      longest side for embedded images (default 3000 px for 1-page posters,
                    2000 px for multi-page documents — sharp at full-screen reading size)
    --quality 84    JPEG quality for photo-like images
    --no-cover      skip the cover image

What it does (lossless unless an image is larger than --max-px):
  1. removes duplicate images / fonts / graphics (Canva repeats them on every page)
  2. downsizes images bigger than --max-px, re-encodes photos as JPEG when that is much smaller,
     and stores everything else with PNG-style prediction (lossless)
  3. recompresses page content at maximum level
  The original is never modified; if the result is not smaller, the original is copied.
"""
import argparse, glob, hashlib, io, os, re, shutil, struct, subprocess, sys, tempfile, zlib
from pathlib import Path

try:
    import pikepdf
    from pikepdf import Name, Dictionary
    from PIL import Image
except ImportError:
    sys.exit("Missing packages. Run:  pip install pikepdf pillow")

ROOT = Path(__file__).resolve().parent.parent
Image.MAX_IMAGE_PIXELS = None


# ---------------------------------------------------------------- dedupe
def _norm(v, remap):
    if isinstance(v, pikepdf.Object) and v.is_indirect:
        og = v.objgen
        return ("ref",) + remap.get(og, og)
    if isinstance(v, (pikepdf.Dictionary, pikepdf.Stream)):
        return ("dict", tuple(sorted((k, _norm(v[k], remap)) for k in v.keys() if k != "/Length")))
    if isinstance(v, pikepdf.Array):
        return ("arr", tuple(_norm(x, remap) for x in v))
    return ("val", str(v))


def _repoint(container, remap, objs):
    items = container.items() if isinstance(container, (pikepdf.Dictionary, pikepdf.Stream)) else enumerate(container)
    for k, v in list(items):
        if not isinstance(v, pikepdf.Object):
            continue
        if v.is_indirect:
            if v.objgen in remap:
                container[k] = objs[remap[v.objgen]]
        elif isinstance(v, (pikepdf.Dictionary, pikepdf.Array)):
            _repoint(v, remap, objs)


def dedupe(pdf):
    """Merge byte-identical streams (images, masks, fonts, glyph procedures, forms)."""
    remap, total = {}, 0
    for _ in range(4):  # repeat: merging masks can make their parent images identical
        canon, new = {}, {}
        streams = [o for o in pdf.objects if isinstance(o, pikepdf.Stream) and o.objgen not in remap]
        for o in streams:
            try:
                key = (hashlib.md5(o.read_raw_bytes()).hexdigest(), _norm(o.stream_dict, remap))
            except Exception:
                continue
            if key in canon:
                new[o.objgen] = canon[key]
            else:
                canon[key] = o.objgen
        if not new:
            break
        remap.update(new)
        total += len(new)
        objs = {o.objgen: o for o in pdf.objects if isinstance(o, pikepdf.Stream)}
        for o in list(pdf.objects):
            if isinstance(o, (pikepdf.Dictionary, pikepdf.Stream, pikepdf.Array)):
                _repoint(o, new, objs)
        for p in pdf.pages:
            _repoint(p.obj, new, objs)
    return total


# ---------------------------------------------------------------- images
def _components(img):
    cs = img.get("/ColorSpace")
    if cs == Name.DeviceGray:
        return 1
    if cs == Name.DeviceRGB:
        return 3
    if cs == Name.DeviceCMYK:
        return 4
    if isinstance(cs, pikepdf.Array) and len(cs) > 1 and cs[0] == Name.ICCBased:
        try:
            return int(cs[1].get("/N"))
        except Exception:
            return None
    return None


def _png_idat(im):
    """Deflate data with PNG row filters == PDF FlateDecode + /Predictor 15."""
    buf = io.BytesIO()
    im.save(buf, "PNG", optimize=True)
    data, pos, out = buf.getvalue(), 8, b""
    while pos < len(data):
        ln = struct.unpack(">I", data[pos:pos + 4])[0]
        if data[pos + 4:pos + 8] == b"IDAT":
            out += data[pos + 8:pos + 8 + ln]
        pos += 12 + ln
    return out


TRANSPORT = {Name.FlateDecode, Name("/ASCII85Decode"), Name("/ASCIIHexDecode"), Name("/LZWDecode"), Name("/RunLengthDecode")}


def _filters(img):
    f = img.get("/Filter")
    if f is None:
        return []
    return list(f) if isinstance(f, pikepdf.Array) else [f]


def _unwrap(data, filters):
    """Undo transport encodings (applied in order) that sit in front of a JPEG."""
    import base64
    for f in filters:
        if f == Name("/ASCII85Decode"):
            t = data.strip()
            if t.startswith(b"<~"):
                t = t[2:]
            t = t.split(b"~>")[0]
            data = base64.a85decode(b"".join(t.split()), adobe=False)
        elif f == Name("/ASCIIHexDecode"):
            t = b"".join(data.split()).split(b">")[0]
            data = bytes.fromhex((t + (b"0" if len(t) % 2 else b"")).decode())
        elif f == Name.FlateDecode:
            data = zlib.decompress(data)
        else:
            return None
    return data


def _decode(img):
    """Return (PIL image, kind) for images we can safely re-encode, else (None, None)."""
    if img.get("/ImageMask") or int(img.get("/BitsPerComponent", 8)) != 8:
        return None, None
    filters, n = _filters(img), _components(img)
    w, h = int(img.Width), int(img.Height)
    try:
        if filters and filters[-1] == Name.DCTDecode and all(f in TRANSPORT for f in filters[:-1]):
            jpg = _unwrap(img.read_raw_bytes(), filters[:-1])
            if jpg is None:
                return None, None
            im = Image.open(io.BytesIO(jpg))
            if im.size != (w, h) or im.mode not in ("L", "RGB", "CMYK"):
                return None, None
            if im.mode == "CMYK" and n != 4:
                return None, None
            if "/Decode" in img and im.mode != "CMYK":
                return None, None
            im.load()
            return im, "jpeg"
        if n in (1, 3) and "/Decode" not in img and all(f in TRANSPORT for f in filters):
            data = img.read_bytes()
            if len(data) != w * h * n:
                return None, None
            return Image.frombytes("L" if n == 1 else "RGB", (w, h), data), "flate"
    except Exception:
        pass
    return None, None


def _encode_cmyk(im, quality):
    """Re-encode CMYK as JPEG with the same Adobe convention Pillow reads back (checked)."""
    b = io.BytesIO()
    im.save(b, "JPEG", quality=quality, optimize=True)
    data = b.getvalue()
    back = Image.open(io.BytesIO(data)).convert("CMYK").resize((32, 32)).tobytes()
    ref = im.resize((32, 32)).tobytes()
    diff = sum(abs(x - y) for x, y in zip(back, ref)) / len(ref)
    return data if diff < 6 else None


def recompress_images(pdf, max_px, quality):
    saved = 0
    images = [o for o in pdf.objects if isinstance(o, pikepdf.Stream) and o.get("/Subtype") == Name.Image]
    for img in images:
        im, kind = _decode(img)
        if im is None:
            continue
        old = len(img.read_raw_bytes())
        w, h = im.size
        if max(w, h) > max_px:
            s = max_px / max(w, h)
            im = im.resize((max(1, round(w * s)), max(1, round(h * s))), Image.LANCZOS)
        resized = im.size != (w, h)
        if kind == "jpeg" and not resized:
            continue  # never re-compress a JPEG at the same size (generation loss)
        options = []
        if im.mode == "CMYK":
            if not resized:
                continue
            jpg = _encode_cmyk(im, max(quality, 88))
            if jpg is None:
                continue
            options.append(("jpeg", jpg))
        if kind == "flate" or im.mode == "L":
            options.append(("flate", _png_idat(im)))
        if im.mode == "RGB":
            b = io.BytesIO()
            im.save(b, "JPEG", quality=quality, optimize=True)
            jpg = b.getvalue()
            # JPEG only for photo-like content (much smaller than lossless) or original JPEGs
            if kind == "jpeg" or not options or len(jpg) < 0.6 * len(options[0][1]):
                options.append(("jpeg", jpg))
        enc, data = min(options, key=lambda x: len(x[1]))
        if len(data) >= old and not resized:
            continue
        if enc == "jpeg" and len(_filters(img)) > 1 and "/DecodeParms" in img:
            del img["/DecodeParms"]
        if enc == "flate":
            img.write(data, filter=Name.FlateDecode,
                      decode_parms=Dictionary(Predictor=15, Colors=1 if im.mode == "L" else 3,
                                              BitsPerComponent=8, Columns=im.size[0]))
        else:
            img.write(data, filter=Name.DCTDecode)
            if "/DecodeParms" in img:
                del img["/DecodeParms"]
        img.Width, img.Height = im.size
        saved += old - len(data)
    return saved


def recompress_streams(pdf):
    saved = 0
    for o in pdf.objects:
        if not isinstance(o, pikepdf.Stream) or o.get("/Subtype") == Name.Image:
            continue
        if o.get("/Filter") != Name.FlateDecode or "/DecodeParms" in o:
            continue
        try:
            raw, data = o.read_raw_bytes(), o.read_bytes()
        except Exception:
            continue
        z = zlib.compress(data, 9)
        if len(z) < len(raw):
            o.write(z, filter=Name.FlateDecode)
            saved += len(raw) - len(z)
    return saved


def compress(src, dst, max_px=None, quality=84):
    before = os.path.getsize(src)
    with pikepdf.open(src) as pdf:
        pages = len(pdf.pages)
        try:
            box = [float(x) for x in pdf.pages[0].mediabox]
            pw, ph = abs(box[2] - box[0]), abs(box[3] - box[1])
            if int(pdf.pages[0].obj.get("/Rotate", 0)) % 180:
                pw, ph = ph, pw
            landscape = pw > ph * 1.05
        except Exception:
            landscape = False
        if not max_px:  # posters (1 page) get zoomed in more than multi-page books
            max_px = 3000 if pages == 1 else 2000
        dup = dedupe(pdf)
        recompress_images(pdf, max_px, quality)
        recompress_streams(pdf)
        tmp = str(dst) + ".tmp"
        pdf.save(tmp, compress_streams=True, object_stream_mode=pikepdf.ObjectStreamMode.generate)
    with pikepdf.open(tmp) as chk:  # sanity check
        assert len(chk.pages) == pages
    if os.path.getsize(tmp) < before:
        os.replace(tmp, dst)
    else:
        os.remove(tmp)
        shutil.copyfile(src, dst)
    return before, os.path.getsize(dst), pages, dup, landscape


# ---------------------------------------------------------------- cover
def _cover_pymupdf(pdf_path, width):
    import fitz  # PyMuPDF
    doc = fitz.open(str(pdf_path))
    page = doc[0]
    z = width / page.rect.width
    pix = page.get_pixmap(matrix=fitz.Matrix(z, z), alpha=False)
    return Image.frombytes("RGB", (pix.width, pix.height), pix.samples)


def _cover_pdfium(pdf_path, width):
    import pypdfium2 as pdfium
    doc = pdfium.PdfDocument(str(pdf_path))
    page = doc[0]
    return page.render(scale=width / page.get_width()).to_pil().convert("RGB")


def _cover_pdftoppm(pdf_path, width):
    if not shutil.which("pdftoppm"):
        raise RuntimeError("pdftoppm not found")
    with tempfile.TemporaryDirectory() as td:
        subprocess.run(["pdftoppm", "-f", "1", "-l", "1", "-scale-to-x", str(width), "-scale-to-y", "-1",
                        "-png", str(pdf_path), os.path.join(td, "c")], check=True, capture_output=True)
        im = Image.open(glob.glob(os.path.join(td, "c*.png"))[0])
        im.load()
        return im.convert("RGB")


def render_cover(pdf_path, out_path, width=720):
    for fn in (_cover_pymupdf, _cover_pdfium, _cover_pdftoppm):
        try:
            img = fn(pdf_path, width)
        except Exception:
            continue
        img.save(out_path, "WEBP", quality=80, method=6)
        return True
    return False


# ---------------------------------------------------------------- cli
def slug(text):
    s = re.sub(r"[^a-z0-9]+", "-", Path(text).stem.lower()).strip("-")
    return s or "document"


def main():
    ap = argparse.ArgumentParser(description="Compress PDFs for milhamat.github.io")
    ap.add_argument("files", nargs="+", help="PDF file(s) to compress")
    ap.add_argument("--cohort", help="cohort / angkatan, e.g. 2025 -> assets/guidance/2025/")
    ap.add_argument("--name", help="output file name without .pdf (single input only)")
    ap.add_argument("--out", help="explicit output path (single input only)")
    ap.add_argument("--max-px", type=int, default=None, help="default: 3000 for 1-page posters, 2000 otherwise")
    ap.add_argument("--quality", type=int, default=84)
    ap.add_argument("--no-cover", action="store_true")
    a = ap.parse_args()
    if (a.name or a.out) and len(a.files) > 1:
        ap.error("--name/--out work with a single input file")
    if not a.out and not a.cohort:
        ap.error("give --cohort (to place it on the site) or --out")

    entries = []
    for f in a.files:
        if not os.path.isfile(f):
            print(f"* {f}: file not found, skipped")
            continue
        if a.out:
            dst = Path(a.out)
        else:
            dst = ROOT / "assets" / "guidance" / str(a.cohort) / ((a.name or slug(f)) + ".pdf")
        dst.parent.mkdir(parents=True, exist_ok=True)
        print(f"* {f}")
        before, after, pages, dup, landscape = compress(f, dst, a.max_px, a.quality)
        print(f"  {before / 1e6:.1f} MB -> {after / 1e6:.1f} MB  ({pages} pages, {dup} duplicates merged)  {dst}")
        if after > 25 * 1024 * 1024:
            print("  ! still over 25 MB (GitHub web-upload limit): try --max-px 1600 --quality 78")
        cover = None
        if not a.no_cover:
            cpath = dst.with_suffix(".webp")
            if render_cover(dst, cpath):
                cover = cpath
                print(f"  cover: {cpath}")
            else:
                print("  (no cover made: run `pip install pymupdf` to enable; the site will render page 1 itself)")
        if a.cohort:
            def rel(p):
                if not p:
                    return None
                try:
                    return p.resolve().relative_to(ROOT).as_posix()
                except ValueError:
                    return p.resolve().as_posix()
            entries.append((a.cohort, rel(dst), rel(cover), pages, landscape))

    if entries:
        print("\nPaste into assets/guidance/guidance.js (inside the [ ... ] list, after the last entry):\n")
        for cohort, file, thumb, pages, landscape in entries:
            print("  ,{")
            print(f"    cohort: {cohort},")
            print(f'    file: "{file}",')
            if thumb:
                print(f'    thumb: "{thumb}",')
            print(f"    pages: {pages},")
            if landscape:
                print("    landscape: true,")
            print('    title: { en: "TITLE", id: "JUDUL" },')
            print('    team: "Group name",')
            print('    students: ["Name 1", "Name 2"],')
            print('    course: "Machine Learning",')
            print('    date: "Jun 2026",')
            print('    type: { en: "Guide book", id: "Buku panduan" },')
            print('    summary: { en: "One or two sentences.", id: "Satu atau dua kalimat." },')
            print("    tags: []")
            print("  }")


if __name__ == "__main__":
    main()
