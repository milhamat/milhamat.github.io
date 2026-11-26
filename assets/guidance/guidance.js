/* =====================================================================
   STUDENT GUIDANCE — projects by student teams, grouped by cohort
   (angkatan). Shown in the "Projects & Guidance" section.

   To add a project:
   1. Compress it into the cohort folder (also makes the cover + prints an entry):
        python tools/compress_pdf.py "My Poster.pdf" --cohort 2025 --name short-name
      -> assets/guidance/2025/short-name.pdf + short-name.webp
   2. Paste the printed entry below and fill in title, team, students, ...
   3. Commit & push.

   Fields:
     cohort    (required) intake year / angkatan, e.g. 2024
     file      (required) path to the PDF
     title     (required) text, or { en: "...", id: "..." }
     team      group name, e.g. "Cheezu Group"
     students  list of names
     course    e.g. "Machine Learning"
     date      e.g. "Jun 2026" (when the project was finished)
     type      e.g. { en: "Guide book", id: "Buku panduan" } or "Poster", "Report"
     summary   1–2 sentences, text or { en, id }
     tags      short keywords
     thumb     cover image (webp/jpg). tools/compress_pdf.py makes it for you;
               if omitted, page 1 of the PDF is rendered in the browser.
     pages     number of pages (optional, shown on the card)
     landscape true for slide decks / landscape pages (wide card layout)
     slug      optional short id for direct links (#doc/<slug>);
               defaults to the file name.
   ===================================================================== */

