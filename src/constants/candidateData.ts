import { ChapterData, AppEcosystemItem, AwardItem, ExpertPanelItem, PublicationItem, CandidateProfile } from '../types/cinematic';

export const CANDIDATE_PROFILE: CandidateProfile = {
  name: 'Abdul Halim bin Roslan',
  grade: 'Guru Akademik, DG10',
  school: 'SMK Agama Kerian, Perak',
  experienceYears: 16,
  serviceSince: 2010,
  corePhilosophy: 'Satu gerakan kecil daripada seorang guru bergerak melalui dunia digital yang kompleks sebelum akhirnya menjadi pengetahuan yang sampai kepada minda pelajar.',
  quote: 'Human → Input → Electricity → Computation → Communication → Projection → Human. Guru mencipta, teknologi memproses, sistem menghantar, pelajar menerima.'
};

export const CHAPTERS: ChapterData[] = [
  {
    id: 1,
    chapterNumber: '01',
    title: 'THE INITIATION',
    subtitle: 'Nadi Pendidik & Sentuhan Stylus',
    tagline: 'Guru sebagai Titik Permulaan & Pemangkin Inovasi',
    timeRange: [0.0, 0.20],
    videoTimeRange: [0, 4.16],
    depthScale: '10⁰ m → 10⁻³ m',
    coordinates: '5.1687° N, 100.4855° E',
    primaryColor: '#00f0ff',
    themeGlow: 'rgba(0, 240, 255, 0.35)',
    narrativeFlow: 'Cikgu Halim → Digital Stylus → Digitizer Contact'
  },
  {
    id: 2,
    chapterNumber: '02',
    title: 'THE QUANTUM TRANSIT',
    subtitle: 'Aliran Isyarat & Pengalaman Perkhidmatan',
    tagline: 'Dedikasi 16 Tahun Menerusi Saluran Data',
    timeRange: [0.20, 0.40],
    videoTimeRange: [4.16, 8.32],
    depthScale: '10⁻³ m → 10⁻⁶ m',
    coordinates: '4.5921° N, 101.0901° E',
    primaryColor: '#ff0055',
    themeGlow: 'rgba(255, 0, 85, 0.35)',
    narrativeFlow: 'Sub-Pixel → Electrical Signal → Ribbon Cable'
  },
  {
    id: 3,
    chapterNumber: '03',
    title: 'THE COMPUTATIONAL CORE',
    subtitle: 'Pemproses Silikon & Ekosistem Digital 6 Aplikasi',
    tagline: 'Transformasi Logik Perduaan kepada Solusi Pendidikan',
    timeRange: [0.40, 0.60],
    videoTimeRange: [8.32, 12.48],
    depthScale: '10⁻⁶ m → 10⁻⁹ m',
    coordinates: '3.1390° N, 101.6869° E',
    primaryColor: '#a855f7',
    themeGlow: 'rgba(168, 85, 247, 0.35)',
    narrativeFlow: 'Silicon Substrate → Logic Gates → Binary 0&1 Stream'
  },
  {
    id: 4,
    chapterNumber: '04',
    title: 'THE WAVE PROPAGATION',
    subtitle: 'Pancaran Gelombang & Enjin Optik Unjuran',
    tagline: 'Pencapaian Inovasi Emas & Khidmat Kepakaran STEM',
    timeRange: [0.60, 0.80],
    videoTimeRange: [12.48, 16.64],
    depthScale: '10⁻⁹ m → 10⁻² m',
    coordinates: '2.9264° N, 101.6964° E',
    primaryColor: '#3b82f6',
    themeGlow: 'rgba(59, 130, 246, 0.35)',
    narrativeFlow: 'Wi-Fi RF Wave → Receiver Board → Optical Engine Prism'
  },
  {
    id: 5,
    chapterNumber: '05',
    title: 'THE APEX RETINA & LEGACY',
    subtitle: 'Pencerahan Minda Pelajar & Impak Bersepadu',
    tagline: 'Kitaran Lengkap: Dari Guru, Kepada Teknologi, Menerangi Masa Depan',
    timeRange: [0.80, 1.0],
    videoTimeRange: [16.64, 20.8],
    depthScale: '10⁻² m → 10⁰ m',
    coordinates: '5.1687° N, 100.4855° E',
    primaryColor: '#eab308',
    themeGlow: 'rgba(234, 179, 8, 0.45)',
    narrativeFlow: 'Photonic Light Beam → Student Pupil → Active Retina'
  }
];

