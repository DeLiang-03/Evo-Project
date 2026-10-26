import { SectorOption, CalculatorQuestion, HypotheticalRobotPartner, HumanOnlySkill, SectorId } from '../types';

export const SECTORS_DATA: SectorOption[] = [
  {
    id: 'medis',
    name: 'Medis & Bedah Presisi',
    category: 'Healthcare & Life Sciences',
    iconName: 'Activity',
    tagline: 'Operasi mikroskopik, diagnosis prediktif genomik & perawatan intensif',
    baseAutomationIndex: 58,
    baseHumanSynergyIndex: 78,
    description: 'Transformasi robotika bedah sub-milimeter, nano-bot pengantar obat bertarget, dan sistem perawatan intensif otonom.',
    accentColor: '#00f2fe'
  },
  {
    id: 'logistik',
    name: 'Logistik & Manufaktur Presisi',
    category: 'Supply Chain & Heavy Industry',
    iconName: 'Package',
    tagline: 'Gudang gelap otonom, perakitan mikron, & distribusi drone hiper-cepat',
    baseAutomationIndex: 82,
    baseHumanSynergyIndex: 45,
    description: 'Ekosistem rantai pasok terhubung dengan kawanan robot AGV/AMR dan lengan robotik kolaboratif (Cobot).',
    accentColor: '#38bdf8'
  },
  {
    id: 'software',
    name: 'Rekayasa Perangkat Lunak & AI',
    category: 'Information Technology',
    iconName: 'Terminal',
    tagline: 'Sintesis kode kuantum, arsitektur otonom, & debugging real-time',
    baseAutomationIndex: 70,
    baseHumanSynergyIndex: 84,
    description: 'Simbiosis antara arsitek sistem biologis (manusia) dengan agen kompilasi sintetik cerdas berkecepatan petaflops.',
    accentColor: '#818cf8'
  },
  {
    id: 'kreatif',
    name: 'Seni, Media & Desain Kreatif',
    category: 'Creative Economy & Media',
    iconName: 'Palette',
    tagline: 'Sintesis audio-visual generatif, desain spasial, & penceritaan immersif',
    baseAutomationIndex: 42,
    baseHumanSynergyIndex: 92,
    description: 'Evolusi dari kreasi manual ke orkestrasi gagasan filosofis, rasa estetika personal, dan makna emosional lintas budaya.',
    accentColor: '#c084fc'
  },
  {
    id: 'pertanian',
    name: 'Pertanian Presisi & Biosfer',
    category: 'Agritech & Environment',
    iconName: 'Sprout',
    tagline: 'Vertical hydroponics, drone bio-pestisida, & pemanen robotik terpandu',
    baseAutomationIndex: 74,
    baseHumanSynergyIndex: 52,
    description: 'Pertanian ramah iklim terotomasi yang dipantau satelit dan dirawat unit robot bio-sintetik per hektar tanah.',
    accentColor: '#4ade80'
  },
  {
    id: 'pendidikan',
    name: 'Pendidikan & Riset Akademik',
    category: 'Education & Cognitive Sciences',
    iconName: 'GraduationCap',
    tagline: 'Tutor humanoid adaptif, laboratorium otonom, & neuro-mentoring',
    baseAutomationIndex: 46,
    baseHumanSynergyIndex: 89,
    description: 'Kurikulum hiper-personalisasi berbasis data neuro-kognitif siswa dengan pendampingan empati manusia sebagai jangkar nilai moral.',
    accentColor: '#f59e0b'
  },
  {
    id: 'fintech',
    name: 'Finansial & Keuangan Algoritmik',
    category: 'Fintech & Quantitative Markets',
    iconName: 'TrendingUp',
    tagline: 'Audit kriptografis desentral, mikro-transaksi instan, & risk hedge',
    baseAutomationIndex: 78,
    baseHumanSynergyIndex: 61,
    description: 'Pasar modal kuantum yang dioperasikan bot frekuensi sub-milidetik, diawasi oleh strategi makro-ekonomi manusia.',
    accentColor: '#e879f9'
  },
  {
    id: 'antariksa',
    name: 'Eksplorasi Luar Angkasa & Ekstrem',
    category: 'Deep Tech & Aerospace',
    iconName: 'Compass',
    tagline: 'Penambangan asteroid, pangkalan Bulan/Mars, & robot penjelajah kriogenik',
    baseAutomationIndex: 88,
    baseHumanSynergyIndex: 65,
    description: 'Misi eksplorasi lingkungan berbahaya tanpa oksigen yang mengandalkan robotika bionik tahan radiasi ekstrem.',
    accentColor: '#06b6d4'
  }
];

