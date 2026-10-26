import React, { useState } from 'react';
import { 
  BookOpen, 
  X, 
  Copy, 
  Check, 
  Layers, 
  MapPin, 
  Sparkles, 
  BarChart, 
  Code2, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { soundEffects } from '../utils/audioSynthesizer';

interface ThesisArchitectBlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThesisArchitectBlueprintModal: React.FC<ThesisArchitectBlueprintModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'sitemap' | 'features' | 'metrics' | 'techstack'>('sitemap');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, sectionKey: string) => {
    soundEffects.playCyberClick();
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      
      <div className="relative w-full max-w-5xl rounded-2xl bg-[#0d1017] border border-cyan-500/40 shadow-[0_0_60px_rgba(0,242,254,0.15)] overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-cyber font-bold text-white">
                Blueprint Konsep Skripsi & Arsitektur Solusi IT
              </h2>
              <div className="text-xs font-tech text-cyan-300">
                Senior UI/UX Strategist & IT Solutions Architect Dossier
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playCyberClick();
              onClose();
            }}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-900/50 px-4 gap-2 overflow-x-auto text-xs font-tech">
          <button
            onClick={() => {
              soundEffects.playCyberClick();
              setActiveTab('sitemap');
            }}
            className={`py-3 px-3 border-b-2 font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'sitemap'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>1. Sitemap & User Journey</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playCyberClick();
              setActiveTab('features');
            }}
            className={`py-3 px-3 border-b-2 font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'features'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>2. 4 Fitur Interaktif Unggulan</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playCyberClick();
              setActiveTab('metrics');
            }}
            className={`py-3 px-3 border-b-2 font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'metrics'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart className="w-3.5 h-3.5" />
            <span>3. Metrik Sistem Informasi</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playCyberClick();
              setActiveTab('techstack');
            }}
            className={`py-3 px-3 border-b-2 font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'techstack'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>4. Rekomendasi Tech Stack</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6 text-slate-300 text-sm leading-relaxed font-sans">
          
          {/* TAB 1: SITEMAP & USER JOURNEY */}
          {activeTab === 'sitemap' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-cyber font-bold text-white">
                  1. Sitemap & User Journey Framework
                </h3>
                <button
                  onClick={() => handleCopy(`SITEMAP & USER JOURNEY:
1. Entry / Landing: Hero Section Futuristik (Orientasi, Brand Hook, Preview 3D L5 Humanoid).
2. Cognitive Exploration: Kronologi Interaktif (1950-2060, Analisis 11 Era Terobosan).
3. Tangible Simulation: CyberLab 3D Model Explorer (Inspeksi Anatomi, X-Ray Wireframe, Material Swap).
4. Edu-Tech Impact Simulator: Kalkulator Dampak Robotika 2040 (3 Pertanyaan Alur Kerja, Human Synergy %, Rekan Hipotetis, Human-Only Skills).
5. Kinetic Benchmark: Virtual Robot Lab (Stress-test lingkungan ekstrem).
6. Research Telemetry & Usability: Dwell Time Tracker & Kuesioner SUS Brooke (1996) + Ekspor CSV.`, 'sitemap')}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-tech text-cyan-300 hover:border-cyan-400 flex items-center gap-1.5"
                >
                  {copiedSection === 'sitemap' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'sitemap' ? 'Tersalin' : 'Salin untuk Skripsi'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-tech text-xs">
                <div className="text-cyan-400 font-bold uppercase">Struktur Hierarki Halaman (Sitemap):</div>
                <pre className="text-slate-300 leading-normal">
{`ROBO-EVO 2050 (Root)
│
├── 01. HERO EXPEDITION (First Impression & 3D Interactive Viewport)
│   ├── Glitch Title & Proyeksi 2050
│   ├── Floating Telemetry Metrics (Neural Sync, Autonomy L5)
│   └── 3D PBR Humanoid Canvas + 8K Cinematic Toggle
│
├── 02. TIMELINE EVOLUSI (1950 - 2060)
│   ├── Era Pioneering (Unimate, Shakey, Apollo)
│   ├── Era Otomasi Dinamis (ASIMO, da Vinci, Boston Dynamics)
│   └── Era Embodied AI & Singularity (Figure, Tesla, Synthetica 2050)
│
├── 03. CYBERLAB 3D EXPLORER (Anatomi & Material)
│   ├── Multi-finish Swatches (Ceramic, Acrylic Fotonik, Stealth Carbon)
│   ├── Sub-system Inspector (Quantum Core, Musculature, LiDAR, Fusion)
│   └── Disassembly Slider (Pecah Komponen Exploded View)
│
├── 04. KALKULATOR DAMPAK 2040 (Edu-Tech Simulator)
│   ├── Sektor Profesi (Medis, Logistik, Software, Seni, Pertanian, dll)
│   ├── Evaluasi Alur Kerja (3 Pertanyaan Pilihan Ganda)
│   ├── Output Kolaborasi (Human Synergy % vs Automation %)
│   └── Rekan Robot Hipotetis & Human-Only Skills
│
├── 05. VIRTUAL ROBOT BENCHMARK LAB (Stress-Test Simulator)
│   ├── Hardware Customizer (Torque, Compute, Battery, Sensor)
│   └── 3 Arena Ekstrem (Antariksa, Bedah Mikro, Pabrik Peleburan)
│
└── 06. TELEMETRI SISTEM INFORMASI & EVALUASI
    ├── Dwell Time Tracker per Modul
    ├── Kuesioner System Usability Scale (SUS 10 Pertanyaan)
    └── Ekspor Dataset CSV / JSON untuk Bab 4 Skripsi`}
                </pre>
              </div>

              <div className="space-y-3">
                <h4 className="font-cyber font-bold text-white text-base">Alur Pengguna (User Journey Flow):</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-tech text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-cyan-400 font-bold block mb-1">1. Tahap Awareness</span>
                    <p className="text-slate-400">Pengguna terkesima oleh tampilan 3D robot 2050 dan memahami tujuan penelitian melalui narrative hero.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-violet-400 font-bold block mb-1">2. Tahap Engagement</span>
                    <p className="text-slate-400">Pengguna mengeksplorasi timeline, mencoba kalkulator dampak profesi mereka, dan merakit spesifikasi robot.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-emerald-400 font-bold block mb-1">3. Tahap Evaluation</span>
                    <p className="text-slate-400">Pengguna mengisi kuesioner SUS untuk memberikan umpan balik empiris yang terekam dalam dataset skripsi.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 4 FITUR INTERAKTIF UNGGULAN */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-cyber font-bold text-white">
                  2. Empat Fitur Interaktif Unggulan (Gamifikasi & Simulasi)
                </h3>
                <button
                  onClick={() => handleCopy(`4 FITUR INTERAKTIF UNGGULAN:
1. Interactive Future Timeline (1950 - 2060): Visual milestone navigator dengan filter era, DoF specs, dan dampak sosio-teknis.
2. 3D Model Explorer & Disassembly (CyberLab 2050): WebGL model humanoid dengan swap material fisik (keramik vs akrilik transparan), x-ray wireframe, dan exploded view.
3. Kalkulator Dampak Robotika 2040: Mini-simulator prediksi tingkat kolaborasi manusia vs robot, profil robot rekan kerja hipotetis, dan skill human-only.
4. Virtual Robot Lab & Benchmark Simulator: Pengujian beban kinetik robotik dengan parameter kustom di 3 lingkungan ekstrem.`, 'features')}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-tech text-cyan-300 hover:border-cyan-400 flex items-center gap-1.5"
                >
                  {copiedSection === 'features' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'features' ? 'Tersalin' : 'Salin untuk Skripsi'}</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20">
                  <div className="font-cyber font-bold text-cyan-300 text-sm mb-1">
                    Fitur 1: Interactive Future Timeline (1950 - 2060)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    Mengubah pembacaan kronologi sejarah yang membosankan menjadi ekspedisi interaktif. 
                    Dilengkapi filter era, metrik DoF (Degree of Freedom), kapasitas komputasi, dan tingkat otonomi (Level 1 s/d Level 5).
                  </p>
                  <span className="text-[11px] font-tech text-slate-400">Tujuan Evaluasi: Mengukur peningkatan retensi pengetahuan sejarah robotika pengguna.</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20">
                  <div className="font-cyber font-bold text-sky-300 text-sm mb-1">
                    Fitur 2: 3D Model Explorer & Disassembly (CyberLab 2050)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    Visualisasi 3D WebGL berbasis Three.js dengan pencahayaan RoomEnvironment procedural. 
                    User dapat memutar 360°, beralih antara keramik nanokristalin dan akrilik transparan ber-IOR 1.49, melihat kabel optik bercahaya sian, serta memecah komponen (exploded view).
                  </p>
                  <span className="text-[11px] font-tech text-slate-400">Tujuan Evaluasi: Menilai kegunaan inspeksi visual 3D vs gambar statis 2D dalam pembelajaran teknik.</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20">
                  <div className="font-cyber font-bold text-violet-300 text-sm mb-1">
                    Fitur 3: Kalkulator Dampak Robotika 2040 (Mini-Simulator Edu-Tech)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    Menggabungkan masukan sektor profesi (8 bidang) dengan 3 pertanyaan alur kerja analitik untuk menghitung rasio kolaborasi manusia vs mesin pada tahun 2040, 
                    menghadirkan robot rekan kerja fiktif (spesifikasi hardware & tugas), serta merekomendasikan keahlian unik manusia yang perlu dipelajari.
                  </p>
                  <span className="text-[11px] font-tech text-slate-400">Tujuan Evaluasi: Memberikan panduan orientasi karir nyata bagi mahasiswa di era otomatisasi cerdas.</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20">
                  <div className="font-cyber font-bold text-emerald-300 text-sm mb-1">
                    Fitur 4: Virtual Robot Lab & Benchmark Simulator
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    Simulator kustomisasi perangkat keras dengan 4 slider fisika (Torsi, Compute, Baterai, Sensor) 
                    dan stress test di 3 arena ekstrem. Menghasilkan skor benchmark dan margin keamanan termal.
                  </p>
                  <span className="text-[11px] font-tech text-slate-400">Tujuan Evaluasi: Menguji pemahaman pengguna mengenai trade-off desain teknik robotika.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: METRIK SISTEM INFORMASI */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-cyber font-bold text-white">
                  3. Metrik Sistem Informasi & Instrumen Pengujian Skripsi
                </h3>
                <button
                  onClick={() => handleCopy(`METRIK SISTEM INFORMASI UNTUK EVALUASI:
1. Usability Metrik: System Usability Scale (SUS) John Brooke (1996) 10 Item standar (Target: Skor > 68, Grade B/A).
2. Behavioral Metrik: Dwell Time per Modul (Hero, Kalkulator, CyberLab 3D, Timeline, Benchmark).
3. Engagement Density: Total interaksi klik, swap material, rotasi 3D canvas, dan run benchmark.
4. Cognitive Awareness: Distribusi pilihan kuis kalkulator 2040 dan pengunduhan format JSON/CSV.`, 'metrics')}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-tech text-cyan-300 hover:border-cyan-400 flex items-center gap-1.5"
                >
                  {copiedSection === 'metrics' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'metrics' ? 'Tersalin' : 'Salin untuk Skripsi'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-tech text-xs">
                <div className="text-emerald-400 font-bold uppercase">Formula Baku SUS (John Brooke, 1996):</div>
                <p className="text-slate-300 leading-relaxed">
                  Instrumen terdiri dari 10 pertanyaan skala Likert 1-5. 
                  Untuk item bernomor ganjil (1, 3, 5, 7, 9), skor kontribusi dihitung: (Skor Pilihan - 1). 
                  Untuk item bernomor genap (2, 4, 6, 8, 10), skor kontribusi dihitung: (5 - Skor Pilihan). 
                  Seluruh skor kontribusi dijumlahkan dan dikalikan 2.5 untuk menghasilkan skala nilai 0 hingga 100.
                </p>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300">
                  Rumus: SUS_Score = 2.5 * [ (Q1-1) + (5-Q2) + (Q3-1) + (5-Q4) + (Q5-1) + (5-Q6) + (Q7-1) + (5-Q8) + (Q9-1) + (5-Q10) ]
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs font-tech">
                  <thead className="bg-slate-900 text-cyan-300 uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-3">Rentang Skor SUS</th>
                      <th className="p-3">Grade Rank</th>
                      <th className="p-3">Adjective Rating</th>
                      <th className="p-3">Tingkat Keberterimaan (Acceptability)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-950/60 text-slate-300">
                    <tr>
                      <td className="p-3 font-semibold text-emerald-400">85.0 - 100</td>
                      <td className="p-3">A+</td>
                      <td className="p-3">Best Imaginable</td>
                      <td className="p-3 text-emerald-400 font-bold">Acceptable</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-cyan-400">80.3 - 84.9</td>
                      <td className="p-3">A</td>
                      <td className="p-3">Excellent</td>
                      <td className="p-3 text-emerald-400 font-bold">Acceptable</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-blue-400">68.0 - 80.2</td>
                      <td className="p-3">B</td>
                      <td className="p-3">Good (Standar Industri Rata-rata: 68)</td>
                      <td className="p-3 text-emerald-400 font-bold">Acceptable</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-amber-400">51.0 - 67.9</td>
                      <td className="p-3">C / D</td>
                      <td className="p-3">OK / Fair</td>
                      <td className="p-3 text-amber-400">Marginal</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-red-400">&lt; 51.0</td>
                      <td className="p-3">F</td>
                      <td className="p-3">Poor / Worst Imaginable</td>
                      <td className="p-3 text-red-400">Not Acceptable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: REKOMENDASI TECH STACK */}
          {activeTab === 'techstack' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-cyber font-bold text-white">
                  4. Rekomendasi Tech Stack & Arsitektur Solusi IT
                </h3>
                <button
                  onClick={() => handleCopy(`REKOMENDASI TECH STACK TUGAS AKHIR:
- Frontend Core: React 19 + TypeScript + Vite / Next.js (App Router)
- 3D Web Graphics: Three.js r160+ dengan Software WebGL Guard & RoomEnvironment PBR
- Styling & Sci-Fi Aesthetic: Tailwind CSS v4 + Glassmorphism Backdrop Blurs
- Audio Synthesis: Web Audio API Procedural Oscillator (Zero-404, No Audio Files)
- Telemetry & Analytics: LocalStorage Event Logging + CSV/JSON Client-Side Exporter`, 'techstack')}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-tech text-cyan-300 hover:border-cyan-400 flex items-center gap-1.5"
                >
                  {copiedSection === 'techstack' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'techstack' ? 'Tersalin' : 'Salin untuk Skripsi'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-cyber font-bold text-cyan-400">1. Frontend Core: React & TypeScript</div>
                  <p className="text-xs text-slate-300 leading-relaxed font-tech">
                    Menyediakan arsitektur komponen deklaratif yang modular dan type-safe. 
                    Mencegah bug runtime saat menangani state kalkulator dan telemetry log yang kompleks.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-cyber font-bold text-violet-400">2. 3D Web Engine: Three.js</div>
                  <p className="text-xs text-slate-300 leading-relaxed font-tech">
                    Pilihan paling ringan dan kompatibel secara universal di peramban seluler maupun desktop. 
                    Dilengkapi fallback Software WebGL Guard dan procedural geometry generation tanpa ketergantungan file 3D biner eksternal.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-cyber font-bold text-emerald-400">3. Sound Design: Web Audio API</div>
                  <p className="text-xs text-slate-300 leading-relaxed font-tech">
                    Sintesis gelombang audio prosedural (Sine, Sawtooth, Triangle) murni dari kode JavaScript. 
                    Ukuran aset 0 KB (zero network bandwidth) dan tidak menimbulkan error 404 pada server hosting.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-cyber font-bold text-sky-400">4. Desain & Animasi: Tailwind CSS v4</div>
                  <p className="text-xs text-slate-300 leading-relaxed font-tech">
                    Eksekusi tema Sci-Fi Cyber-Clean dengan palet Deep Dark (#0a0b10), aksen Neon Cyan (#00f2fe), 
                    dan Glassmorphism tanpa membebani performa rendering DOM.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs font-tech text-slate-400">
          <span>Tugas Akhir Sistem Informasi // Siap dikutip untuk Bab 1, 3, dan 4</span>
          <button
            onClick={() => {
              soundEffects.playCyberClick();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 font-semibold"
          >
            Tutup Blueprint
          </button>
        </div>

      </div>

    </div>
  );
};
