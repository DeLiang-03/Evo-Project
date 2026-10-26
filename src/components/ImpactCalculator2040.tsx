import React, { useState } from 'react';
import { 
  SECTORS_DATA, 
  WORKFLOW_QUESTIONS, 
  calculateAutomationImpact, 
  ROBOT_PARTNERS_BY_SECTOR 
} from '../data/calculatorData';
import { SectorId, SectorOption, ImpactCalculationResult } from '../types';
import { 
  Zap, 
  RotateCcw, 
  FileJson, 
  Table, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  ShieldAlert, 
  HeartHandshake, 
  Activity, 
  Package, 
  Terminal, 
  Palette, 
  Sprout, 
  GraduationCap, 
  TrendingUp, 
  Compass, 
  Download,
  Info
} from 'lucide-react';
import { soundEffects } from '../utils/audioSynthesizer';

const SECTOR_ICON_MAP: Record<string, React.ReactNode> = {
  Activity: <Activity className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />,
  Terminal: <Terminal className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Sprout: <Sprout className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Compass: <Compass className="w-5 h-5" />
};

interface ImpactCalculator2040Props {
  onLogTelemetry?: (action: string, metadata: any) => void;
}

export const ImpactCalculator2040: React.FC<ImpactCalculator2040Props> = ({ onLogTelemetry }) => {
  const [selectedSector, setSelectedSector] = useState<SectorId>('medis');
  const [currentStep, setCurrentStep] = useState<'sector' | 'quiz' | 'result'>('sector');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<ImpactCalculationResult | null>(null);
  const [viewFormat, setViewFormat] = useState<'card' | 'json' | 'table'>('card');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Sector Selection Handler
  const handleSelectSector = (id: SectorId) => {
    soundEffects.playCyberClick();
    setSelectedSector(id);
    onLogTelemetry?.('calculator_sector_selected', { sector: id });
  };

  // Start Questionnaire
  const handleStartQuiz = () => {
    soundEffects.playGlowRipple();
    setCurrentStep('quiz');
    onLogTelemetry?.('calculator_quiz_started', { sector: selectedSector });
  };

  // Answer selection
  const handleSelectOption = (questionId: number, optionId: string) => {
    soundEffects.playCyberClick();
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  // Compute final impact
  const handleCalculate = () => {
    soundEffects.playSuccessChime();
    const chosenOptionIds = Object.values(quizAnswers);
    const calcOutput = calculateAutomationImpact(selectedSector, chosenOptionIds);
    const sector = SECTORS_DATA.find((s) => s.id === selectedSector)!;

    const fullResult: ImpactCalculationResult = {
      sector,
      humanSynergyPercent: calcOutput.humanSynergyPercent,
      automationPercent: calcOutput.automationPercent,
      verdictTitle: calcOutput.verdictTitle,
      verdictDescription: calcOutput.verdictDescription,
      robotPartner: calcOutput.robotPartner,
      humanOnlySkills: calcOutput.humanOnlySkills,
      selectedAnswers: WORKFLOW_QUESTIONS.map((q) => {
        const chosen = q.options.find((opt) => opt.id === quizAnswers[q.id]);
        return {
          questionId: q.id,
          questionText: q.title,
          chosenText: chosen ? chosen.text : 'Default',
          trait: chosen ? chosen.trait : ''
        };
      }),
      timestamp: new Date().toISOString()
    };

    setResult(fullResult);
    setCurrentStep('result');
    onLogTelemetry?.('calculator_completed', {
      sector: selectedSector,
      synergy: fullResult.humanSynergyPercent,
      automation: fullResult.automationPercent
    });
  };

  // Reset Simulator
  const handleReset = () => {
    soundEffects.playCyberClick();
    setQuizAnswers({});
    setResult(null);
    setCurrentStep('sector');
  };

  // Export JSON file
  const handleDownloadJSON = () => {
    if (!result) return;
    soundEffects.playCyberClick();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `kalkulator_robotika_2040_${result.sector.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Copy JSON to clipboard
  const handleCopyJSON = () => {
    if (!result) return;
    soundEffects.playCyberClick();
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const isAllAnswered = WORKFLOW_QUESTIONS.every((q) => !!quizAnswers[q.id]);

  return (
    <section id="kalkulator" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#090b10] border-t border-b border-cyan-500/20">
      
      {/* Background cyber mesh glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-tech mb-3">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>MINI-SIMULATOR INTERAKTIF TAHUN 2040</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cyber font-bold text-white tracking-tight">
            Kalkulator Dampak Robotika 2040
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Hitung indeks kolaborasi manusia vs robot pada profesi masa depan Anda, kenali model robot hipotetis mitra kerja Anda, 
            dan identifikasi keterampilan <span className="text-cyan-400 font-semibold">Human-Only</span> yang mutlak perlu diasah.
          </p>
        </div>

        {/* Multi-step Container */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl">

          {/* Stepper Navigation Indicator */}
          <div className="flex items-center justify-between max-w-xl mx-auto mb-8 border-b border-slate-800 pb-5">
            <div className={`flex items-center gap-2 text-xs font-tech ${currentStep === 'sector' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentStep === 'sector' ? 'bg-cyan-500 text-black font-bold' : 'bg-slate-800 text-slate-300'}`}>
                1
              </span>
              <span>Pilih Sektor</span>
            </div>
            <div className="h-0.5 w-12 bg-slate-800" />
            <div className={`flex items-center gap-2 text-xs font-tech ${currentStep === 'quiz' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentStep === 'quiz' ? 'bg-cyan-500 text-black font-bold' : 'bg-slate-800 text-slate-300'}`}>
                2
              </span>
              <span>Karakteristik Kerja</span>
            </div>
            <div className="h-0.5 w-12 bg-slate-800" />
            <div className={`flex items-center gap-2 text-xs font-tech ${currentStep === 'result' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentStep === 'result' ? 'bg-cyan-500 text-black font-bold' : 'bg-slate-800 text-slate-300'}`}>
                3
              </span>
              <span>Hasil & Prediksi</span>
            </div>
          </div>

          {/* STEP 1: SELECT SECTOR */}
          {currentStep === 'sector' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-cyber font-bold text-white">Langkah 1: Pilih Bidang Pekerjaan / Minat Anda</h3>
                <p className="text-xs font-tech text-slate-400 mt-1">
                  Pilih domain profesi yang ingin Anda simulasikan proyeksi robotika 2040-nya.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SECTORS_DATA.map((sector) => {
                  const isSelected = selectedSector === sector.id;
                  return (
                    <button
                      key={sector.id}
                      onClick={() => handleSelectSector(sector.id)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_20px_rgba(0,242,254,0.25)] scale-[1.02]'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-400 text-black' : 'bg-slate-800 text-cyan-400'}`}>
                            {SECTOR_ICON_MAP[sector.iconName] || <Cpu className="w-5 h-5" />}
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                        </div>
                        <h4 className="font-cyber font-bold text-sm text-white">{sector.name}</h4>
                        <div className="text-[10px] font-tech text-cyan-300/80 mb-2">{sector.category}</div>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{sector.tagline}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-tech">
                        <span className="text-slate-500">Base Otomasi:</span>
                        <span className="text-cyan-400 font-semibold">{sector.baseAutomationIndex}%</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleStartQuiz}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 font-cyber font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-all"
                >
                  <span>Lanjut: Evaluasi Cara Kerja</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: 3 WORKFLOW QUESTIONS */}
          {currentStep === 'quiz' && (
            <div className="space-y-8 max-w-3xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-xl font-cyber font-bold text-white">Langkah 2: Karakteristik Cara Kerja Harian Anda</h3>
                <p className="text-xs font-tech text-slate-400 mt-1">
                  Jawab 3 pertanyaan analitik berikut untuk mengukur ketahanan peran Anda terhadap aktuasi otonom.
                </p>
              </div>

              <div className="space-y-6">
                {WORKFLOW_QUESTIONS.map((q, idx) => (
                  <div key={q.id} className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
                    <div className="flex items-center gap-2 text-cyan-400 font-tech text-xs uppercase tracking-wider mb-1">
                      <span>Pertanyaan {idx + 1} dari 3</span>
                    </div>
                    <h4 className="font-semibold text-white text-base mb-1">{q.title}</h4>
                    <p className="text-xs text-slate-400 mb-4">{q.subtitle}</p>

                    <div className="space-y-2.5">
                      {q.options.map((opt) => {
                        const isChosen = quizAnswers[q.id] === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectOption(q.id, opt.id)}
                            className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-3 ${
                              isChosen
                                ? 'bg-cyan-950/60 border-cyan-400 text-cyan-100 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                                : 'bg-slate-950/50 border-slate-800/80 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <span className={`w-4 h-4 rounded-full border mt-0.5 flex-shrink-0 flex items-center justify-center ${
                              isChosen ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
                            }`}>
                              {isChosen && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                            </span>
                            <div className="flex-1">
                              <div>{opt.text}</div>
                              <span className="inline-block mt-1 text-[10px] font-tech text-slate-500">
                                Profil: {opt.trait}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentStep('sector')}
                  className="px-4 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white text-xs font-tech"
                >
                  Kembali ke Sektor
                </button>
                <button
                  onClick={handleCalculate}
                  disabled={!isAllAnswered}
                  className={`px-7 py-3 rounded-xl font-cyber font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
                    isAllAnswered
                      ? 'bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 text-slate-950 shadow-[0_0_25px_rgba(0,242,254,0.45)] cursor-pointer'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Kalkulasi Proyeksi 2040</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: INTERACTIVE OUTPUT RESULTS & EXPORT */}
          {currentStep === 'result' && result && (
            <div className="space-y-8">
              
              {/* Result Top Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-tech uppercase text-cyan-400 tracking-wider">Hasil Analisis Skenario</span>
                  <h3 className="text-xl sm:text-2xl font-cyber font-bold text-white">
                    {result.sector.name} [Era 2040]
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {/* View format switcher */}
                  <div className="inline-flex rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-xs font-tech">
                    <button
                      onClick={() => setViewFormat('card')}
                      className={`px-3 py-1 rounded-md transition-all ${viewFormat === 'card' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'}`}
                    >
                      Kartu Interaktif
                    </button>
                    <button
                      onClick={() => setViewFormat('table')}
                      className={`px-3 py-1 rounded-md transition-all ${viewFormat === 'table' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'}`}
                    >
                      Format Tabel
                    </button>
                    <button
                      onClick={() => setViewFormat('json')}
                      className={`px-3 py-1 rounded-md transition-all ${viewFormat === 'json' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'}`}
                    >
                      JSON Schema
                    </button>
                  </div>

                  <button
                    onClick={handleReset}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs"
                    title="Ulangi Simulasi"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* CARD VIEW */}
              {viewFormat === 'card' && (
                <div className="space-y-8">
                  
                  {/* 1. Collaboration Percentage Gauges */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Human Synergy Gauge */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-900/60 border border-cyan-500/30">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-tech uppercase text-cyan-400 flex items-center gap-1.5">
                          <HeartHandshake className="w-4 h-4" />
                          <span>Human Synergy Index</span>
                        </span>
                        <span className="text-2xl font-cyber font-black text-cyan-300">
                          {result.humanSynergyPercent}%
                        </span>
                      </div>
                      {/* Bar indicator */}
                      <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden mb-3">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full transition-all duration-1000 shadow-[0_0_12px_#00f2fe]"
                          style={{ width: `${result.humanSynergyPercent}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Tingkat ketergantungan sistem pada empati, intuisi kognitif, dan kepemimpinan moral manusia.
                      </p>
                    </div>

                    {/* Automation Dominance Gauge */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-950/40 to-slate-900/60 border border-violet-500/30">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-tech uppercase text-violet-400 flex items-center gap-1.5">
                          <Cpu className="w-4 h-4" />
                          <span>Robot Automation Index</span>
                        </span>
                        <span className="text-2xl font-cyber font-black text-violet-300">
                          {result.automationPercent}%
                        </span>
                      </div>
                      {/* Bar indicator */}
                      <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden mb-3">
                        <div 
                          className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full transition-all duration-1000 shadow-[0_0_12px_#8b5cf6]"
                          style={{ width: `${result.automationPercent}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Tingkat tugas prosedural, aktuasi fisik presisi, dan komputasi yang ditangani mesin bionik.
                      </p>
                    </div>
                  </div>

                  {/* Verdict Banner */}
                  <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-700">
                    <div className="text-xs font-tech text-cyan-400 uppercase tracking-wider mb-1">
                      {result.verdictTitle}
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {result.verdictDescription}
                    </p>
                  </div>

                  {/* 2. Hypothetical Future Robot Partner Spec Card */}
                  <div className="p-6 rounded-2xl bg-slate-950/90 border border-cyan-500/40 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-tech text-xs uppercase border border-cyan-500/30">
                          {result.robotPartner.modelCode}
                        </span>
                        <span className="text-xs font-tech text-slate-400">
                          {result.robotPartner.generation}
                        </span>
                      </div>
                      <span className="text-[11px] font-tech text-emerald-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>REKAN KERJA TAHUN 2040</span>
                      </span>
                    </div>

                    <h4 className="text-2xl font-cyber font-bold text-white mb-1">
                      {result.robotPartner.codename}
                    </h4>
                    <p className="text-cyan-300 text-sm font-medium mb-6">
                      {result.robotPartner.primaryRole}
                    </p>

                    {/* Technical Specifications Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                      <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                        <div className="text-[10px] font-tech text-slate-500 uppercase">Neural Core</div>
                        <div className="text-xs text-slate-200 font-medium">{result.robotPartner.coreSpecifications.neuralCore}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                        <div className="text-[10px] font-tech text-slate-500 uppercase">Actuator Type</div>
                        <div className="text-xs text-slate-200 font-medium">{result.robotPartner.coreSpecifications.actuatorType}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                        <div className="text-[10px] font-tech text-slate-500 uppercase">Perception Latency</div>
                        <div className="text-xs text-cyan-300 font-medium">{result.robotPartner.coreSpecifications.perceptionLatency}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                        <div className="text-[10px] font-tech text-slate-500 uppercase">Power Autonomy</div>
                        <div className="text-xs text-slate-200 font-medium">{result.robotPartner.coreSpecifications.powerAutonomy}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 sm:col-span-2">
                        <div className="text-[10px] font-tech text-slate-500 uppercase">Safeguard Protocol</div>
                        <div className="text-xs text-emerald-300 font-medium">{result.robotPartner.coreSpecifications.safeguardProtocol}</div>
                      </div>
                    </div>

                    {/* Key Functions List */}
                    <div className="mb-6">
                      <div className="text-xs font-tech uppercase text-slate-400 mb-2">Fungsi Spesifik Rekan Kerja:</div>
                      <ul className="space-y-2">
                        {result.robotPartner.keyFunctions.map((func, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                            <span>{func}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Human-Robot Symbiosis Method */}
                    <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 leading-relaxed">
                      <span className="font-semibold text-white">Metode Simbiosis Kerja: </span>
                      {result.robotPartner.humanSymbiosisMethod}
                    </div>
                  </div>

                  {/* 3. "Skill Human-Only" yang wajib ditingkatkan */}
                  <div className="p-6 rounded-2xl bg-slate-900/60 border border-amber-500/30">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-cyber font-bold text-white">
                          Skill "Human-Only" yang Wajib Ditingkatkan
                        </h4>
                        <p className="text-xs text-slate-400 font-tech">
                          Keahlian non-komputasional yang membuat Anda tetap unggul dan tak tergantikan pada tahun 2040.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.humanOnlySkills.map((skill, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-cyber font-semibold text-amber-300">{skill.name}</span>
                              <span className="text-[10px] font-tech uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                {skill.importance}
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed mb-3">{skill.description}</p>
                          </div>
                          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-tech">
                            <span className="text-cyan-400 font-medium">Langkah Nyata: </span>
                            {skill.actionableStep}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TABLE VIEW (Untuk Skripsi / Makalah) */}
              {viewFormat === 'table' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                    Berikut adalah struktur tabel ringkasan hasil simulasi yang siap disalin untuk Lampiran Analisis Tugas Akhir Sistem Informasi Anda.
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-left text-xs font-tech">
                      <thead className="bg-slate-900 text-cyan-300 uppercase tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="p-3">Parameter Analisis</th>
                          <th className="p-3">Nilai / Output Simulasi 2040</th>
                          <th className="p-3">Deskripsi Akademis</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 bg-slate-950/60 text-slate-300">
                        <tr>
                          <td className="p-3 font-semibold text-white">Sektor Profesi</td>
                          <td className="p-3 text-cyan-400">{result.sector.name} ({result.sector.category})</td>
                          <td className="p-3 text-slate-400">Domain industri target</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-white">Human Synergy Index</td>
                          <td className="p-3 text-cyan-300 font-bold">{result.humanSynergyPercent}%</td>
                          <td className="p-3 text-slate-400">Porsi nilai tambah manusia (empati, etika, konseptual)</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-white">Robot Automation Index</td>
                          <td className="p-3 text-violet-300 font-bold">{result.automationPercent}%</td>
                          <td className="p-3 text-slate-400">Porsi otomasi mesin & kecerdasan buatan bionik</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-white">Model Robot Rekan Hipotetis</td>
                          <td className="p-3 text-amber-300 font-semibold">{result.robotPartner.codename} ({result.robotPartner.modelCode})</td>
                          <td className="p-3 text-slate-400">{result.robotPartner.primaryRole}</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-white">Arsitektur Neural Partner</td>
                          <td className="p-3">{result.robotPartner.coreSpecifications.neuralCore}</td>
                          <td className="p-3 text-slate-400">Spesifikasi komputasi robot</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-white">Aktuator & Mekanisme</td>
                          <td className="p-3">{result.robotPartner.coreSpecifications.actuatorType}</td>
                          <td className="p-3 text-slate-400">Sistem fisik motor sendi robot</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-white">Skill Human-Only Prioritas</td>
                          <td className="p-3 text-cyan-200">
                            {result.humanOnlySkills.map((s) => s.name).join('; ')}
                          </td>
                          <td className="p-3 text-slate-400">Keahlian diferensiasi non-algoritmik</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* JSON SCHEMA VIEW (Untuk Developer & Integrasi API) */}
              {viewFormat === 'json' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-tech text-slate-400">
                    <span>Schema Data JSON Objek (JavaScript Array Ready):</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyJSON}
                        className="px-2.5 py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700 hover:border-cyan-400 text-xs flex items-center gap-1"
                      >
                        {isCopied ? 'Tersalin!' : 'Salin JSON'}
                      </button>
                      <button
                        onClick={handleDownloadJSON}
                        className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 text-xs flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Unduh .json</span>
                      </button>
                    </div>
                  </div>

                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 text-xs font-tech overflow-x-auto max-h-96">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}

              {/* Action buttons at bottom */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentStep('quiz')}
                  className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white text-xs font-tech"
                >
                  Edit Jawaban Kuis
                </button>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDownloadJSON}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 text-xs font-tech flex items-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Ekspor Hasil Analisis (JSON)</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 font-cyber font-bold text-xs uppercase"
                  >
                    Coba Sektor Lain
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