export const WORKFLOW_QUESTIONS: CalculatorQuestion[] = [
  {
    id: 1,
    title: 'Bagaimana proporsi tugas rutin & berulang dalam alur kerja harian Anda?',
    subtitle: 'Mengukur tingkat kerentanan tugas prosedural terhadap otomatisasi aktuasi deterministik.',
    options: [
      {
        id: 'q1_a',
        text: 'Sangat Tinggi (>75% waktu kerja adalah prosedur standar, entri data, atau repetisi fisik)',
        automationDelta: 24,
        synergyDelta: -12,
        trait: 'High-Repetition Procedural'
      },
      {
        id: 'q1_b',
        text: 'Seimbang (50% rutin prosedural, 50% memerlukan adaptasi cepat & improvisasi dinamis)',
        automationDelta: 8,
        synergyDelta: 14,
        trait: 'Hybrid Dynamic-Procedural'
      },
      {
        id: 'q1_c',
        text: 'Sangat Rendah (<20% rutin, mayoritas penyelesaian masalah unik, tak terduga, dan eksperimental)',
        automationDelta: -10,
        synergyDelta: 25,
        trait: 'High-Variability Heuristic'
      }
    ]
  },
  {
    id: 2,
    title: 'Seberapa besar keterlibatan empati manusia, negosiasi etis, dan persuasi antarpribadi dalam profesi Anda?',
    subtitle: 'Mengukur batas "Turing Interpersonal" yang sulit direplikasi neural network deterministik.',
    options: [
      {
        id: 'q2_a',
        text: 'Minimal (Interaksi dominan berbasis instruksi teknis, mesin, angka, atau sistem tertutup)',
        automationDelta: 16,
        synergyDelta: -8,
        trait: 'System-Centric Interaction'
      },
      {
        id: 'q2_b',
        text: 'Sedang (Kolaborasi tim internal terstruktur, koordinasi teknis, dan komunikasi manajerial)',
        automationDelta: 2,
        synergyDelta: 12,
        trait: 'Collaborative Technical'
      },
      {
        id: 'q2_c',
        text: 'Sentral & Mutlak (Konseling psikologis, pertimbangan etis hidup-mati, negosiasi krisis, atau kepemimpinan moral)',
        automationDelta: -16,
        synergyDelta: 28,
        trait: 'Deep Human Resonance'
      }
    ]
  },
  {
    id: 3,
    title: 'Bagaimana pendekatan Anda dalam memecahkan masalah kompleks ketika data historis tidak tersedia (Zero-shot crisis)?',
    subtitle: 'Mengukur keunggulan intuisi kognitif lateral vs komputasi pola statistik AI.',
    options: [
      {
        id: 'q3_a',
        text: 'Mencari panduan regulasi tertulis, best-practice terdokumentasi, atau logika algoritma yang ada',
        automationDelta: 18,
        synergyDelta: -5,
        trait: 'Rule-Bound Deductive'
      },
      {
        id: 'q3_b',
        text: 'Menggabungkan analitik data komputasi dengan penilaian intuisi kontekstual lapangan',
        automationDelta: 6,
        synergyDelta: 18,
        trait: 'Symbiotic Analytical-Intuitive'
      },
      {
        id: 'q3_c',
        text: 'Menciptakan paradigma baru, melanggar konvensi lama dengan pertimbangan filosofis dan imajinasi murni',
        automationDelta: -14,
        synergyDelta: 26,
        trait: 'Paradigm-Shifting Creative'
      }
    ]
  }
];