export const ACADEMIC_BACKGROUND = [
  {
    year: '2003',
    qualification: 'Sijil Pelajaran Malaysia (SPM)',
    institution: 'SMK Agama Kerian, Perak',
    description: 'Pendidikan menengah asas dengan pencapaian cemerlang dalam aliran Sains Tulen & Agama.'
  },
  {
    year: '2006',
    qualification: 'International Baccalaureate (IB) Diploma',
    institution: 'Kolej MARA Banting, Selangor',
    description: 'Pengajian pra-universiti bertaraf dunia dengan penekanan kepada Fizik, Matematik & Teori Pengetahuan (TOK).'
  },
  {
    year: '2009',
    qualification: 'Ijazah Sarjana Muda (BSc)',
    institution: 'The University of Manchester, United Kingdom',
    description: 'Graduan universiti terkemuka Russell Group UK dengan pengkhususan analitikal dan saintifik.'
  },
  {
    year: '2023',
    qualification: 'Ijazah Sarjana (Master of Science / MEd)',
    institution: 'Universiti Sains Malaysia (USM)',
    description: 'Penyelidikan lanjutan dalam bidang teknologi pendidikan, pedagogi digital, dan reka bentuk intervensi.'
  }
];

export const SERVICE_RECORDS = [
  {
    period: '2010 – 2017',
    role: 'Guru Akademik Fizik & STEM',
    workplace: 'SMK Agama Limbang, Sarawak',
    highlight: 'Merintis penggunaan digital dan makmal Fizik interaktif di pedalaman Sarawak.'
  },
  {
    period: '2017 – 2020',
    role: 'Guru Akademik Fizik / Inovator',
    workplace: 'SMK Agama Kerian, Perak',
    highlight: 'Penerima Anugerah PdP Kreatif & Inovatif Hari Guru Negeri Perak 2020.'
  },
  {
    period: '2020 – 2022',
    role: 'Pegawai Pendidikan',
    workplace: 'Bahagian Tajaan Pendidikan (BTP), KPM',
    highlight: 'Pengalaman dasar tajaan dan penilaian kualiti pendidikan peringkat kementerian.'
  },
  {
    period: '2022 – 2026',
    role: 'Guru Akademik Tingkatan 6 / Fizik (DG10)',
    workplace: 'SMK Agama Kerian, Perak',
    highlight: 'Pencapaian markah prestasi tahunan konsisten cemerlang: 94.60 (2022), 92.92 (2023), 93.73 (2024).'
  }
];

