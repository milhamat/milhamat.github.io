# milhamat.github.io

Single-page scrolling portfolio of Muhammad Ilham Ashiddiq Tresnawan — plain HTML/CSS/JS, no build step.

## Where to edit

| What | File |
| --- | --- |
| All text (EN + ID), experience, education, skills, projects | `assets/js/data.js` |
| Student guidance projects by cohort (PDF) | `assets/guidance/<cohort>/` + `assets/guidance/guidance.js` (see the README there) |
| Compress a new PDF + make its cover | `python tools/compress_pdf.py file.pdf --cohort 2025 --name short-name` (needs `pip install pikepdf pillow pymupdf`) |
| CV download | `assets/docs/CV-Muhammad-Ilham-Ashiddiq-Tresnawan.pdf` (replace the file, keep the name) |
| Profile photo | `assets/img/profile.webp` (page) + `profile.jpg` (link previews) |
| Project images | `assets/img/projects/<slug>-1.webp`, `-2.webp`, … and `<slug>-card.webp` (720 px wide cover) |
| Styling | `assets/css/site.css` |
| Behaviour (rendering, language switch, viewers) | `assets/js/app.js` |

Adding a project: copy one object in the `projects` list in `data.js`, give it a unique `slug`,
and put its images in `assets/img/projects/`. Other work is linked via the "More projects on GitHub" button.
Each project can be linked directly as `https://milhamat.github.io/#project/<slug>`.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

(Opening `index.html` by double-clicking also works, except the PDF viewer for student documents, which needs a server.)

## Notes

- The old pages (`about.html`, `resume.html`, `portfolio.html`, `*-details.html`) now redirect to the
  matching section or project on the single page, so old links keep working.
- Student documents can be linked directly as `https://milhamat.github.io/#doc/<slug>`.
- PDFs are rendered with [pdf.js](https://github.com/mozilla/pdf.js) 6.2 legacy build (Apache-2.0), vendored in
  `assets/vendor/pdfjs/` (files renamed `.mjs` → `.js`). Pages load on demand, so large documents open fast. Icons are inline SVG from Bootstrap Icons (MIT), embedded in `index.html` and `app.js` —
  no icon font needed. The site no longer uses `assets/vendor/bootstrap*`, `aos`, `glightbox`, etc.; those old
  template folders can be deleted from the repo whenever you like.
