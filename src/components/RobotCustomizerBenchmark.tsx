import React, { useState } from 'react';
import { 
  Sliders, 
  Play, 
  RotateCcw, 
  Activity, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  Zap, 
  Compass, 
  CheckCircle2,
  Gauge
} from 'lucide-react';
import { soundEffects } from '../utils/audioSynthesizer';

type BenchmarkEnvironment = 'space_cryo' | 'medical_micro' | 'industrial_foundry';

interface EnvironmentSpec {
  id: BenchmarkEnvironment;
  name: string;
  condition: string;
  temperature: string;
  hazard: string;
  recommendedTorque: number;
  recommendedCompute: number;
}

const ENVIRONMENTS: EnvironmentSpec[] = [
  {
    id: 'space_cryo',
    name: 'Vakum Antariksa & Orbit Dingin',
    condition: 'Zero-G, Radiasi Kosmik & Suhu Beku',
    temperature: '-160 °C s/d +120 °C',
    hazard: 'Fluktuasi termal mendadak & mikrometeoroid',
    recommendedTorque: 950,
    recommendedCompute: 160
  },
  {
    id: 'medical_micro',
    name: 'Ruang Bedah Mikro Neuro-Vascular',
    condition: 'Aseptik Mutlak, Presisi 0.5 Mikron',
    temperature: '21.0 °C (Stabil)',
    hazard: 'Getaran sekecil apapun fatal bagi jaringan otak',
    recommendedTorque: 350,
    recommendedCompute: 220
  },
  {
    id: 'industrial_foundry',
    name: 'Pabrik Peleburan Baja Kinetik 2050',
    condition: 'Medan Magnetik Kuat & Debu Logam Cair',
    temperature: '850 °C Ambien Radiatif',
    hazard: 'Interferensi elektromagnetik & beban muatan 5 ton',
    recommendedTorque: 1400,
    recommendedCompute: 90
  }
];