window.GUIDANCE = [
  {
    cohort: 2024,
    file: "assets/guidance/2024/cheezu-aids-survival-prediction-guide-book.pdf",
    thumb: "assets/guidance/2024/cheezu-aids-survival-prediction-guide-book.webp",
    pages: 17,
    title: { en: "AIDS Survival Prediction System", id: "Sistem Prediksi Survival Pasien AIDS" },
    team: "Cheezu Group",
    students: ["Adrainsyah Ramadan", "Filbert Florenza", "Muhammad Jihad", "Queenie Ficari Toba", "Zach Steven Allubi Prasetyo"],
    course: "Machine Learning",
    date: { en: "Jun 2026", id: "Jun 2026" },
    type: { en: "Guide book", id: "Buku panduan" },
    summary: {
      en: "A machine-learning app that predicts the survival of AIDS patients with a Random Survival Forest — estimating survival probabilities, hazard ratio, risk category and survival curves from clinical and treatment history.",
      id: "Aplikasi berbasis machine learning untuk memprediksi survival pasien AIDS dengan Random Survival Forest — mengestimasi probabilitas bertahan hidup, hazard ratio, kategori risiko, dan kurva survival dari data klinis serta riwayat pengobatan."
    },
    tags: ["Random Survival Forest", "Survival Analysis", "Machine Learning"]
  }
  ,{
    cohort: 2024,
    file: "assets/guidance/2024/vlan4-phishing-sms-classification.pdf",
    thumb: "assets/guidance/2024/vlan4-phishing-sms-classification.webp",
    pages: 17,
    landscape: true,
    title: { en: "Phishing SMS Classification with Machine Learning", id: "Klasifikasi Pesan Phishing Berbasis Machine Learning" },
    team: "VLAN4",
    students: ["William Chen", "Cleon Kenward", "Shelinna", "Intan Jayanti", "Muhammad Nabil Ihsan"],
    course: "Machine Learning",
    date: { en: "Jun 2026", id: "Jun 2026" },
    type: { en: "Presentation", id: "Presentasi" },
    summary: {
      en: "Detects smishing (phishing SMS) to improve cyber security: messages are cleaned, tokenized and stemmed, turned into TF-IDF features and classified as normal, phishing or promotion. Several classifiers were compared on 1,315 SMS — Naive Bayes performed best.",
      id: "Mendeteksi smishing (SMS phishing) untuk meningkatkan keamanan siber: pesan dibersihkan, ditokenisasi, dan di-stemming, diubah menjadi fitur TF-IDF, lalu diklasifikasikan menjadi normal, phishing, atau promosi. Beberapa classifier dibandingkan pada 1.315 SMS — Naive Bayes terbaik."
    },
    tags: ["NLP", "TF-IDF", "Naive Bayes"]
  }
  ,{
    cohort: 2024,
    file: "assets/guidance/2024/lulus-7-semester-asl-recognition.pdf",
    thumb: "assets/guidance/2024/lulus-7-semester-asl-recognition.webp",
    pages: 12,
    title: { en: "American Sign Language Recognition", id: "Pengenalan Bahasa Isyarat Amerika (ASL)" },
    team: "Lulus 7 Semester",
    course: "Machine Learning",
    date: { en: "Jun 2026", id: "Jun 2026" },
    type: { en: "User guide", id: "Panduan pengguna" },
    summary: {
      en: "Recognises ASL alphabet hand gestures in real time through a webcam, combining MediaPipe hand tracking with a CNN gesture classifier built with TensorFlow and OpenCV.",
      id: "Mengenali gestur huruf ASL secara real-time melalui webcam, menggabungkan pelacakan tangan MediaPipe dengan classifier gestur CNN yang dibangun dengan TensorFlow dan OpenCV."
    },
    tags: ["CNN", "MediaPipe", "Computer Vision"]
  }
  ,{
    cohort: 2024,
    file: "assets/guidance/2024/ikan-tenggiri-cypher-threat-detection.pdf",
    thumb: "assets/guidance/2024/ikan-tenggiri-cypher-threat-detection.webp",
    pages: 9,
    title: { en: "Cypher — AI Cybersecurity Threat Detection", id: "Cypher — Deteksi Ancaman Siber Berbasis AI" },
    team: "Ikan Tenggiri",
    course: "Machine Learning",
    type: { en: "User manual", id: "Manual pengguna" },
    summary: {
      en: "An application that scans suspicious URLs and PDF files and reports whether each target is a threat or safe, together with a risk assessment.",
      id: "Aplikasi yang memindai URL dan file PDF mencurigakan, lalu melaporkan apakah target tersebut berbahaya atau aman, lengkap dengan penilaian risikonya."
    },
    tags: ["Cybersecurity", "Threat Detection", "URL & PDF Scan"]
  }
  ,{
    cohort: 2024,
    file: "assets/guidance/2024/batam-weather-prediction.pdf",
    thumb: "assets/guidance/2024/batam-weather-prediction.webp",
    pages: 8,
    title: { en: "Batam Weather Prediction Website", id: "Website Prediksi Cuaca Batam" },
    course: "Machine Learning",
    date: { en: "Jun 2026", id: "Jun 2026" },
    type: { en: "Manual book", id: "Buku manual" },
    summary: {
      en: "A prototype website that predicts the weather for a chosen district and sub-district in Batam: a Flask backend fetches BMKG weather data for the area, turns it into model features and runs a saved Decision Tree / Random Forest model, showing the result with a confidence score.",
      id: "Prototipe website prediksi cuaca per kecamatan dan kelurahan di Batam: backend Flask mengambil data cuaca BMKG untuk wilayah tersebut, mengolahnya menjadi fitur, lalu menjalankan model Decision Tree / Random Forest dan menampilkan hasil beserta nilai confidence."
    },
    tags: ["Random Forest", "Flask", "BMKG Data"]
  }
  ,{
    cohort: 2024,
    file: "assets/guidance/2024/thrifty-music-recommendation.pdf",
    thumb: "assets/guidance/2024/thrifty-music-recommendation.webp",
    pages: 6,
    landscape: true,
    title: { en: "Thrifty — Music Recommendation System", id: "Thrifty — Sistem Rekomendasi Musik" },
    students: ["Putri Indahyanie Cristbella Lee", "Arwin Johnsus", "Stanley Tan", "Randi William", "Ibnu Ganda Ariyadi Sitorus Pane"],
    course: "Machine Learning",
    date: { en: "Jun 2026", id: "Jun 2026" },
    type: { en: "Presentation", id: "Presentasi" },
    summary: {
      en: "Recommends songs from a reference track and artist; users tune audio characteristics — key, mode, tempo, energy, valence, acousticness and instrumentalness — and filter the recommendations.",
      id: "Merekomendasikan lagu berdasarkan lagu dan artis referensi; pengguna dapat mengatur karakteristik audio — key, mode, tempo, energy, valence, acousticness, dan instrumentalness — serta memfilter hasil rekomendasi."
    },
    tags: ["Recommendation System", "Audio Features"]
  }
  ,{
    cohort: 2024,
    file: "assets/guidance/2024/wajarz-purebalance-health-tracker.pdf",
    thumb: "assets/guidance/2024/wajarz-purebalance-health-tracker.webp",
    pages: 16,
    title: { en: "PureBalance — Health Tracker App", id: "PureBalance — Aplikasi Pelacak Kesehatan" },
    team: "Tim Wajarz",
    course: "Machine Learning",
    date: { en: "Jun 2026", id: "Jun 2026" },
    type: { en: "User guide", id: "Panduan pengguna" },
    summary: {
      en: "An Android app (Kotlin + Jetpack Compose) for tracking daily nutrition, physical activity and body weight, with an XGBoost model that predicts the user's weight trajectory up to 4 weeks ahead and AI menu recommendations, served through FastAPI.",
      id: "Aplikasi Android (Kotlin + Jetpack Compose) untuk melacak nutrisi, aktivitas fisik, dan berat badan harian, dengan model XGBoost yang memprediksi tren berat badan hingga 4 minggu ke depan serta rekomendasi menu AI, dilayani melalui FastAPI."
    },
    tags: ["XGBoost", "Android", "FastAPI"]
  }
  ,{
    cohort: 2023,
    file: "assets/guidance/2023/k911-household-energy-prediction.pdf",
    thumb: "assets/guidance/2023/k911-household-energy-prediction.webp",
    pages: 18,
    landscape: true,
    title: { en: "Household Energy Consumption Prediction", id: "Prediksi Konsumsi Energi Rumah Tangga" },
    team: "Kelompok 9/11",
    students: ["Jason Fredrico", "Frendy Hartono", "Irvan Saputra", "Wandy", "Wilson Teo"],
    course: "Machine Learning",
    type: { en: "Presentation", id: "Presentasi" },
    summary: {
      en: "Predicts household electricity consumption, whose patterns vary with occupant activity, appliance usage, time of day and season. EDA showed appliance usage and temperature as the strongest drivers, and a Random Forest model delivered accurate predictions.",
      id: "Memprediksi konsumsi listrik rumah tangga yang polanya bervariasi menurut aktivitas penghuni, penggunaan peralatan, waktu, dan musim. EDA menunjukkan penggunaan peralatan dan suhu sebagai faktor terkuat, dan model Random Forest menghasilkan prediksi yang akurat."
    },
    tags: ["Random Forest", "Regression", "Energy"]
  }
  ,{
    cohort: 2023,
    file: "assets/guidance/2023/masquerade-ecommerce-sentiment-svm.pdf",
    thumb: "assets/guidance/2023/masquerade-ecommerce-sentiment-svm.webp",
    pages: 12,
    landscape: true,
    title: { en: "E-commerce Review Sentiment Analysis with SVM", id: "Analisis Sentimen Ulasan E-commerce dengan SVM" },
    team: "Masquerade",
    students: ["Robby Wiranto", "Edison Chan", "Wisely Kenneth Lau", "Rudy Winata"],
    course: "Machine Learning",
    type: { en: "Presentation", id: "Presentasi" },
    summary: {
      en: "Classifies Indonesian e-commerce product reviews as positive or negative with an SVM, trained on 11,093 Kaggle reviews (58.6% positive) after text preprocessing, with EDA and word clouds for each sentiment.",
      id: "Mengklasifikasikan ulasan produk e-commerce berbahasa Indonesia menjadi positif atau negatif dengan SVM, dilatih pada 11.093 ulasan dari Kaggle (58,6% positif) setelah pra-pemrosesan teks, dilengkapi EDA dan word cloud tiap sentimen."
    },
    tags: ["SVM", "NLP", "Sentiment Analysis"]
  }
  ,{
    cohort: 2023,
    file: "assets/guidance/2023/nako-mbti-hybrid-nlp.pdf",
    thumb: "assets/guidance/2023/nako-mbti-hybrid-nlp.webp",
    pages: 20,
    landscape: true,
    title: { en: "AI-Based MBTI Personality Test (Hybrid NLP)", id: "Tes Kepribadian MBTI Berbasis AI (Hybrid NLP)" },
    team: "NAKO",
    students: ["Angela Beatrice Lee", "Benedict Darrel", "Darrane Ronaldo", "Hana Naila Syahira", "Joshua La Vonne S"],
    course: "Machine Learning",
    date: { en: "Dec 2025", id: "Des 2025" },
    type: { en: "Presentation", id: "Presentasi" },
    summary: {
      en: "Predicts MBTI type by combining structured questions with free-text analysis: four TF-IDF + Logistic Regression models, one per MBTI dimension and trained on about 8,000 Kaggle texts, give probabilities that are blended 70/30 with the questionnaire for a stable, explainable, real-time result.",
      id: "Memprediksi tipe MBTI dengan menggabungkan pertanyaan terstruktur dan analisis teks bebas: empat model TF-IDF + Logistic Regression, satu per dimensi MBTI dan dilatih pada ±8.000 teks Kaggle, menghasilkan probabilitas yang digabung 70/30 dengan kuesioner agar hasilnya stabil, mudah dijelaskan, dan real-time."
    },
    tags: ["TF-IDF", "Logistic Regression", "NLP"]
  }
  ,{
    cohort: 2023,
    file: "assets/guidance/2023/champions-smart-parking.pdf",
    thumb: "assets/guidance/2023/champions-smart-parking.webp",
    pages: 21,
    landscape: true,
    title: { en: "Smart Parking with Computer Vision", id: "Smart Parking Berbasis Computer Vision" },
    team: "Champions",
    course: "Machine Learning",
    type: { en: "Presentation", id: "Presentasi" },
    summary: {
      en: "Classifies campus parking slots as free or busy from camera images with a YOLO classification model trained on the CNRPark and CNR-EXT datasets; results are sent to a server and shown in real time on an Android app and a web admin dashboard.",
      id: "Mengklasifikasikan slot parkir kampus menjadi kosong atau terisi dari gambar kamera dengan model klasifikasi YOLO yang dilatih pada dataset CNRPark dan CNR-EXT; hasilnya dikirim ke server dan ditampilkan real-time di aplikasi Android dan dashboard web admin."
    },
    tags: ["YOLO", "Computer Vision", "Android"]
  }
  ,{
    cohort: 2023,
    file: "assets/guidance/2023/init-purchase-status-classification.pdf",
    thumb: "assets/guidance/2023/init-purchase-status-classification.webp",
    pages: 14,
    landscape: true,
    title: { en: "Website Visitor Purchase Classification", id: "Klasifikasi Status Pembelian Pengunjung Website" },
    team: "INIT",
    course: "Machine Learning",
    date: { en: "Dec 2025", id: "Des 2025" },
    type: { en: "Presentation", id: "Presentasi" },
    summary: {
      en: "Predicts whether a website visitor will buy, from behaviour such as page views, session duration, bounce rate and traffic source, to help target marketing and retargeting. Logistic Regression was compared with Random Forest and Gradient Boosting after IQR outlier cleaning.",
      id: "Memprediksi apakah pengunjung website akan membeli berdasarkan perilakunya (page views, durasi sesi, bounce rate, sumber traffic) untuk membantu penargetan pemasaran dan retargeting. Logistic Regression dibandingkan dengan Random Forest dan Gradient Boosting setelah pembersihan outlier dengan IQR."
    },
    tags: ["Logistic Regression", "Classification", "Web Analytics"]
  }
  ,{
    cohort: 2023,
    file: "assets/guidance/2023/landsknecht-pothole-detection-yolov8.pdf",
    thumb: "assets/guidance/2023/landsknecht-pothole-detection-yolov8.webp",
    pages: 11,
    landscape: true,
    title: { en: "Pothole Detection with YOLOv8", id: "Deteksi Lubang Jalan (Pothole) dengan YOLOv8" },
    team: "Landsknecht",
    students: ["Wira", "Vin Vin", "Kent", "Andrikie"],
    course: "Machine Learning",
    date: { en: "Dec 2025", id: "Des 2025" },
    type: { en: "Presentation", id: "Presentasi" },
    summary: {
      en: "Real-time road pothole detection through a dashcam or smartphone camera as an early warning for drivers. A YOLOv8 model trained for 40 epochs on 3,021 images (640×640) reached an F1-score of 0.81.",
      id: "Deteksi lubang jalan secara real-time melalui kamera dashcam atau smartphone sebagai peringatan dini bagi pengemudi. Model YOLOv8 yang dilatih 40 epoch pada 3.021 citra (640×640) mencapai F1-score 0,81."
    },
    tags: ["YOLOv8", "Object Detection", "Computer Vision"]
  }
  ,{
    cohort: 2023,
    file: "assets/guidance/2023/zeuhl-pm25-air-pollution-prediction.pdf",
    thumb: "assets/guidance/2023/zeuhl-pm25-air-pollution-prediction.webp",
    pages: 15,
    landscape: true,
    title: { en: "PM2.5 Air Pollution Prediction with Random Forest", id: "Prediksi Polusi Udara PM2.5 dengan Random Forest" },
    team: "ZeuhL",
    students: ["Kelvin Dwi Putra", "Violine", "Christian Stefanus", "Gabriel Tarikh Omar", "Yudi Setyawan"],
    course: "Machine Learning",
    type: { en: "Presentation", id: "Presentasi" },
    summary: {
      en: "Analyses and predicts PM2.5 air-pollution levels with a Random Forest Regressor, from raw-data cleaning to an interactive monitoring-dashboard prototype. Lagged features (pollution one hour earlier, correlation 0.96) were key; the mean absolute error was 10.31 µg/m³.",
      id: "Menganalisis dan memprediksi tingkat polusi udara PM2.5 dengan Random Forest Regressor, dari pembersihan data mentah hingga prototipe dashboard monitoring interaktif. Fitur lag (polusi 1 jam sebelumnya, korelasi 0,96) menjadi kunci; rata-rata kesalahan absolutnya 10,31 µg/m³."
    },
    tags: ["Random Forest", "Time Series", "Dashboard"]
  }
  ,{
    cohort: 2023,
    file: "assets/guidance/2023/xavier-flood-probability-random-forest.pdf",
    thumb: "assets/guidance/2023/xavier-flood-probability-random-forest.webp",
    pages: 26,
    landscape: true,
    title: { en: "Flood Probability Classification with Random Forest", id: "Klasifikasi Probabilitas Banjir dengan Random Forest" },
    team: "Xavier",
    students: ["Rabby Afrizee", "Haris Sulthan", "Jerry Beltsazar", "Bonni Saputra", "Rafli Alamsyah"],
    course: "Machine Learning",
    type: { en: "Presentation", id: "Presentasi" },
    summary: {
      en: "Classifies flood probability from factors such as monsoon intensity, drainage, river management, deforestation, urbanisation and climate change, using feature selection and a Random Forest model compared with other classifiers.",
      id: "Mengklasifikasikan probabilitas banjir dari faktor seperti intensitas monsun, drainase, manajemen sungai, deforestasi, urbanisasi, dan perubahan iklim, menggunakan seleksi fitur dan model Random Forest yang dibandingkan dengan classifier lain."
    },
    tags: ["Random Forest", "Classification", "Feature Selection"]
  }
  ,{
    cohort: 2023,
    file: "assets/guidance/2023/arbal-cyberbullying-detection.pdf",
    thumb: "assets/guidance/2023/arbal-cyberbullying-detection.webp",
    pages: 15,
    title: { en: "Context-Aware Cyberbullying Detection", id: "Deteksi Cyberbullying Berbasis Konteks" },
    team: "Arbal Team",
    students: ["Faisal Hakim", "Noe Prihartoyo S", "Adi Nuzul P", "M. Abdurrahman", "Desthian Chikal S."],
    course: "Machine Learning",
    date: { en: "Dec 2025", id: "Des 2025" },
    type: { en: "Booklet", id: "Booklet" },
    summary: {
      en: "Detects cyberbullying in Indonesian social-media comments while understanding context, such as words with double meanings. Three datasets were merged, slang was normalised and data augmented; TF-IDF 1–3-gram features feed a Logistic Regression model that reached 96% accuracy, with a web dashboard.",
      id: "Mendeteksi cyberbullying pada komentar media sosial berbahasa Indonesia dengan memahami konteks, misalnya kata bermakna ganda. Tiga dataset digabung, bahasa alay dinormalisasi, dan data diaugmentasi; fitur TF-IDF 1–3-gram masuk ke model Logistic Regression dengan akurasi 96%, dilengkapi dashboard web."
    },
    tags: ["Logistic Regression", "N-Gram", "NLP"]
  }

  /* Example — copy, remove the comment markers and fill in:
  ,{
    cohort: 2025,
    file: "assets/guidance/2025/smart-greenhouse.pdf",
    title: "Smart Greenhouse Monitoring with ESP32",
    team: "Team Name",
    students: ["Student 1", "Student 2"],
    course: "Internet of Things",
    date: "Dec 2026",
    type: "Poster",
    summary: { en: "...", id: "..." },
    tags: ["ESP32", "MQTT"]
  }
  */
];