export const ROBOT_PARTNERS_BY_SECTOR: Record<SectorId, HypotheticalRobotPartner> = {
  medis: {
    modelCode: 'MED-NEURO-V9',
    codename: 'Aeskulap Synapse',
    generation: 'Gen-6 Bio-Hybrid Surgical Platform',
    primaryRole: 'Asisten Bedah Kuantum & Micro-Vascular Stabilizer',
    coreSpecifications: {
      neuralCore: 'Quantum Neuromorphic Core 400 Qubit (0.02ms latency)',
      actuatorType: 'Magnetostrictive Bionic Tendons (Presisi 0.5 mikron)',
      perceptionLatency: '0.003 ms (Multi-spectral OCT + Holographic MRI)',
      powerAutonomy: 'Micro-Nuclear Betavoltaic Cell (Masa aktif 15 tahun)',
      safeguardProtocol: 'Asimov Triple-Zero Medical Charter (Hardware Hardwired)'
    },
    keyFunctions: [
      'Stabilisasi tremor tangan manusia secara otomatis pada skala seluler',
      'Pemetaan waktu-nyata distribusi obat kemoterapi berbasis targeted nanobots',
      'Prediksi hemodinamik pasien 15 menit sebelum terjadi serangan kritis'
    ],
    humanSymbiosisMethod: 'Dokter bedah manusia menentukan etika klinis dan strategi organ, sementara Aeskulap mengeksekusi diseksi mikron dengan keamanan 99.999%.',
    hologramHue: '#00f2fe'
  },
  logistik: {
    modelCode: 'LOG-OMNI-X8',
    codename: 'Titan Swarm-Core',
    generation: 'Autonomous Material Synthesizer & Kinetic Courier',
    primaryRole: 'Orkestrator Rantai Pasok Kinetik & Muatan Berat',
    coreSpecifications: {
      neuralCore: 'Decentralized Swarm Mesh Core (10.000 Node Simultan)',
      actuatorType: 'Superconducting Magnetic Levitation Motors (1200 Nm)',
      perceptionLatency: '0.01 ms Solid-State LiDAR 360 LiDAR V4',
      powerAutonomy: 'Wireless Resonant Inductive Pad + Graphene Supercap',
      safeguardProtocol: 'Dynamic Zero-Collision Zone 6-DoF Radar Envelope'
    },
    keyFunctions: [
      'Penyusunan ulang tata letak logistik 4D secara prediktif sebelum pesanan tiba',
      'Penanganan kargo kimia dan radioaktif tanpa paparan biologis',
      'Swarm self-healing: pergantian unit rusak dalam tempo 4 detik tanpa henti operasi'
    ],
    humanSymbiosisMethod: 'Manajer logistik merancang kebijakan makro geo-ekonomi dan keberlanjutan hijau, Titan mengeksekusi pergerakan material otonom 24/7.',
    hologramHue: '#38bdf8'
  },
  software: {
    modelCode: 'SYN-ARCHON-01',
    codename: 'Synthetix Quantum-Forge',
    generation: 'Autonomous Software Genesis Engine',
    primaryRole: 'Partner Arsitektur Perangkat Lunak & Neural Copilot',
    coreSpecifications: {
      neuralCore: 'Self-Compiling Hyper-Transformer Core (10 Triliun Parameter)',
      actuatorType: 'Direct Photonic Neural Link (Optical Fiber Bus 100 Tbps)',
      perceptionLatency: 'Instantaneous AST Code Parsing (Real-time AST)',
      powerAutonomy: 'Direct Data-Center Superconductor Tap',
      safeguardProtocol: 'Formal Mathematical Invariant Verification Suite'
    },
    keyFunctions: [
      'Refactoring otomatis kode monolitik warisan menjadi micro-kernels terdesentralisasi',
      'Pemberantasan zero-day vulnerability secara proaktif sebelum eksploitasi muncul',
      'Penerjemahan intent bahasa alami manusia ke dalam model matematis deterministik'
    ],
    humanSymbiosisMethod: 'Engineer manusia memimpin arsitektur sistem konseptual, domain logic bisnis, dan tanggung jawab etika AI; Archon menangani optimasi level assembly.',
    hologramHue: '#818cf8'
  },
  kreatif: {
    modelCode: 'AURA-SYNTH-IX',
    codename: 'Mnemosyne Muse',
    generation: 'Affective Cognitive Co-Creator',
    primaryRole: 'Katalisator Eksplorasi Seni Spasial & Rekayasa Emosi',
    coreSpecifications: {
      neuralCore: 'Cross-Modal Affective Synthesizer (Neuro-Sensory Array)',
      actuatorType: 'Fluid Haptic Micro-Vibrators (Resonansi Frekuensi Akustik)',
      perceptionLatency: 'Biometric Micro-Expression Sensor (Heartbeat & Pupil Dilation)',
      powerAutonomy: 'Kinetic Ambient Energy Scavenger',
      safeguardProtocol: 'Intellectual Attribution Proof & Creative Non-Plagiarism Key'
    },
    keyFunctions: [
      'Penerjemahan ide abstrak sketsa kasar menjadi rendering simulasi fisika volumetrik',
      'Eksplorasi ribuan variasi palet harmoni warna dan dinamika akustik dalam hitungan detik',
      'Pencatatan resonansi emosi penonton untuk iterasi karya interaktif'
    ],
    humanSymbiosisMethod: 'Seniman manusia menyuntikkan rasa, jiwa pengalaman hidup fana, penderitaan, dan cinta; Mnemosyne mewujudkan medium fisiknya tanpa batas teknis.',
    hologramHue: '#c084fc'
  },
  pertanian: {
    modelCode: 'BIO-HYPERION-4',
    codename: 'Demeter Terra-Bot',
    generation: 'Autonomous Agro-Ecological Swarm Unit',
    primaryRole: 'Penjaga Biosfer Mikro & Pemanen Selektif Bio-Optik',
    coreSpecifications: {
      neuralCore: 'Edge Bio-Sensor Vision Model (Identifikasi 50.000 Patogen Tanaman)',
      actuatorType: 'Soft Silicon Pneumatic Grippers (Sentuhan Lembut Buah Rapuh)',
      perceptionLatency: 'Hyperspectral Chlorophyll Fluorescence Scanner (0.1ms)',
      powerAutonomy: 'Solar Skin + Biodegradable Biogas Fuel Cell',
      safeguardProtocol: 'Ecological Soil Microbiome Protection Guarantee'
    },
    keyFunctions: [
      'Penyerbukan presisi bunga tanaman secara selektif tanpa merusak serangga lokal',
      'Injeksi mikro-nutrisi dosis akurat ke akar tanaman individual sesuai defisiensi',
      'Pembersihan gulma secara termal laser tanpa pestisida sintetis'
    ],
    humanSymbiosisMethod: 'Agronomis manusia merancang ketahanan pangan dan biodiversitas varietas, Hyperion merawat kesehatan tiap individu helai daun.',
    hologramHue: '#4ade80'
  },
  pendidikan: {
    modelCode: 'NEURO-SOPHIA-2',
    codename: 'Athena Pedagogy',
    generation: 'Humanoid Cognitive Tutor & Socratic Facilitator',
    primaryRole: 'Mentor Kognitif Adaptif & Simulator Laboratorium Realitas',
    coreSpecifications: {
      neuralCore: 'Socratic Dialogue Engine with Real-Time Learning Curve Profiling',
      actuatorType: 'Soft Silicone Humanoid Facial Muscles (48 Expressive Motors)',
      perceptionLatency: 'Gaze & Confusion Detection Tracking (60 FPS Eye Ray)',
      powerAutonomy: 'Lithium-Sulfur Solid State Battery (48 Jam Penuh)',
      safeguardProtocol: 'Child Psychological Safety & Bias-Neutralization Shield'
    },
    keyFunctions: [
      'Penyesuaian ritme penyampaian konsep matematika/sains sesuai kecepatan pemahaman siswa',
      'Visualisasi konsep fisika kuantum dalam bentuk hologram interaktif di ruang kelas',
      'Pendeteksian dini kelelahan mental, disleksia, atau frustrasi belajar'
    ],
    humanSymbiosisMethod: 'Guru manusia menjadi figur teladan moral, pembimbing karakter, dan empati sosial; Athena menangani latihan soal dan remediasi teknis tanpa lelah.',
    hologramHue: '#f59e0b'
  },
  fintech: {
    modelCode: 'QUANT-ORACLE-7',
    codename: 'Aether Capital',
    generation: 'Quantum Algorithmic Risk Synthesizer',
    primaryRole: 'Penilai Risiko Sistemik & Validator Transaksi Kripto-Spasial',
    coreSpecifications: {
      neuralCore: 'Quantum Topological Data Analysis Core (1.000.000 Transaksi/detik)',
      actuatorType: 'Holographic Decision Interface (Zero Physical Parts)',
      perceptionLatency: 'Global Optical Fiber Ticker Feed (0.0001 ms)',
      powerAutonomy: 'High-Density Server Rail Power',
      safeguardProtocol: 'Basel VI Anti-Flash Crash Mathematical Circuit Breaker'
    },
    keyFunctions: [
      'Simulasi stress test krisis makro ekonomi global dalam 100.000 cabang probabilitas',
      'Deteksi pencucian uang otomatis lintas ribuan jaringan blockchain dalam seketika',
      'Alokasi portofolio hijau berbasis dampak emisi karbon riil perusahaan'
    ],
    humanSymbiosisMethod: 'Ekonom manusia merumuskan visi pemerataan kesejahteraan dan regulasi etis pasar; Aether menjaga integritas likuiditas tanpa deviasi emosi sesaat.',
    hologramHue: '#e879f9'
  },
  antariksa: {
    modelCode: 'EXO-ARES-OMEGA',
    codename: 'Valkyrie Deep-Void',
    generation: 'Autonomous Cryogenic Planetary Constructor',
    primaryRole: 'Pembangun Habitat Ekstrem & Penambang Regolith Bulan/Mars',
    coreSpecifications: {
      neuralCore: 'Radiation-Hardened Gallium Nitride Neural Processor',
      actuatorType: 'Harmonic Drive Cryo-Actuators (Operasional -180°C s/d +200°C)',
      perceptionLatency: 'Synthetic Aperture Radar + Cosmic Ray Counter',
      powerAutonomy: 'Radioisotope Thermoelectric Generator (RTG 30 Tahun)',
      safeguardProtocol: 'Planetary Planetary Protection Planetary Quarantine Class IV'
    },
    keyFunctions: [
      'Konstruksi kubah proteksi radiasi kosmik berbasis 3D sintering regolith Mars',
      'Pengeboran es bawah permukaan untuk produksi oksigen dan bahan bakar roket',
      'Manuver otonom di ruang vakum dengan gravitasi nol (Zero-G)'
    ],
    humanSymbiosisMethod: 'Astronot manusia memimpin eksplorasi sains fundamental dan keputusan kolonisasi, Valkyrie bekerja di ruang radiasi mematikan tanpa henti.',
    hologramHue: '#06b6d4'
  }
};