export const APP_ECOSYSTEM: AppEcosystemItem[] = [
  {
    id: 'myphysicstutor',
    name: 'MyPhysicsTutor',
    category: 'Platform Pembelajaran Komprehensif',
    tagline: 'Ekosistem Pembelajaran Fizik Lengkap',
    description: 'Platform pembelajaran Fizik SPM komprehensif yang mengintegrasikan nota padat, latihan bertingkat, video tutorial beranimasi, dan ujian interaktif berasaskan DSKP KSSM.',
    features: [
      'Modul Nota Interaktif Tingkatan 4 & 5',
      'Bank Soalan Berasaskan Konstruk Peperiksaan',
      'Penilaian Kendiri Automatik dengan Maklum Balas Pintar',
      'Integrasi Animasi Konsep Fizik Beresolusi Tinggi'
    ],
    impactMetric: '> 5,000+ Pelajar Seluruh Negara Terbantu',
    techStack: ['Web App', 'Interactive Canvas', 'Cloud DB', 'PWA'],
    status: 'Aktif & Digunakan Luas',
    badgeColor: 'border-cyan-500/40 bg-cyan-950/30 text-cyan-400'
  },
  {
    id: 'physflix',
    name: 'PhysFlix',
    category: 'Web App Video Pembelajaran',
    tagline: 'Netflix Pembelajaran Fizik SPM',
    description: 'Aplikasi penstriman video pembelajaran Fizik berasaskan web yang menyajikan video penerangan konsep, eksperimen makmal, dan bedah soalan percubaan secara mikro-topik.',
    features: [
      'Katalog Video Mengikut Bab & Subtopik Terkini',
      'Pemain Video Pintar dengan Timecode Bab & Nota Pantas',
      'Pengoptimuman Bitrate Adaptif untuk Akses Luar Bandar',
      'Playlist Khusus Ulang Kaji Pecutan SPM'
    ],
    impactMetric: '> 100+ Video Pembelajaran Berdefinisi Tinggi',
    techStack: ['Video Streaming', 'HLS/DASH', 'React', 'CDN Fast-Delivery'],
    status: 'Aktif & Popular',
    badgeColor: 'border-red-500/40 bg-red-950/30 text-red-400'
  },
  {
    id: 'physplot',
    name: 'PhysPlot',
    category: 'Simulasi & Kemahiran Graf',
    tagline: 'Latihan & Penilaian Kemahiran Graf Fizik',
    description: 'Aplikasi interaktif yang direka khusus untuk melatih dan menilai kemahiran melukis, mentafsir, mengekstrak kecerunan serta menghubungkait pemboleh ubah dalam graf Fizik SPM Kertas 3 & 2.',
    features: [
      'Alat Plotting Graf Sentuhan Digital Precision Grid',
      'Pengiraan Kecerunan & Unit Automatik untuk Semakan Guru',
      'Mod Latihan Berpandu & Mod Ujian Kendiri',
      'Eksport Graf PDF Berkualiti Tinggi untuk Laporan Amali'
    ],
    impactMetric: 'Peningkatan 85% Ketepatan Graf Murid Amali SPM',
    techStack: ['HTML5 Canvas Engine', 'SVG Vector Math', 'JavaScript'],
    status: 'Inovasi Emas IIEF 2025',
    badgeColor: 'border-emerald-500/40 bg-emerald-950/30 text-emerald-400'
  },
  {
    id: 'headcountpro',
    name: 'HeadcountPro',
    category: 'Analisis Prestasi & Intervensi',
    tagline: 'Sistem Analisis Akademik & Intervensi SPM Pintar',
    description: 'Sistem analisis data peperiksaan dan intervensi murid yang membantu guru menjejaki jurang pembelajaran (learning loss), meramal gred SPM berasaskan headcount dinamik, dan menjana pelan intervensi.',
    features: [
      'Pengiraan Headcount Automatik (TOV, ETR, OTR)',
      'Pengesanan Pintar Murid Berisiko & Murid Potensi Cemerlang',
      'Penjanaan Laporan Analisis Item & Konstruk Berwarna',
      'Pelan Intervensi Terperinci Berasaskan Topik Lemah'
    ],
    impactMetric: 'Digunakan oleh Panitia Sekolah & Peringkat Daerah',
    techStack: ['Data Analytics Engine', 'Interactive Dashboards', 'Excel Bridge'],
    status: 'Alat Pengurusan Berimpak Tinggi',
    badgeColor: 'border-amber-500/40 bg-amber-950/30 text-amber-400'
  },
  {
    id: 'cidssuitespro',
    name: 'CIDS Suites Pro',
    category: 'Automasi Pengurusan PdP & RPH',
    tagline: 'Sistem Automasi RPH, RPT & e-RPH Termaju',
    description: 'Suite automasi pengurusan kurikulum dan penghasilan Rancangan Pengajaran Harian (RPH) serta Rancangan Pengajaran Tahunan (RPT) dengan integrasi DSKP dan integrasi format KPM.',
    features: [
      'Penjanaan RPH Pintar Berasaskan Standard Kandungan DSKP',
      'Penyelarasan Kalendar Akademik & Takwim Minggu Sekolah',
      'Eksport e-RPH Automatik Sedia Hantar',
      'Penjimatan Masa Guru Sehingga 70% Setiap Minggu'
    ],
    impactMetric: 'Penjimatan Masa Guru Lebih 120 Jam Setahun',
    techStack: ['Desktop + Android App', 'Local SQLite / Sync', 'Document Automator'],
    status: 'Automasi Utama Guru',
    badgeColor: 'border-violet-500/40 bg-violet-950/30 text-violet-400'
  },
  {
    id: 'cikguscan',
    name: 'CikguScan',
    category: 'Aplikasi Sokongan Digital',
    tagline: 'Pengimbas & Pengurusan Kehadiran/Aset Pantas',
    description: 'Aplikasi utiliti digital mudah alih untuk pengimbasan kod QR pantas, pengurusan rekod aktiviti kokurikulum, semakan inventori makmal Fizik, dan pengurusan kelas secara masa nyata.',
    features: [
      'Pengimbasan Pantas QR Code & Barcode Murid',
      'Perekodan Data Luar Talian (Offline-First Architecture)',
      'Sinkronisasi Automatik ke Lembaran Kerja Google / Cloud',
      'Antara Muka Mesra Guru Satu Tangan (One-Hand UX)'
    ],
    impactMetric: 'Pengurusan Kelas & Makmal Tanpa Kertas (Paperless)',
    techStack: ['Mobile Scanner Engine', 'Local Storage', 'PWA Engine'],
    status: 'Utiliti Digital Guru',
    badgeColor: 'border-sky-500/40 bg-sky-950/30 text-sky-400'
  }
];