export const RobotCustomizerBenchmark: React.FC = () => {
  // Configurable Parameters
  const [torque, setTorque] = useState<number>(850); // 100 - 1500 Nm
  const [neuralCompute, setNeuralCompute] = useState<number>(140); // 10 - 250 Petaflops
  const [batteryDensity, setBatteryDensity] = useState<number>(750); // 200 - 1200 Wh/kg
  const [sensorRes, setSensorRes] = useState<number>(16); // 4 - 32 K
  const [selectedEnv, setSelectedEnv] = useState<BenchmarkEnvironment>('space_cryo');

  // Simulation Running State
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simProgress, setSimProgress] = useState<number>(0);
  const [benchmarkResult, setBenchmarkResult] = useState<{
    score: number;
    grade: string;
    efficiency: number;
    thermalMargin: string;
    verdict: string;
    isPass: boolean;
  } | null>(null);

  const env = ENVIRONMENTS.find((e) => e.id === selectedEnv)!;

  const handleRunSimulation = () => {
    soundEffects.playGlowRipple();
    setIsSimulating(true);
    setSimProgress(0);
    setBenchmarkResult(null);

    let current = 0;
    const interval = setInterval(() => {
      current += 5;
      setSimProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setIsSimulating(false);
        soundEffects.playSuccessChime();

        // Calculate benchmark score
        const torqueDiff = Math.abs(torque - env.recommendedTorque);
        const computeDiff = Math.abs(neuralCompute - env.recommendedCompute);
        const penalty = (torqueDiff / 15) + (computeDiff / 4);

        const rawScore = Math.max(35, Math.min(99, Math.round(100 - penalty + (batteryDensity / 80))));
        const efficiency = Math.round((neuralCompute * 0.4) + (torque * 0.03) + (batteryDensity * 0.02));
        const isPass = rawScore >= 70;

        let grade = 'A+';
        let verdict = 'Arsitektur robot sangat optimal dan mampu menyelesaikan misi tanpa degradasi!';
        if (rawScore < 60) {
          grade = 'D (Gagal)';
          verdict = 'Konfigurasi tidak seimbang! Resiko overheat mekanis atau kekurangan daya komputasi.';
        } else if (rawScore < 75) {
          grade = 'C (Cukup)';
          verdict = 'Robot dapat beroperasi dengan efisiensi terbatas; butuh penyesuaian rasio torsi dan daya.';
        } else if (rawScore < 90) {
          grade = 'A (Unggul)';
          verdict = 'Performa memuaskan dengan margin keamanan termal yang sangat andal.';
        }

        setBenchmarkResult({
          score: rawScore,
          grade,
          efficiency,
          thermalMargin: rawScore >= 70 ? '+18.5 °C Safe' : '-4.2 °C Throttled',
          verdict,
          isPass
        });
      }
    }, 40);
  };

  const handleReset = () => {
    soundEffects.playCyberClick();
    setTorque(850);
    setNeuralCompute(140);
    setBatteryDensity(750);
    setSensorRes(16);
    setBenchmarkResult(null);
  };

  return (
    <section id="benchmark" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0b10] border-b border-cyan-500/20">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-tech mb-3">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            <span>FITUR 4 // SIMULATOR BENCHMARK & CUSTOMIZER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cyber font-bold text-white tracking-tight">
            Virtual Robot Lab & Stress-Test Kinetik
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Rakit parameter perangkat keras bionik Anda: sesuaikan torsi aktuator, frekuensi prosesor kuantum, 
            dan densitas sel energi, lalu uji ketahanan robot dalam 3 lingkungan ekstrem masa depan.
          </p>
        </div>

        {/* Dual Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 6 Cols: Hardware Configurator Sliders */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-6 sm:p-7 border border-cyan-500/30 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-tech uppercase text-cyan-400 font-bold flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                <span>Panel Kalibrasi Spesifikasi Robot</span>
              </span>
              <button
                onClick={handleReset}
                className="text-xs font-tech text-slate-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Default</span>
              </button>
            </div>

            {/* Slider 1: Actuator Torque */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-tech">
                <span className="text-slate-300">Torsi Aktuator Bionik:</span>
                <span className="text-cyan-400 font-bold">{torque} Nm</span>
              </div>
              <input
                type="range"
                min="100"
                max="1500"
                step="25"
                value={torque}
                onChange={(e) => setTorque(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] font-tech text-slate-500">
                <span>100 Nm (Mikro-Presisi)</span>
                <span>1500 Nm (Beban Berat Kinetik)</span>
              </div>
            </div>

            {/* Slider 2: Neural Compute Power */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-tech">
                <span className="text-slate-300">Daya Komputasi Neural Core:</span>
                <span className="text-violet-400 font-bold">{neuralCompute} Petaflops</span>
              </div>
              <input
                type="range"
                min="10"
                max="250"
                step="5"
                value={neuralCompute}
                onChange={(e) => setNeuralCompute(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-400"
              />
              <div className="flex justify-between text-[10px] font-tech text-slate-500">
                <span>10 Petaflops (Edge Ringan)</span>
                <span>250 Petaflops (Quantum Hyper-Core)</span>
              </div>
            </div>

            {/* Slider 3: Battery Energy Density */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-tech">
                <span className="text-slate-300">Densitas Energi Baterai Betavoltaic:</span>
                <span className="text-emerald-400 font-bold">{batteryDensity} Wh/kg</span>
              </div>
              <input
                type="range"
                min="200"
                max="1200"
                step="50"
                value={batteryDensity}
                onChange={(e) => setBatteryDensity(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] font-tech text-slate-500">
                <span>200 Wh/kg (Lithium-Solid)</span>
                <span>1200 Wh/kg (Nano-Diamond Nuclear)</span>
              </div>
            </div>

            {/* Slider 4: Multi-Spectral Sensor Resolution */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-tech">
                <span className="text-slate-300">Resolusi Sensor Matrix LiDAR:</span>
                <span className="text-sky-300 font-bold">{sensorRes}K Terahertz</span>
              </div>
              <input
                type="range"
                min="4"
                max="32"
                step="4"
                value={sensorRes}
                onChange={(e) => setSensorRes(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
              <div className="flex justify-between text-[10px] font-tech text-slate-500">
                <span>4K Standar</span>
                <span>32K Sub-Partikel Ultra-Clear</span>
              </div>
            </div>

            {/* Target Testing Environment Selector */}
            <div className="pt-2">
              <span className="text-xs font-tech text-slate-400 uppercase tracking-wider block mb-2">
                Pilih Arena Uji Lingkungan:
              </span>
              <div className="grid grid-cols-1 gap-2">
                {ENVIRONMENTS.map((target) => {
                  const isChosen = selectedEnv === target.id;
                  return (
                    <button
                      key={target.id}
                      onClick={() => {
                        soundEffects.playCyberClick();
                        setSelectedEnv(target.id);
                        setBenchmarkResult(null);
                      }}
                      className={`text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                        isChosen
                          ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-[0_0_12px_rgba(0,242,254,0.2)]'
                          : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-cyber font-semibold text-white">{target.name}</div>
                        <div className="text-[10px] font-tech text-slate-400">{target.condition}</div>
                      </div>
                      <span className="text-[10px] font-tech px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300">
                        {target.temperature}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right 6 Cols: Stress-Test Execution & Live Benchmark Results */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Arena Environment Telemetry Card */}
            <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-tech text-cyan-400 uppercase tracking-wider">
                  Arena Uji: {env.name}
                </span>
                <span className="text-[11px] font-tech text-slate-400">
                  Target Simulasi Fisika Real-Time
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-tech">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">Rekomendasi Torsi:</span>
                  <span className="text-white font-semibold">~{env.recommendedTorque} Nm</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">Rekomendasi Compute:</span>
                  <span className="text-violet-300 font-semibold">~{env.recommendedCompute} Petaflops</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/20 text-xs text-red-300 font-tech">
                <span className="font-semibold text-red-200">Faktor Risiko: </span>
                {env.hazard}
              </div>

              {/* Action Trigger Button */}
              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className={`w-full py-3.5 rounded-xl font-cyber font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isSimulating
                    ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 text-slate-950 shadow-[0_0_25px_rgba(0,242,254,0.45)] hover:shadow-[0_0_35px_rgba(0,242,254,0.65)] cursor-pointer'
                }`}
              >
                {isSimulating ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" />
                    <span>Menjalankan Uji Beban Kinetik ({simProgress}%)...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Jalankan Simulasi Stress-Test</span>
                  </>
                )}
              </button>

              {/* Progress Bar when running */}
              {isSimulating && (
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-75"
                    style={{ width: `${simProgress}%` }}
                  />
                </div>
              )}
            </div>

            {/* Benchmark Output Card */}
            {benchmarkResult ? (
              <div className={`p-6 rounded-2xl border transition-all ${
                benchmarkResult.isPass
                  ? 'bg-gradient-to-br from-cyan-950/30 to-slate-900/80 border-cyan-500/40 shadow-2xl'
                  : 'bg-gradient-to-br from-red-950/30 to-slate-900/80 border-red-500/40'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-tech uppercase tracking-wider text-slate-400">
                      Hasil Evaluasi Kinetik
                    </span>
                    <h4 className="text-xl font-cyber font-bold text-white">
                      Skor Uji: {benchmarkResult.score} / 100
                    </h4>
                  </div>
                  <div className={`text-2xl font-cyber font-black px-3.5 py-1 rounded-xl border ${
                    benchmarkResult.isPass
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                      : 'bg-red-500/20 text-red-300 border-red-400'
                  }`}>
                    {benchmarkResult.grade}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 font-tech text-xs">
                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                    <span className="text-slate-400 block mb-1">Index Efisiensi Daya:</span>
                    <span className="text-cyan-300 font-bold text-base">{benchmarkResult.efficiency} Pts</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                    <span className="text-slate-400 block mb-1">Thermal Safety Margin:</span>
                    <span className={`font-bold text-base ${benchmarkResult.isPass ? 'text-emerald-400' : 'text-red-400'}`}>
                      {benchmarkResult.thermalMargin}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  {benchmarkResult.verdict}
                </p>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-950/40 border border-slate-800 text-center text-slate-500 text-xs font-tech space-y-2">
                <Sparkles className="w-8 h-8 text-cyan-500/40 mx-auto" />
                <p>Klik tombol "Jalankan Simulasi Stress-Test" untuk memproses data performa.</p>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