export const HUMAN_SKILLS_RECOMMENDATIONS: Record<SectorId, HumanOnlySkill[]> = {
  medis: [
    {
      name: 'Etika Bio-Klinis & Pengambilan Keputusan Eksistensial',
      importance: 'Kritis',
      description: 'Menentukan kapan harus melanjutkan atau menghentikan terapi pada kondisi kritis berdasar martabat manusia, nilai spiritual, dan restu keluarga—wilayah yang tidak boleh diputuskan oleh skor probabilitas AI.',
      actionableStep: 'Perdalam studi bioetika modern, komunikasi krisis keluarga pasien, dan kepemimpinan medik terpadu.'
    },
    {
      name: 'Empati Terapeutik & Sentuhan Humanis',
      importance: 'Sangat Tinggi',
      description: 'Efek plasebo positif dan penurunan kecemasan pasien terbukti secara neurologis terjadi ketika pasien merasakan kasih sayang tulus dari sesama manusia.',
      actionableStep: 'Latih active listening klinis dan pemahaman psikoneuroimunologi dalam interaksi dokter-pasien.'
    }
  ],
  logistik: [
    {
      name: 'Resiliensi Geopolitik & Mitigasi Risiko Anomali',
      importance: 'Kritis',
      description: 'Menghadapi perang dagang, bencana iklim global tak terduga, dan embargo kebijakan pemerintah yang berada di luar dataset pelatihan robot logistik.',
      actionableStep: 'Kuasai hukum maritim internasional, diplomasi logistik lintas batas, dan perancangan strategi sirkular rantai pasok.'
    },
    {
      name: 'Human-Robot Safety Governance & Ergonomi',
      importance: 'Tinggi',
      description: 'Audit lingkungan kerja hibrida agar keselamatan pekerja biologis tetap terjamin di tengah pergerakan mesin berkekuatan tinggi.',
      actionableStep: 'Ambil sertifikasi internasional ISO 10218 (Industrial Robot Safety) dan desain ergonomi human-centric.'
    }
  ],
  software: [
    {
      name: 'Penyelarasan Nilai Filosofis (AI Alignment & Safety)',
      importance: 'Kritis',
      description: 'Memastikan tujuan perangkat lunak cerdas tidak menyimpang dari moralitas kemanusiaan (anti-bias, keadilan sosial, transparansi algoritma).',
      actionableStep: 'Fokus pada riset formal verification, AI ethics governance, dan arsitektur sistem tahan sensor.'
    },
    {
      name: 'Arsitektur Spasial & Pemodelan Domain Kompleks',
      importance: 'Sangat Tinggi',
      description: 'Menerjemahkan kekacauan dunia nyata dan kebutuhan emosional klien menjadi struktur data elegan sebelum baris kode pertama ditulis oleh AI.',
      actionableStep: 'Pelajari Domain-Driven Design (DDD), teori sistem dinamis, dan interaksi manusia-komputer multi-modal.'
    }
  ],
  kreatif: [
    {
      name: 'Kekayaan Pengalaman Eksistensial & Rasa Sakit/Cinta',
      importance: 'Kritis',
      description: 'Mesin hanya menyusun ulang pola masa lalu (interpolasi piksel & fonem). Seni adiluhung lahir dari kerentanan jiwa fana yang mengenal kematian dan harapan.',
      actionableStep: 'Tingkatkan keterlibatan dengan realitas hidup nyata: sastra, interaksi budaya, sejarah peradaban, dan eksplorasi filosofis.'
    },
    {
      name: 'Kurasi Konseptual & Pembedaan Makna Kultural',
      importance: 'Sangat Tinggi',
      description: 'Kemampuan menentukan "mengapa karya ini bermakna sekarang" bagi komunitas manusia dalam era banjir konten sintetik murah.',
      actionableStep: 'Asah kemampuan kritik seni, penulisan narasi mendalam, dan orkestrasi pameran interaktif fisik.'
    }
  ],
  pertanian: [
    {
      name: 'Intuisi Holistik Ekologi Tradisional & Biodiversitas',
      importance: 'Kritis',
      description: 'Kearifan lokal memahami mikro-iklim, keselarasan musim, dan keseimbangan serangga purba yang tidak terpetakan dalam sensor digital.',
      actionableStep: 'Kombinasikan ilmu permakultur regeneratif dengan pemahaman ekologi lanskap holistik.'
    },
    {
      name: 'Manajemen Keberlanjutan Pangan & Keadilan Distribusi',
      importance: 'Sangat Tinggi',
      description: 'Menjamin akses pangan bergizi merata ke masyarakat miskin di tengah industrialisasi robotika pertanian komersial.',
      actionableStep: 'Pelajari kebijakan agraria, rantai pasok koperasi petani mandiri, dan teknologi pangan masa depan.'
    }
  ],
  pendidikan: [
    {
      name: 'Keteladanan Karakter & Pendampingan Jiwa (Mentorship)',
      importance: 'Kritis',
      description: 'Anak muda membutuhkan figur teladan nyata yang berintegritas untuk membentuk jati diri moral, bukan sekadar layar pintar penyedia fakta.',
      actionableStep: 'Pelajari psikologi perkembangan anak, pedagogi emosional, dan kepemimpinan sokratik.'
    },
    {
      name: 'Penyalaan Api Keingintahuan & Harapan Hidup',
      importance: 'Sangat Tinggi',
      description: 'Membangkitkan motivasi intrinsik siswa saat mereka merasa putus asa atau bingung menghadapi ketidakpastian dunia masa depan.',
      actionableStep: 'Kembangkan teknik fasilitasi dialog terbuka, pemikiran kritis reflektif, dan pembelajaran berbasis proyek kemanusiaan.'
    }
  ],
  fintech: [
    {
      name: 'Pencegahan Krisis Moral Hazard & Kepemimpinan Fidusia',
      importance: 'Kritis',
      description: 'Menjaga agar algoritma tidak memaksimalkan profit mikro dengan cara mengorbankan stabilitas ekonomi riil masyarakat miskin.',
      actionableStep: 'Pelajari hukum regulasi ekonomi makro, ekonomi perilaku (behavioral economics), dan etika tata kelola perbankan.'
    },
    {
      name: 'Perancangan Kebijakan Moneter Kemanusiaan',
      importance: 'Sangat Tinggi',
      description: 'Menyeimbangkan otomatisasi modal kuantum dengan penciptaan lapangan kerja dan jaminan hidup layak manusia.',
      actionableStep: 'Riset instrumen keuangan inklusif, Universal Basic Income (UBI) financing, dan green capital allocation.'
    }
  ],
  antariksa: [
    {
      name: 'Eksplorasi Filosofis & Keputusan Keberlanjutan Spesies',
      importance: 'Kritis',
      description: 'Menentukan apakah planet baru layak dikolonisasi atau harus dipertahankan kemurnian biologisnya bagi sains kosmik universal.',
      actionableStep: 'Fokus pada astrobiologi etis, kebijakan traktat luar angkasa PBB, dan diplomasi antariksa internasional.'
    },
    {
      name: 'Kepemimpinan Kru di Tengah Isolasi Psikologis Ekstrem',
      importance: 'Sangat Tinggi',
      description: 'Menjaga kewarasan mental dan kekompakan tim manusia saat terisolasi jutaan kilometer dari Bumi selama bertahun-tahun.',
      actionableStep: 'Pelajari dinamika tim lingkungan terisolasi (ICE environments) dan manajemen resiliensi psikologis kru.'
    }
  ]
};