export const AWARDS: AwardItem[] = [
  {
    year: '2025',
    title: 'International Invention & Educational Fair (IIEF 2025)',
    level: 'Antarabangsa',
    award: 'EMAS',
    organization: 'Jawatankuasa Saintifik Antarabangsa IIEF',
    description: 'Pengiktirafan Pingat Emas Antarabangsa bagi inovasi digital pendidikan fizik berimpak tinggi.'
  },
  {
    year: '2025',
    title: "I3EC'25 Idea Competition",
    level: 'Kebangsaan / Antarabangsa',
    award: 'EMAS',
    organization: 'International Innovation & Invention Competition',
    description: 'Pingat Emas bagi konseptualisasi dan pembangunan platform pembelajaran digital masa hadapan.'
  },
  {
    year: '2025',
    title: 'Innozilla Innovation Competition 2025',
    level: 'Kebangsaan',
    award: 'PERAK',
    organization: 'Innozilla Innovation Consortium',
    description: 'Pingat Perak bagi pembangunan perisian interaktif PhysPlot & ekosistem digital guru.'
  },
  {
    year: '2024',
    title: 'Pertandingan Inovasi Daerah Kerian 2024',
    level: 'Daerah / Negeri',
    award: 'JOHAN',
    organization: 'Pejabat Pendidikan Daerah Kerian',
    description: 'Johan Keseluruhan & Pingat Emas Kategori Guru bagi pembangunan ekosistem pembelajaran digital komprehensif.'
  },
  {
    year: '2022',
    title: 'Conference on Science, Innovation & Digitalization (COSCID 2022)',
    level: 'Kebangsaan',
    award: 'TERBAIK',
    organization: 'Kementerian Pendidikan Malaysia & Agensi STEM',
    description: 'Anugerah Pembentang Terbaik bagi kertas penyelidikan aplikasi digital dalam pengajaran Fizik.'
  },
  {
    year: '2020',
    title: 'Anugerah PdP Kreatif & Inovatif Hari Guru Negeri Perak 2020',
    level: 'Negeri',
    award: 'ANUGERAH',
    organization: 'Jabatan Pendidikan Negeri Perak',
    description: 'Pengiktirafan tertinggi peringkat negeri Perak bagi amalan pengajaran dan pembelajaran paling kreatif & berinovasi.'
  },
  {
    year: '2016 & 2026',
    title: 'Anugerah Perkhidmatan Cemerlang (APC)',
    level: 'Kementerian Pendidikan Malaysia',
    award: 'ANUGERAH',
    organization: 'KPM / JPN Perak',
    description: 'Penerima APC sebanyak dua kali atas ketrampilan prestasi perkhidmatan konsisten melebihi 93-94%.'
  }
];

