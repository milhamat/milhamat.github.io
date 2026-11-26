# Student guidance projects / Proyek bimbingan mahasiswa

**EN** — One folder per cohort (angkatan): `assets/guidance/2024/`, `assets/guidance/2025/`, …
Each team's PDF (poster, guide book, report) goes in its cohort folder, with an entry in
`guidance.js`. Cohorts, filters and counts on the site update automatically. Visitors read the
PDF in a built-in viewer (zoom, page by page), open it in a new tab, or download it.

**ID** — Satu folder per angkatan. PDF tiap kelompok (poster, buku panduan, laporan) masuk ke
folder angkatannya, dengan satu entri di `guidance.js`. Daftar angkatan, filter, dan jumlah proyek
di situs ter-update otomatis.

## Add a project in one command / Tambah proyek dengan satu perintah

```bash
pip install pikepdf pillow pymupdf        # once / sekali saja
python tools/compress_pdf.py "Guide book Kelompok X.pdf" --cohort 2025 --name kelompok-x-smart-parking
```

This writes `assets/guidance/2025/kelompok-x-smart-parking.pdf` (compressed) and `.webp` (cover),
then prints an entry — paste it into `guidance.js` and fill in title, team, students, course.
Several files at once: `python tools/compress_pdf.py a.pdf b.pdf c.pdf --cohort 2025`.

Results so far: the Cheezu guide book went from **51.8 MB → 5.8 MB** with no visible difference
(duplicate images that Canva repeats on every page are merged; oversized images are resized to what
a screen can show; everything else is re-packed losslessly). Text and vector graphics stay sharp.

Limits to keep in mind: GitHub's web upload accepts files up to 25 MB, the whole site may be at
most 1 GB. At ~5 MB per project there is room for well over 100 PDFs.

Make sure the students are fine with their names (and NIM, if printed) being public.
