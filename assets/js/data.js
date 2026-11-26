/* =====================================================================
   PORTFOLIO CONTENT — edit this file to update the site.
   Every text can be a plain string, or { en: "...", id: "..." } for
   bilingual text. Student guidance projects (by cohort) live in
   assets/guidance/guidance.js (see assets/guidance/README.md).
   ===================================================================== */

window.SITE = {
  profile: {
    name: "Muhammad Ilham Ashiddiq Tresnawan",
    short: "Milhamat",
    initials: "MI",
    location: "Batam, Indonesia",
    email: "M477ashiddiq@gmail.com",
    photo: "assets/img/profile.webp",
    cv: "assets/docs/CV-Muhammad-Ilham-Ashiddiq-Tresnawan.pdf",
    socials: [
      {
        label: "GitHub",
        icon: "bi-github",
        url: "https://github.com/milhamat",
      },
      {
        label: "LinkedIn",
        icon: "bi-linkedin",
        url: "https://www.linkedin.com/in/milhamat/",
      },
      { label: "Kaggle", text: "K", url: "https://www.kaggle.com/ilhamatt" },
      {
        label: "Hugging Face",
        text: "HF",
        url: "https://huggingface.co/milhamat",
      },
      {
        label: "Medium",
        icon: "bi-medium",
        url: "https://medium.com/@milham47",
      },
    ],
  },

  /* ---------- Interface text ---------- */
  ui: {
    nav: {
      about: { en: "About", id: "Tentang" },
      skills: { en: "Skills", id: "Keahlian" },
      experience: { en: "Experience", id: "Pengalaman" },
      projects: { en: "Projects", id: "Proyek" },
      guidance: { en: "Guidance", id: "Bimbingan" },
      contact: { en: "Contact", id: "Kontak" },
      cv: { en: "CV", id: "CV" },
    },
    hero: {
      tag: { en: "Research-Oriented Mindset", id: "Mindset Berbasis Riset" },
      title: { en: "Translating Ideas into", id: "Mengubah Ide Menjadi" },
      accent: { en: "Practical Solutions", id: "Solusi Praktis" },
      roles: {
        en: "Lecturer · ML Researcher · Developer",
        id: "Dosen · Peneliti ML · Developer",
      },
      subtitle: {
        en: "Technology professional with strong hands-on experience in developing and deploying data-driven solutions — specializing in Machine Learning, IoT and Software Engineering.",
        id: "Profesional teknologi dengan pengalaman langsung yang kuat dalam mengembangkan dan men-deploy solusi berbasis data — berfokus pada Machine Learning, IoT, dan Rekayasa Perangkat Lunak.",
      },
      cta: { en: "View Projects", id: "Lihat Proyek" },
      cv: { en: "Download CV", id: "Unduh CV" },
      scroll: { en: "Scroll", id: "Gulir" },
    },
    about: {
      eyebrow: { en: "About", id: "Tentang" },
      title: {
        en: "Academic & Industrial Synergy",
        id: "Sinergi Akademik & Industri",
      },
      summary: {
        en: "I focus on translating complex ideas into practical, scalable solutions that deliver measurable real-world impact. I'm proficient in Python and R for data preprocessing, visualization and analytical modeling, with experience in predictive modeling, information processing and recommendation systems.",
        id: "Saya fokus menerjemahkan ide yang kompleks menjadi solusi praktis dan skalabel yang memberi dampak nyata dan terukur. Saya mahir menggunakan Python dan R untuk pra-pemrosesan data, visualisasi, dan pemodelan analitik, dengan pengalaman di pemodelan prediktif, pemrosesan informasi, dan sistem rekomendasi.",
      },
      cards: [
        {
          icon: "bi-easel",
          title: { en: "Research & Teaching", id: "Riset & Pengajaran" },
          desc: {
            en: "Lecturer in IoT, Embedded Systems, Machine Learning, Data Sructure and Algorithms. Former research assistant in Taiwan working on few-shot learning and defect detection.",
            id: "Dosen IoT, Sistem Tertanam, Machine Learning, Struktur Data dan Algoritma. Sebelumnya research assistant di Taiwan dengan fokus few-shot learning dan deteksi cacat.",
          },
        },
        {
          icon: "bi-lightning-charge",
          title: { en: "Software Engineering", id: "Rekayasa Perangkat Lunak" },
          desc: {
            en: "iOS engineering alumnus of Apple Developer Academy. Builds end-to-end data pipelines, dashboards and ML web apps — from server setup to deployment.",
            id: "Alumni iOS engineering Apple Developer Academy. Membangun pipeline data end-to-end, dashboard, dan aplikasi web ML — dari setup server hingga deployment.",
          },
        },
      ],
    },
    skills: {
      eyebrow: { en: "Skills", id: "Keahlian" },
      title: { en: "Technical Arsenal", id: "Arsenal Teknis" },
      soft: { en: "Soft skills", id: "Soft skill" },
      languages: { en: "Languages", id: "Bahasa" },
    },
    experience: {
      eyebrow: { en: "Experience", id: "Pengalaman" },
      title: { en: "Professional Journey", id: "Perjalanan Profesional" },
      education: { en: "Education", id: "Pendidikan" },
      coursework: { en: "Relevant coursework", id: "Mata kuliah relevan" },
    },
    projects: {
      eyebrow: { en: "Showcase", id: "Showcase" },
      title: { en: "Projects & Guidance", id: "Proyek & Bimbingan" },
      subtitle: {
        en: "My own work in AI, research, data, mobile and embedded systems — plus the projects my students built under my guidance, organised by cohort.",
        id: "Karya saya di bidang AI, riset, data, mobile, dan sistem tertanam — serta proyek mahasiswa hasil bimbingan saya, dikelompokkan per angkatan.",
      },
      mine: { en: "My Projects", id: "Proyek Saya" },
      filters: {
        all: { en: "All", id: "Semua" },
        ai: { en: "AI & ML", id: "AI & ML" },
        research: { en: "Research", id: "Riset" },
        data: { en: "Web & Data", id: "Web & Data" },
        mobile: { en: "Mobile", id: "Mobile" },
        embedded: { en: "Embedded & IoT", id: "Embedded & IoT" },
      },
      details: { en: "View details", id: "Lihat detail" },
      more: { en: "Show more projects", id: "Tampilkan proyek lain" },
      github: { en: "More projects on GitHub", id: "Proyek lainnya di GitHub" },
      less: { en: "Show fewer", id: "Tampilkan lebih sedikit" },
    },
    guidance: {
      eyebrow: { en: "Student Guidance", id: "Bimbingan Mahasiswa" },
      title: {
        en: "Student Projects by Cohort",
        id: "Proyek Mahasiswa per Angkatan",
      },
      subtitle: {
        en: "Projects built by student teams I guided at Universitas Internasional Batam. Open any document to read it right here, or download the PDF.",
        id: "Proyek tim mahasiswa yang saya bimbing di Universitas Internasional Batam. Buka dokumennya untuk dibaca langsung di sini, atau unduh PDF-nya.",
      },
      all: { en: "All cohorts", id: "Semua angkatan" },
      cohort: { en: "Cohort", id: "Angkatan" },
      students: { en: "Students", id: "Mahasiswa" },
      projectsCount: { en: "projects", id: "proyek" },
      projectCount: { en: "project", id: "proyek" },
      pages: { en: "pages", id: "halaman" },
      pageOne: { en: "page", id: "halaman" },
      page: { en: "Page", id: "Halaman" },
      view: { en: "Read", id: "Baca" },
      open: { en: "Open PDF in new tab", id: "Buka PDF di tab baru" },
      download: { en: "Download PDF", id: "Unduh PDF" },
      loading: { en: "Loading document…", id: "Memuat dokumen…" },
      failed: {
        en: "Preview unavailable — open the PDF instead.",
        id: "Pratinjau tidak tersedia — silakan buka PDF-nya.",
      },
    },
    contact: {
      title: {
        en: "Let's Build the Future Together.",
        id: "Mari Bangun Masa Depan Bersama.",
      },
      status: {
        en: "Open to research collaboration & prototyping",
        id: "Terbuka untuk kolaborasi riset & prototyping",
      },
      quote: {
        en: "Technology professional with a research-oriented mindset, delivering data-driven solutions.",
        id: "Profesional teknologi dengan mindset berbasis riset, menghadirkan solusi berbasis data.",
      },
      cv: { en: "Download my CV", id: "Unduh CV saya" },
    },
    modal: {
      close: { en: "Close", id: "Tutup" },
      category: { en: "Category", id: "Kategori" },
      org: { en: "Affiliation", id: "Afiliasi" },
      date: { en: "Date", id: "Tanggal" },
      stack: { en: "Tech stack", id: "Teknologi" },
      zoomIn: { en: "Zoom in", id: "Perbesar" },
      zoomOut: { en: "Zoom out", id: "Perkecil" },
    },
    footer: {
      roles: {
        en: "Researcher • Developer • Lecturer",
        id: "Peneliti • Developer • Dosen",
      },
      top: { en: "Back to top", id: "Kembali ke atas" },
    },
  },

  /* ---------- Skills (text only) ---------- */
  skills: [
    {
      name: { en: "Programming Languages", id: "Bahasa Pemrograman" },
      items: [
        "Python",
        "R",
        "MATLAB",
        "C",
        "C++",
        "Java",
        "Swift",
        "SQL",
        "HTML",
        "CSS",
        "JavaScript",
      ],
    },
    {
      name: { en: "ML & Data Libraries", id: "Library ML & Data" },
      items: [
        "Scikit-learn",
        "TensorFlow",
        "Keras",
        "PyTorch",
        "OpenCV",
        "NumPy",
        "Pandas",
        "Matplotlib",
        "Plotly",
        "Seaborn",
      ],
    },
    {
      name: { en: "Tools & Platforms", id: "Tools & Platform" },
      items: [
        "Git",
        "Docker",
        "Bash",
        "Linux",
        "Jupyter",
        "Google Colab",
        "Anaconda",
        "Streamlit",
        "PostgreSQL",
        "MongoDB",
        "Arduino",
        "Raspberry Pi",
      ],
    },
    {
      name: { en: "AI Techniques", id: "Teknik AI" },
      items: [
        "NLP",
        "Text Classification",
        "LLM",
        "RAG",
        "GAN",
        "Image Processing",
        "Image Classification",
        "Fault Detection",
        "Few-Shot Learning",
        "Dashboard Apps",
      ],
    },
    {
      name: { en: "Methods & Engineering", id: "Metode & Engineering" },
      items: [
        "Data Science Pipeline",
        "Statistics",
        "Time Series",
        "A/B Testing",
        "Experimental Design",
        "Hypothesis Testing",
        "OOP",
        "API",
        "Cloud",
      ],
    },
  ],
  softSkills: {
    en: [
      "Research",
      "Collaboration",
      "Ideation",
      "Problem Solving",
      "Creativity",
      "Analytical & Critical Thinking",
    ],
    id: [
      "Riset",
      "Kolaborasi",
      "Ideasi",
      "Pemecahan Masalah",
      "Kreativitas",
      "Berpikir Analitis & Kritis",
    ],
  },
  languages: [
    {
      name: { en: "Indonesian", id: "Indonesia" },
      level: { en: "Native", id: "Bahasa ibu" },
    },
    {
      name: { en: "English", id: "Inggris" },
      level: { en: "Professional", id: "Profesional" },
    },
    {
      name: { en: "Korean", id: "Korea" },
      level: { en: "Adequate", id: "Cukup" },
    },
  ],

  /* ---------- Experience ---------- */
  experience: [
    {
      period: { en: "Sep 2024 – Present", id: "Sep 2024 – Sekarang" },
      role: {
        en: "Lecturer",
        id: "Dosen",
      },
      org: "Universitas Internasional Batam",
      place: {
        en: "Batam, Indonesia · Contract",
        id: "Batam, Indonesia · Kontrak",
      },
      type: "academic",
      points: {
        en: [
          "Deliver lectures and hands-on instruction in IoT, Embedded Systems, Machine Learning, Data Sructur and Algorithm, including deployment across edge devices, mobile apps and web platforms for real-time sensing and control.",
          "Develop interactive labs and project-based modules tailored to students' technical backgrounds and learning outcomes.",
          "Supervise student IoT and embedded-systems projects.",
        ],
        id: [
          "Mengajar teori dan praktik IoT, Sistem Tertanam, Machine Learning, Struktur Data dan Algoritma, termasuk deployment ke perangkat edge, aplikasi mobile, dan platform web untuk sensing dan kontrol real-time.",
          "Mengembangkan lab interaktif dan modul berbasis proyek yang disesuaikan dengan latar belakang teknis dan capaian pembelajaran mahasiswa.",
          "Membimbing proyek IoT dan sistem tertanam mahasiswa.",
        ],
      },
    },
    {
      period: { en: "Nov 2023 – Jul 2024", id: "Nov 2023 – Jul 2024" },
      role: { en: "Research Assistant", id: "Research Assistant" },
      org: "National Taipei University of Business",
      place: {
        en: "New Taipei, Taiwan · Contract",
        id: "New Taipei, Taiwan · Kontrak",
      },
      type: "academic",
      points: {
        en: [
          "Developed data preprocessing algorithms, including ID de-identification.",
          "Built a cost-efficient web dashboard with Python Dash, from server setup to deployment.",
          "Improved defect-detection model accuracy by 22% using few-shot learning and image augmentation.",
        ],
        id: [
          "Mengembangkan algoritma pra-pemrosesan data, termasuk de-identifikasi ID.",
          "Membangun dashboard web hemat biaya dengan Python Dash, dari setup server hingga deployment.",
          "Meningkatkan akurasi model deteksi cacat sebesar 22% dengan few-shot learning dan augmentasi citra.",
        ],
      },
    },
    {
      period: { en: "Mar 2021 – Jun 2023", id: "Mar 2021 – Jun 2023" },
      role: { en: "Research Assistant", id: "Research Assistant" },
      org: "Ming Chi University of Technology",
      place: {
        en: "New Taipei, Taiwan · Full-time",
        id: "New Taipei, Taiwan · Penuh waktu",
      },
      type: "academic",
      points: {
        en: [
          "Applied supervised and unsupervised models using Python, R and MATLAB.",
          "Optimized ML pipelines with data cleaning, feature selection and hyperparameter tuning.",
          "Built and compared few-shot learning models for steel defect classification.",
        ],
        id: [
          "Menerapkan model supervised dan unsupervised dengan Python, R, dan MATLAB.",
          "Mengoptimalkan pipeline ML melalui pembersihan data, seleksi fitur, dan tuning hyperparameter.",
          "Membangun dan membandingkan model few-shot learning untuk klasifikasi cacat baja.",
        ],
      },
    },
    {
      period: { en: "Mar 2020 – Dec 2020", id: "Mar 2020 – Des 2020" },
      role: {
        en: "iOS Software Engineering Intern",
        id: "Intern iOS Software Engineering",
      },
      org: "Apple Developer Academy",
      place: {
        en: "Batam, Indonesia · Internship",
        id: "Batam, Indonesia · Magang",
      },
      type: "industry",
      points: {
        en: [
          "Explored the full iOS development cycle, from ideation and UI design to testing and deployment.",
          "Collaborated as a frontend engineer to implement production-ready UI.",
          "Contributed to an app successfully launched on the App Store.",
        ],
        id: [
          "Mempelajari siklus penuh pengembangan iOS, dari ideasi dan desain UI hingga pengujian dan deployment.",
          "Berkolaborasi sebagai frontend engineer untuk mengimplementasikan UI siap produksi.",
          "Berkontribusi pada aplikasi yang berhasil rilis di App Store.",
        ],
      },
    },
  ],

  /* ---------- Education ---------- */
  education: [
    {
      period: "2021 – 2023",
      degree: {
        en: "Master of Science in Mechanical and Mechanical Electronic Engineering",
        id: "Magister Sains Teknik Mesin dan Mekatronika",
      },
      org: "Ming Chi University of Technology",
      place: "New Taipei, Taiwan",
      honors: {
        en: [
          "Excellent Academic Performance 2022 & 2023",
          "The 2023 Best Conference of Business and Public Management",
        ],
        id: [
          "Prestasi Akademik Unggul 2022 & 2023",
          "The 2023 Best Conference of Business and Public Management",
        ],
      },
      coursework: [
        "Data Analysis and Application",
        "AI System Modelling and Analysis",
        "Advanced Programming",
        "Image Processing Technology",
        "AI in Computer Vision",
        "AI System Verification and Performance Evaluation",
      ],
    },
    {
      period: "2014 – 2019",
      degree: {
        en: "Bachelor of Engineering in Electrical Engineering",
        id: "Sarjana Teknik Elektro",
      },
      org: "Universitas Internasional Batam",
      place: "Batam, Indonesia",
      honors: {
        en: ["Joint degree program with Sun Moon University, South Korea"],
        id: ["Program joint degree dengan Sun Moon University, Korea Selatan"],
      },
    },
  ],

  /* ---------- Projects ----------
     cats: ai | research | data | mobile | embedded
     images: first image is the cover (WebP, ~1280 px wide; plus a <slug>-card.webp ~720 px).
     links: { label, url, icon } — add your repo/demo links here. */
  initialProjects: 6,
  projects: [
    {
      slug: "fsl-augmentation",
      title: {
        en: "Data Augmentation for Few-Class Few-Shot Learning",
        id: "Augmentasi Data untuk Few-Shot Learning Few-Class",
      },
      date: { en: "May 2024", id: "Mei 2024" },
      cats: ["research", "ai"],
      org: "National Taipei University of Business",
      summary: {
        en: "Enhancing data through augmentation to address few-class scenarios in few-shot defect classification.",
        id: "Meningkatkan data melalui augmentasi untuk mengatasi skenario few-class pada klasifikasi cacat few-shot.",
      },
      points: {
        en: [
          "Automatic prediction of defect types is crucial for production quality, but deep networks usually need large datasets.",
          "Few-shot learning classifies with only a handful of samples — yet using only a few classes can still degrade performance.",
          "Used image-enhancement-based augmentation to enrich few-class scenarios, improving model accuracy by 22%.",
        ],
        id: [
          "Prediksi otomatis jenis cacat penting untuk kualitas produksi, namun deep network umumnya butuh dataset besar.",
          "Few-shot learning dapat mengklasifikasi hanya dengan sedikit sampel — tetapi jumlah kelas yang sedikit tetap bisa menurunkan performa.",
          "Menggunakan augmentasi berbasis image enhancement untuk memperkaya skenario few-class, meningkatkan akurasi model 22%.",
        ],
      },
      tech: ["Python", "Few-Shot Learning", "Image Augmentation"],
      images: ["assets/img/projects/fsl-augmentation-1.webp"],
      links: [],
    },
    {
      slug: "ntub-dashboard",
      title: {
        en: "NTUB Student Data Dashboard",
        id: "Dashboard Data Mahasiswa NTUB",
      },
      date: { en: "2024", id: "2024" },
      cats: ["data"],
      org: "National Taipei University of Business",
      summary: {
        en: "Interactive dashboard of student distribution, gender ratio, alumni careers, dropouts and staff data.",
        id: "Dashboard interaktif sebaran mahasiswa, rasio gender, karier alumni, mahasiswa drop-out, dan data staf.",
      },
      points: {
        en: [
          "Affiliated project of National Taipei University of Business.",
          "Displays yearly student distribution, gender ratio, alumni job types, dropout numbers and campus-staff data.",
          "Built end-to-end with Python Dash — from server setup to deployment — as a cost-efficient solution.",
        ],
        id: [
          "Proyek afiliasi National Taipei University of Business.",
          "Menampilkan sebaran mahasiswa per tahun, rasio gender, jenis pekerjaan alumni, jumlah drop-out, dan data staf kampus.",
          "Dibangun end-to-end dengan Python Dash — dari setup server hingga deployment — sebagai solusi hemat biaya.",
        ],
      },
      tech: ["Python", "Dash", "Plotly"],
      images: [
        "assets/img/projects/ntub-dashboard-1.webp",
        "assets/img/projects/ntub-dashboard-2.webp",
      ],
      links: [
        {
          label: "Live demo",
          icon: "bi-box-arrow-up-right",
          url: "https://isdc-ntub-dashboard.onrender.com/",
        },
        {
          label: "GitHub",
          icon: "bi-github",
          url: "https://github.com/milhamat/sustain_dev_web_pydash",
        },
      ],
    },
    {
      slug: "ml-tools",
      title: {
        en: "Machine Learning Tools Web App",
        id: "Aplikasi Web Machine Learning Tools",
      },
      date: { en: "Mar 2024", id: "Mar 2024" },
      cats: ["data", "ai"],
      org: { en: "Personal project", id: "Proyek pribadi" },
      summary: {
        en: "A web app that simulates the machine-learning workflow for classification and regression.",
        id: "Aplikasi web yang mensimulasikan alur machine learning untuk klasifikasi dan regresi.",
      },
      points: {
        en: [
          "Simulates the ML flow — data exploration, preprocessing, modeling and evaluation — in the browser.",
          "Uses the Boston dataset for both classification and regression tasks.",
        ],
        id: [
          "Mensimulasikan alur ML — eksplorasi data, pra-pemrosesan, pemodelan, dan evaluasi — di browser.",
          "Menggunakan dataset Boston untuk tugas klasifikasi dan regresi.",
        ],
      },
      tech: ["R", "Shiny", "Machine Learning"],
      images: ["assets/img/projects/ml-tools-1.webp"],
      links: [
        {
          label: "Live app",
          icon: "bi-box-arrow-up-right",
          url: "https://milhamat.shinyapps.io/ML_module/",
        },
      ],
    },
    {
      slug: "steel-fsl",
      title: {
        en: "Steel Surface Defect Classification with Few-Shot Learning",
        id: "Klasifikasi Cacat Permukaan Baja dengan Few-Shot Learning",
      },
      date: { en: "Jun 2023", id: "Jun 2023" },
      cats: ["research", "ai"],
      org: {
        en: "Ming Chi University of Technology · Master's thesis",
        id: "Ming Chi University of Technology · Tesis magister",
      },
      summary: {
        en: "Identifying steel defect types from a small set of samples using few-shot learning on the NEU dataset.",
        id: "Mengidentifikasi jenis cacat baja dari sedikit sampel dengan few-shot learning pada dataset NEU.",
      },
      points: {
        en: [
          "Defect detection is a fundamental requirement of manufacturing, but deep-learning quality control normally needs large datasets.",
          "Applied few-shot learning to the NEU surface-defect dataset to identify defect types from small samples.",
          "Addressed the limited class diversity of the dataset, which otherwise limits few-shot performance.",
        ],
        id: [
          "Deteksi cacat adalah kebutuhan mendasar manufaktur, namun quality control berbasis deep learning biasanya butuh dataset besar.",
          "Menerapkan few-shot learning pada dataset cacat permukaan NEU untuk mengenali jenis cacat dari sampel kecil.",
          "Mengatasi keterbatasan keragaman kelas pada dataset yang dapat membatasi performa few-shot.",
        ],
      },
      tech: ["Python", "Few-Shot Learning", "Computer Vision"],
      images: ["assets/img/projects/steel-fsl-1.webp"],
      links: [
        {
          label: "Thesis record",
          icon: "bi-journal-richtext",
          url: "https://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi?o=dnclcdr&s=id=%22111MIT00657015%22.&searchmode=basic",
        },
      ],
    },
    {
      slug: "neu-defect",
      title: {
        en: "NEU Surface Defect Classification",
        id: "Klasifikasi Cacat Permukaan NEU",
      },
      date: { en: "Dec 2022", id: "Des 2022" },
      cats: ["ai"],
      org: "Ming Chi University of Technology",
      summary: {
        en: "Classifying steel surface defects from the Northeastern University (NEU) dataset.",
        id: "Klasifikasi cacat permukaan baja dari dataset Northeastern University (NEU).",
      },
      points: {
        en: [
          "Image classification of six steel-surface defect types from the NEU dataset.",
        ],
        id: [
          "Klasifikasi citra enam jenis cacat permukaan baja dari dataset NEU.",
        ],
      },
      tech: ["Python", "Image Classification"],
      images: [
        "assets/img/projects/neu-defect-1.webp",
        "assets/img/projects/neu-defect-2.webp",
      ],
      links: [
        {
          label: "GitHub",
          icon: "bi-github",
          url: "https://github.com/milhamat/NEU-Defect-Classification/tree/main",
        },
      ],
    },
    {
      slug: "tep-defect",
      title: {
        en: "Tennessee Eastman Process Fault Detection",
        id: "Deteksi Gangguan Tennessee Eastman Process",
      },
      date: { en: "Mar 2022", id: "Mar 2022" },
      cats: ["ai"],
      org: "Ming Chi University of Technology",
      summary: {
        en: "Fault detection on the Tennessee Eastman Process industrial benchmark dataset.",
        id: "Deteksi gangguan pada dataset benchmark industri Tennessee Eastman Process.",
      },
      points: {
        en: [
          "Machine-learning fault/defect classification on the Tennessee Eastman Process chemical-plant simulation data.",
        ],
        id: [
          "Klasifikasi gangguan/cacat dengan machine learning pada data simulasi pabrik kimia Tennessee Eastman Process.",
        ],
      },
      tech: ["Python", "Machine Learning", "Fault Detection"],
      images: [
        "assets/img/projects/tep-defect-1.webp",
        "assets/img/projects/tep-defect-2.webp",
      ],
      links: [
        {
          label: "GitHub",
          icon: "bi-github",
          url: "https://github.com/milhamat/Tennessee-Eastman-Process-defect",
        },
      ],
    },
    {
      slug: "knn-diabetes",
      title: {
        en: "Experimental Modeling: KNN for Diabetes",
        id: "Pemodelan Eksperimental: KNN untuk Diabetes",
      },
      date: { en: "Jun 2021", id: "Jun 2021" },
      cats: ["ai"],
      org: { en: "Personal project", id: "Proyek pribadi" },
      summary: {
        en: "Exploratory analysis and k-nearest-neighbors classification experiments on a diabetes dataset.",
        id: "Analisis eksploratif dan eksperimen klasifikasi k-nearest neighbors pada dataset diabetes.",
      },
      points: {
        en: [
          "Data exploration, feature distributions and KNN classification experiments.",
        ],
        id: [
          "Eksplorasi data, distribusi fitur, dan eksperimen klasifikasi KNN.",
        ],
      },
      tech: ["Python", "Scikit-learn", "KNN"],
      images: [
        "assets/img/projects/knn-diabetes-1.webp",
        "assets/img/projects/knn-diabetes-2.webp",
        "assets/img/projects/knn-diabetes-3.webp",
      ],
      links: [
        {
          label: "Notebook",
          icon: "bi-github",
          url: "https://github.com/milhamat/Decision_Tree/blob/master/Decision_tree1.ipynb",
        },
      ],
    },
    {
      slug: "yana",
      title: { en: "Yana App", id: "Aplikasi Yana" },
      date: { en: "Dec 2020", id: "Des 2020" },
      cats: ["mobile"],
      org: "Apple Developer Academy",
      summary: {
        en: "iOS app built as a team at Apple Developer Academy and launched on the App Store.",
        id: "Aplikasi iOS yang dibangun bersama tim di Apple Developer Academy dan rilis di App Store.",
      },
      points: {
        en: [
          "Worked as the frontend engineer implementing production-ready UI for an app released on the App Store.",
        ],
        id: [
          "Berperan sebagai frontend engineer yang mengimplementasikan UI siap produksi untuk aplikasi yang rilis di App Store.",
        ],
      },
      tech: ["Swift", "iOS", "UI Engineering"],
      images: [
        "assets/img/projects/yana-1.webp",
        "assets/img/projects/yana-2.webp",
      ],
      links: [
        {
          label: "App Store",
          icon: "bi-apple",
          url: "https://apps.apple.com/us/app/yana/id1538607674",
        },
      ],
    },
    {
      slug: "tempy",
      title: {
        en: "TemPy — IoT Room Temperature App",
        id: "TemPy — Aplikasi Suhu Ruangan IoT",
      },
      date: { en: "Aug 2020", id: "Agu 2020" },
      cats: ["mobile", "embedded"],
      org: "Apple Developer Academy",
      summary: {
        en: "One-week project connecting a Raspberry Pi temperature sensor to an iOS app through the cloud.",
        id: "Proyek satu minggu yang menghubungkan sensor suhu Raspberry Pi ke aplikasi iOS melalui cloud.",
      },
      points: {
        en: [
          "Built during the Apple Developer Academy learning journey to explore connecting IoT devices to iOS.",
          "A Raspberry Pi reads and sends temperature data to the cloud, displayed live on the iPhone.",
        ],
        id: [
          "Dibuat dalam perjalanan belajar di Apple Developer Academy untuk mengeksplorasi koneksi perangkat IoT ke iOS.",
          "Raspberry Pi membaca dan mengirim data suhu ke cloud, lalu ditampilkan langsung di iPhone.",
        ],
      },
      tech: ["Swift", "Raspberry Pi", "IoT", "Cloud"],
      images: [
        "assets/img/projects/tempy-1.webp",
        "assets/img/projects/tempy-2.webp",
      ],
      links: [
        {
          label: "GitHub",
          icon: "bi-github",
          url: "https://github.com/milhamat/IotRoomTemp",
        },
      ],
    },
    {
      slug: "gas-fire",
      title: {
        en: "Android-Based Gas & Fire Detection Prototype",
        id: "Prototipe Deteksi Gas & Api Berbasis Android",
      },
      date: { en: "Aug 2019", id: "Agu 2019" },
      cats: ["embedded"],
      org: {
        en: "Universitas Internasional Batam · Bachelor's project",
        id: "Universitas Internasional Batam · Proyek sarjana",
      },
      summary: {
        en: "Arduino gas-leak and fire detector integrated with an Android app to reduce kitchen fire risk.",
        id: "Detektor kebocoran gas dan api berbasis Arduino yang terintegrasi aplikasi Android untuk mengurangi risiko kebakaran dapur.",
      },
      points: {
        en: [
          "Uses gas and temperature sensors as danger indicators.",
          "Arduino + Android app alerts users to reduce the risk of fire and explosion in the kitchen.",
        ],
        id: [
          "Menggunakan sensor gas dan suhu sebagai indikator bahaya.",
          "Arduino + aplikasi Android memberi peringatan untuk mengurangi risiko kebakaran dan ledakan di dapur.",
        ],
      },
      tech: ["Arduino", "Android", "Sensors"],
      images: [
        "assets/img/projects/gas-fire-1.webp",
        "assets/img/projects/gas-fire-2.webp",
        "assets/img/projects/gas-fire-3.webp",
        "assets/img/projects/gas-fire-4.webp",
      ],
      links: [],
    },
    {
      slug: "car-safe",
      title: { en: "Car Safe System", id: "Sistem Keamanan Mobil" },
      date: { en: "May 2018", id: "Mei 2018" },
      cats: ["embedded"],
      org: "Sun Moon University",
      summary: {
        en: "Parking-distance safety device on an RC car, controlled by an Android app with LED distance indicators.",
        id: "Perangkat keamanan jarak parkir pada mobil RC, dikendalikan aplikasi Android dengan indikator jarak LED.",
      },
      points: {
        en: [
          "A 128-series microcontroller is the central processor; an Android app controls the RC car.",
          "LEDs indicate distance to reduce the risk of hitting objects while parking.",
        ],
        id: [
          "Mikrokontroler seri 128 sebagai pemroses utama; aplikasi Android mengendalikan mobil RC.",
          "LED menunjukkan jarak untuk mengurangi risiko menabrak objek saat parkir.",
        ],
      },
      tech: ["Microcontroller", "Android", "LED Indicators"],
      images: [
        "assets/img/projects/car-safe-1.webp",
        "assets/img/projects/car-safe-2.webp",
        "assets/img/projects/car-safe-3.webp",
        "assets/img/projects/car-safe-4.webp",
      ],
      links: [],
    },
    {
      slug: "home-automation",
      title: {
        en: "Home Automation with Android",
        id: "Otomasi Rumah dengan Android",
      },
      date: { en: "May 2017", id: "Mei 2017" },
      cats: ["embedded"],
      org: "Sun Moon University",
      summary: {
        en: "Arduino + Bluetooth home automation controlled from an Android app.",
        id: "Otomasi rumah dengan Arduino + Bluetooth yang dikendalikan dari aplikasi Android.",
      },
      points: {
        en: [
          "Arduino handles control; Bluetooth connects it to Android.",
          "Turns lights and fans on/off and opens/closes doors from the phone.",
        ],
        id: [
          "Arduino sebagai pengendali; Bluetooth menghubungkannya ke Android.",
          "Menyalakan/mematikan lampu dan kipas serta membuka/menutup pintu dari ponsel.",
        ],
      },
      tech: ["Arduino", "Bluetooth", "Android"],
      images: [
        "assets/img/projects/home-automation-1.webp",
        "assets/img/projects/home-automation-2.webp",
        "assets/img/projects/home-automation-3.webp",
      ],
      links: [],
    },
    {
      slug: "serial-piano",
      title: { en: "Serial Piano", id: "Serial Piano" },
      date: { en: "Apr 2016", id: "Apr 2016" },
      cats: ["embedded"],
      org: "Universitas Internasional Batam",
      summary: {
        en: "My first microcontroller project: a Windows app that turns an Arduino into a simple LED piano.",
        id: "Proyek mikrokontroler pertama saya: aplikasi Windows yang mengubah Arduino menjadi piano LED sederhana.",
      },
      points: {
        en: [
          "Visual Studio desktop app controls an Arduino over serial, driving LEDs and a mini speaker.",
        ],
        id: [
          "Aplikasi desktop Visual Studio mengendalikan Arduino lewat serial, menyalakan LED dan speaker mini.",
        ],
      },
      tech: ["Arduino", "Visual Studio", "Serial Communication"],
      images: [
        "assets/img/projects/serial-piano-1.webp",
        "assets/img/projects/serial-piano-2.webp",
      ],
      links: [],
    },
  ],
};