export const EXPERT_PANELS: ExpertPanelItem[] = [
  {
    role: 'Panel Penyelidikan Kandungan Ilmu Fizik Teknologi Dron',
    body: 'Universiti Kebangsaan Malaysia (UKM)',
    domain: 'Integrasi Prinsip Aerodinamik & Teknologi Dron dalam Kurikulum Sains',
    period: 'Penyelidik Jemputan'
  },
  {
    role: 'Panel Pembinaan Modul MOBIM KSSM Fizik',
    body: 'Bahagian Pembangunan Kurikulum (BPK), KPM',
    domain: 'Modul Bimbingan Guru bagi Standard Kurikulum dan Pentaksiran Fizik',
    period: 'Panel Kebangsaan'
  },
  {
    role: 'Panel Panduan PdP SDG & 4IR',
    body: 'Bahagian Pembangunan Kurikulum (BPK), KPM',
    domain: 'Penyediaan Panduan Pedagogi Matlamat Pembangunan Mampan & Revolusi Industri 4.0',
    period: 'Panel Pakar KPM'
  },
  {
    role: 'Panel Modul Intervensi Menengah Atas Perak',
    body: 'Jabatan Pendidikan Negeri (JPN) Perak',
    domain: 'Pembangunan Bahan Intervensi Fizik SPM Berimpak Tinggi Peringkat Negeri',
    period: 'Panel Negeri Perak'
  }
];

export const PUBLICATIONS: PublicationItem[] = [
  {
    title: 'MyHomePhysics Lab Tingkatan 4 & 5',
    type: 'Modul Amali Digital & Interaktif',
    target: 'Murid Menengah Atas SPM',
    description: 'Panduan eksperimen Fizik lengkap dengan simulasi konsep, lembaran kerja amali, dan analisis data berpandu.'
  },
  {
    title: 'CheatNote Fizik Tingkatan 4 & 5',
    type: 'Nota Visual & Peta Konsep Padat',
    target: 'Calon SPM & Guru Fizik',
    description: 'Ringkasan formula, hukum asas, dan gambar rajah berlabel beresolusi tinggi untuk hafalan pantas dan kefahaman mendalam.'
  },
  {
    title: 'Modul Konstruk Fizik Tingkatan 4 & 5',
    type: 'Bank Soalan KBAT & Analisis Konstruk',
    target: 'Pengukuhan Peperiksaan SPM',
    description: 'Koleksi soalan terancang mengikut aras taksonomi Bloom dan konstruk Lembaga Peperiksaan Malaysia.'
  },
  {
    title: 'Rona-Rona Pendidik: Anekdot Edufluencer KPM Perak',
    type: 'Buku Penerbitan Digital & Motivasi',
    target: 'Warga Pendidik Malaysia',
    description: 'Kompilasi kisah inspirasi, refleksi pedagogi dan perjalanan inovasi digital seorang guru di bilik darjah.'
  }
];

export const PROFESSIONAL_RECOGNITION = [
  {
    title: 'Apple Learning Coach',
    organization: 'Apple South East Asia (Apple SEA)',
    year: '2026',
    badge: 'Certified Coach',
    description: 'Jurulatih bertauliah Apple antarabangsa dalam bimbingan teknologi pedagogi digital abad ke-21.'
  },
  {
    title: 'Wakil Institusi NUTP',
    organization: 'Kesatuan Perkhidmatan Perguruan Kebangsaan',
    year: '2026',
    badge: 'Institutional Rep',
    description: 'Kepimpinan profesional guru dalam menyuarakan kebajikan dan kemajuan teknologi pendidikan.'
  },
  {
    title: 'Hakim Pertandingan Robotik Kebangsaan (Peringkat Perak)',
    organization: 'KPM / JPN Perak',
    year: 'Pelbagai Sesi',
    badge: 'Chief Technical Judge',
    description: 'Penilaian reka bentuk algoritma, mekanikal dan program mikropengawal bagi pasukan robotik sekolah.'
  },
  {
    title: 'Penceramah Kebangsaan & Daerah (NotebookLM, Gemini, Apps Script)',
    organization: 'PPD Kerian & Komuniti Pendidik',
    year: '2024 – 2026',
    badge: 'Keynote Speaker',
    description: 'Membimbing ratusan guru dalam pemanfaatan Kecerdasan Buatan (AI) generatif dan automasi pengurusan bilik darjah.'
  }
];

export const ANNUAL_PERFORMANCE_METRICS = [
  { year: '2022', score: 94.60, status: 'Cemerlang' },
  { year: '2023', score: 92.92, status: 'Cemerlang' },
  { year: '2024', score: 93.73, status: 'Cemerlang' }
];
