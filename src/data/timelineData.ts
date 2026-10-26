import { TimelineMilestone } from '../types';

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: 1954,
    era: 'Pioneering',
    category: 'Industrial',
    title: 'Kelahiran Robot Industri Pertama',
    modelName: 'Unimate 1954',
    creatorOrAgency: 'George Devol & Joseph Engelberger (Unimation / GM)',
    summary: 'Robot terprogram digital pertama di dunia yang dipatenkan dan mulai bekerja di jalur perakitan die casting General Motors tahun 1961.',
    technicalMilestone: 'Memori drum magnetik dengan aktuasi hidrolik terkontrol umpan balik analog.',
    societalImpact: 'Memulai era otomatisasi pabrik modern dan mengangkat beban kerja berbahaya dari tangan manusia.',
    specs: {
      degreeOfFreedom: '5-Axis Arm',
      computePower: 'Analog Drum Stepper Logic',
      autonomyLevel: 'Level 1',
      sensors: 'Limit Switches & Hydraulic Potentiometers'
    }
  },
  {
    year: 1969,
    era: 'Pioneering',
    category: 'Humanoid',
    title: 'Lengan Robotik Komputasi Pertama',
    modelName: 'Stanford Arm & Shakey',
    creatorOrAgency: 'Victor Scheinman (Stanford AI Lab) / SRI International',
    summary: 'Lengan robot 6-derajat kebebasan pertama yang dikendalikan komputer digital secara elektrik, bersama Shakey si robot bergerak dengan computer vision pertama.',
    technicalMilestone: 'Kinematika invers analitis terkomputasi komputer mini PDP-6 dan pemrosesan citra TV monokrom.',
    societalImpact: 'Membuktikan bahwa robot dapat melihat lingkungan dan merencanakan rute tindakan mandiri.',
    specs: {
      degreeOfFreedom: '6-Axis All-Electric',
      computePower: 'PDP-10 Mainframe Link',
      autonomyLevel: 'Level 2',
      sensors: 'Vidicon Camera, Bump Whiskers, Optical Rangefinder'
    }
  },
  {
    year: 1997,
    era: 'Industrial Automation',
    category: 'Swarm & Space',
    title: 'Eksplorasi Robotik Planet Lain',
    modelName: 'Sojourner Rover (Mars Pathfinder)',
    creatorOrAgency: 'NASA Jet Propulsion Laboratory (JPL)',
    summary: 'Robot beroda pertama yang beroperasi di planet lain (Mars), menjelajahi permukaan berdebu merah dan menganalisis batuan vulkanik.',
    technicalMilestone: 'Sistem suspensi Rocker-Bogie yang revolusioner dengan sistem navigasi laser bahaya semi-otonom.',
    societalImpact: 'Membuka paradigma baru eksplorasi antariksa tanpa risiko nyawa antariksawan.',
    specs: {
      degreeOfFreedom: '6 Driven Wheels + 4 Steering Motors',
      computePower: '0.1 MIPS (Radiation-hardened 80C85)',
      autonomyLevel: 'Level 2',
      sensors: 'Stereo Cameras, 5 Laser Hazard Detectors, APXS Spectrometer'
    }
  },
  {
    year: 2000,
    era: 'Industrial Automation',
    category: 'Humanoid',
    title: 'Revolusi Keseimbangan Dinamis Bipedal',
    modelName: 'Honda ASIMO',
    creatorOrAgency: 'Honda Motor Co., Ltd.',
    summary: 'Robot humanoid paling ikonik abad ke-21 yang mampu berjalan stabil di permukaan miring, menaiki tangga, dan berinteraksi dengan ramah.',
    technicalMilestone: 'Teknologi kontrol berjalan i-WALK (Zero Moment Point - ZMP Control presisi tinggi).',
    societalImpact: 'Mendefinisikan impian masa depan bahwa robot humanoid dapat hidup berdampingan di lingkungan manusia.',
    specs: {
      degreeOfFreedom: '26 to 34-Axis Joint Motors',
      computePower: 'Custom Multiprocessor DSP Subsystem',
      autonomyLevel: 'Level 2',
      sensors: 'Dual Vision Cameras, Gyroscopes, 6-Axis Force Ground Foot Sensors'
    }
  },
  {
    year: 2000,
    era: 'Industrial Automation',
    category: 'Medical',
    title: 'Kelahiran Bedah Laparoskopi Robotik',
    modelName: 'da Vinci Surgical System',
    creatorOrAgency: 'Intuitive Surgical',
    summary: 'Sistem bedah tele-robotik pertama yang disetujui FDA untuk operasi bedah umum invasif minimal dengan tremor filter.',
    technicalMilestone: 'Instrumen EndoWrist dengan 7 derajat kebebasan dan visualisasi stereoskopik 3D berdefinisi tinggi.',
    societalImpact: 'Memangkas waktu pemulihan operasi besar pasien dari hitungan minggu menjadi beberapa hari.',
    specs: {
      degreeOfFreedom: '4 Master-Slave Arms with 7-DoF Wrists',
      computePower: 'Dedicated High-Speed Deterministic Controller',
      autonomyLevel: 'Level 1',
      sensors: 'Stereoscopic 3D Dual-Channel Endoscope & Tactile Sensor Feedback'
    }
  },
  {
    year: 2015,
    era: 'Cognitive & Mobile',
    category: 'Humanoid',
    title: 'Agilitas Dinamis & Akrobatik Ekstrem',
    modelName: 'Boston Dynamics Atlas & Spot',
    creatorOrAgency: 'Boston Dynamics (Marc Raibert)',
    summary: 'Terobosan robotik bipedal hidrolik & elektrik berkemampuan parkour, backflip, dan robot anjing quadruped industri Spot.',
    technicalMilestone: 'Model-Predictive Control (MPC) dengan aktuator berdensitas daya tinggi dan persepsi 3D point cloud real-time.',
    societalImpact: 'Menghilangkan mitos bahwa robot kaku dan rapuh; robot terbukti mampu menyeimbangkan diri dari tendangan keras.',
    specs: {
      degreeOfFreedom: '28 Hydraulic / Electric Actuators',
      computePower: 'Onboard Dual Real-time Quad-Core x86',
      autonomyLevel: 'Level 3',
      sensors: 'Multi-Sensor Fusion (Stereo Depth, Time-of-Flight LiDAR, IMUs)'
    }
  },
  {
    year: 2024,
    era: 'Embodied AI',
    category: 'Humanoid',
    title: 'Era Embodied AI & Vision-Language-Action',
    modelName: 'Figure 02 & Tesla Optimus Gen-2',
    creatorOrAgency: 'Figure AI + OpenAI / Tesla Motors',
    summary: 'Integrasi Large Multimodal Models ke dalam fisik humanoid; robot dapat diajak bercakap secara alami sambil menyortir komponen pabrik secara otonom.',
    technicalMilestone: 'Arsitektur end-to-end Neural Network (VLA Models) yang memetakan piksel kamera langsung ke torsi motor sendi.',
    societalImpact: 'Transisi robot dari mesin terprogram kaku menjadi asisten serba-guna yang belajar dari video demonstrasi manusia.',
    specs: {
      degreeOfFreedom: '40+ DoF (11-DoF Dexterous Hands)',
      computePower: '3.5 Petaflops AI SoC Onboard',
      autonomyLevel: 'Level 3',
      sensors: '6 RGB Wide-Angle Cameras, Microphone Array, Tactile Sensor Matrix'
    }
  },
  {
    year: 2032,
    era: 'Embodied AI',
    category: 'Bio-Robotics',
    title: 'Prostetik Bionik Neuro-Sintetik Langsung',
    modelName: 'NeuroLink Bionic Arm Gen-4',
    creatorOrAgency: 'DARPA BTO / Global Bionics Consortium',
    summary: 'Anggota tubuh bionik yang dikendalikan langsung oleh implan saraf otak tanpa delay (0.005 detik), dengan umpan balik rasa raba nyata.',
    technicalMilestone: 'Transduser neuromorfik dua arah dengan lapisan otot sintetis elektro-aktif polimer (EAP).',
    societalImpact: 'Mengembalikan fungsi penuh bagi penyandang amputasi melampaui kemampuan tangan biologis asli.',
    specs: {
      degreeOfFreedom: '24 Independent Bionic Tendons',
      computePower: 'Sub-Watt Neuromorphic Spike Processor',
      autonomyLevel: 'Level 4',
      sensors: 'Synaptic Bidirectional Electrodes, Micro-Haptic Dermal Net'
    }
  },
  {
    year: 2040,
    era: 'Bionic Singularity',
    category: 'Humanoid',
    title: 'Humanoid Kognitif Kuantum Universal (Tipping Point)',
    modelName: 'Atlas 2040 Omnisense',
    creatorOrAgency: 'Global Robotics Alliance',
    summary: 'Kolega kerja otonom yang bekerja bersama manusia di rumah sakit, pabrik tanpa lampu, dan laboratorium riset obat dengan kecerdasan setara PhD teknis.',
    technicalMilestone: 'Quantum neuromorphic processor dengan aktuator magnetostriktif tanpa gear dan baterai sel fusi mikro.',
    societalImpact: 'Hampir 50% pekerjaan manual terotomasi; manusia bertransisi menjadi arsitek konseptual dan konduktor etika.',
    specs: {
      degreeOfFreedom: '54 Bio-Kinematic Axis',
      computePower: '100 Petaflops Quantum-Classical Edge Unit',
      autonomyLevel: 'Level 4',
      sensors: 'Full-Spectrum Terahertz & Holographic LiDAR Eye Array'
    }
  },
  {
    year: 2050,
    era: 'Bionic Singularity',
    category: 'Bio-Robotics',
    title: 'Android Bio-Sintetik & Kulit Keramik Akrilik Transparan',
    modelName: 'Synthetica Bio-Android 2050',
    creatorOrAgency: 'CyberCore United Technologies',
    summary: 'Bentuk robotika paling maju: perpaduan keramik putih ramping, pelindung akrilik transparan, serat optik cyan bercahaya, dan jaringan saraf cair mandiri.',
    technicalMilestone: 'Armor keramik nanokristalin tahan benturan dengan pembuluh serat optik transmisi data fotonik 1000 Tbps.',
    societalImpact: 'Batas antara makhluk biologis dan sintetik mulai menyatu; kolaborasi manusia-robot menjadi fondasi peradaban tata surya.',
    specs: {
      degreeOfFreedom: 'Continuous Synthetic Musculature (No Discrete Gears)',
      computePower: 'Photonic Optical Neural Core (Sub-picosecond inference)',
      autonomyLevel: 'Level 5',
      sensors: 'Quantum Entangled Optical Sensor Dome, Ambient Thermal Grid'
    }
  },
  {
    year: 2060,
    era: 'Bionic Singularity',
    category: 'Swarm & Space',
    title: 'Kawanan Otonom Terraformasi Planet Ekstrasurya',
    modelName: 'Prometheus Swarm Hive 2060',
    creatorOrAgency: 'United Nations Outer Space Command',
    summary: 'Jutaan robot nano dan meso yang berkoordinasi secara terdesentralisasi membangun kubah biosfer mandiri di Bulan, Mars, dan asteroid Ceres.',
    technicalMilestone: 'Swarm Intelligence pasif berbasis kuantum resonan dengan replikasi material mandiri (self-replication safety hardlock).',
    societalImpact: 'Menjamin kelangsungan hidup multi-planet peradaban manusia melalui otomatisasi kosmik tak terbatas.',
    specs: {
      degreeOfFreedom: 'Collective Swarm Node Variable Geometry',
      computePower: 'Distributed Cosmic Mesh Supercluster',
      autonomyLevel: 'Level 5',
      sensors: 'Gravitational Wave Detector, Cosmic Radiation Spectrometer'
    }
  }
];