// Calculation engine function
export function calculateAutomationImpact(
  sectorId: SectorId,
  chosenOptionIds: string[]
): {
  humanSynergyPercent: number;
  automationPercent: number;
  verdictTitle: string;
  verdictDescription: string;
  robotPartner: HypotheticalRobotPartner;
  humanOnlySkills: HumanOnlySkill[];
} {
  const sector = SECTORS_DATA.find((s) => s.id === sectorId) || SECTORS_DATA[0];
  let autoDeltaSum = 0;
  let synDeltaSum = 0;

  for (const q of WORKFLOW_QUESTIONS) {
    const selected = q.options.find((opt) => chosenOptionIds.includes(opt.id));
    if (selected) {
      autoDeltaSum += selected.automationDelta;
      synDeltaSum += selected.synergyDelta;
    }
  }

  // Calculate clamped values
  let calculatedAuto = Math.min(96, Math.max(15, sector.baseAutomationIndex + autoDeltaSum));
  let calculatedSynergy = Math.min(98, Math.max(25, sector.baseHumanSynergyIndex + synDeltaSum));

  // Verdict logic
  let verdictTitle = '';
  let verdictDescription = '';

  if (calculatedSynergy >= 75) {
    verdictTitle = 'Simbiosis Humanis Tingkat Tinggi (Centaur Model)';
    verdictDescription = `Di sektor ${sector.name}, nilai utama Anda tidak akan tergantikan oleh robotika 2040. Sebaliknya, robot bionik akan menjadi ekstensi kemampuan kognitif dan fisik Anda. Anda bertindak sebagai konduktor orkestra teknologi yang memegang kendali filosofis, keputusan kritis, dan sentuhan empati.`;
  } else if (calculatedAuto >= 80) {
    verdictTitle = 'Zona Rekonfigurasi Otomasi Penuh (High Automation Shift)';
    verdictDescription = `Tugas prosedural dan fisik di sektor ini akan didominasi hampir sepenuhnya oleh sistem otonom dan AI bionik. Kunci kelangsungan karir Anda pada 2040 adalah beralih dari pelaksana operasional teknis menuju arsitek sistem, auditor keselamatan, dan pembuat kebijakan regulasi etika.`;
  } else {
    verdictTitle = 'Kemitraan Hibrida Adaptif (Co-Pilot Ecosystem)';
    verdictDescription = `Pekerjaan Anda pada 2040 akan terbagi rata antara eksekusi otomatis oleh robot dan analisis bernilai tinggi oleh Anda. Efisiensi Anda akan melonjak hingga 400% jika Anda mahir berkolaborasi dengan robot rekan kerja Anda.`;
  }

  return {
    automationPercent: calculatedAuto,
    humanSynergyPercent: calculatedSynergy,
    verdictTitle,
    verdictDescription,
    robotPartner: ROBOT_PARTNERS_BY_SECTOR[sector.id] || ROBOT_PARTNERS_BY_SECTOR.software,
    humanOnlySkills: HUMAN_SKILLS_RECOMMENDATIONS[sector.id] || HUMAN_SKILLS_RECOMMENDATIONS.software
  };
}
