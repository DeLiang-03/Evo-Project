import React, { useState } from 'react';
import { TIMELINE_MILESTONES } from '../data/timelineData';
import { TimelineMilestone } from '../types';
import { 
  History, 
  Cpu, 
  Calendar, 
  Layers, 
  Activity, 
  Sparkles, 
  ChevronRight, 
  Search, 
  Filter,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { soundEffects } from '../utils/audioSynthesizer';

export const FutureTimeline: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone>(TIMELINE_MILESTONES[6]); // Figure / Optimus 2024
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeEra, setActiveEra] = useState<string>('All');

  const categories = ['All', 'Humanoid', 'Industrial', 'Medical', 'Bio-Robotics', 'Swarm & Space'];
  const eras = ['All', 'Pioneering', 'Industrial Automation', 'Cognitive & Mobile', 'Embodied AI', 'Bionic Singularity'];

  const filteredMilestones = TIMELINE_MILESTONES.filter((m) => {
    const matchCat = activeCategory === 'All' || m.category === activeCategory;
    const matchEra = activeEra === 'All' || m.era === activeEra;
    return matchCat && matchEra;
  });

  const handleSelectMilestone = (m: TimelineMilestone) => {
    soundEffects.playCyberClick();
    setSelectedMilestone(m);
  };

  return (
    <section id="timeline" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0b10] border-b border-cyan-500/20">
      
      {/* Background glow accent */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-violet-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-tech mb-3">
            <History className="w-3.5 h-3.5 text-cyan-400" />
            <span>KRONOLOGI INTERAKTIF 1950 - 2060</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cyber font-bold text-white tracking-tight">
            Evolusi Robotika: Dari Unimate ke Post-Singularity
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Telusuri lompatan teknologi 110 tahun robotika dunia: dari sakelar drum hidrolik mekanis, algoritma kesadaran buatan VLA, 
            hingga android bionik bio-sintetik berkeramik putih akrilik tahun 2050.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 p-3 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-tech text-slate-400 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Kategori:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEffects.playCyberClick();
                  setActiveCategory(cat);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-tech transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-black font-semibold shadow-[0_0_12px_rgba(0,242,254,0.35)]'
                    : 'bg-slate-950/70 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Era Filter */}
          <div className="flex items-center gap-2 text-xs font-tech">
            <span className="text-slate-400">Era:</span>
            <select
              value={activeEra}
              onChange={(e) => setActiveEra(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-cyan-300 text-xs focus:outline-none focus:border-cyan-400"
            >
              {eras.map((era) => (
                <option key={era} value={era}>
                  {era}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Interactive Timeline Rail */}
        <div className="mb-12 overflow-x-auto pb-4 scrollbar-thin">
          <div className="flex items-center gap-4 min-w-[850px] relative px-4">
            
            {/* Center rail line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/30 via-sky-400/50 to-violet-500/40 -translate-y-1/2 pointer-events-none" />

            {filteredMilestones.map((milestone) => {
              const isSelected = selectedMilestone.year === milestone.year && selectedMilestone.title === milestone.title;
              const isFuture = milestone.year > 2024;

              return (
                <button
                  key={`${milestone.year}-${milestone.modelName}`}
                  onClick={() => handleSelectMilestone(milestone)}
                  className={`relative z-10 flex flex-col items-center flex-shrink-0 group transition-all ${
                    isSelected ? 'scale-110' : 'hover:scale-105'
                  }`}
                >
                  {/* Year Tag */}
                  <span className={`text-xs font-tech mb-2 font-bold transition-colors ${
                    isSelected ? 'text-cyan-300' : isFuture ? 'text-violet-400' : 'text-slate-400'
                  }`}>
                    {milestone.year}
                  </span>

                  {/* Marker Node */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                    isSelected
                      ? 'bg-cyan-500 text-black border-white shadow-[0_0_20px_#00f2fe]'
                      : isFuture
                      ? 'bg-slate-900 border-violet-500 text-violet-300 group-hover:border-violet-400'
                      : 'bg-slate-900 border-cyan-500/50 text-cyan-400 group-hover:border-cyan-400'
                  }`}>
                    <span className="text-[10px] font-tech font-bold">
                      {isFuture ? '20+' : milestone.year.toString().slice(2)}
                    </span>
                  </div>

                  {/* Model Short Name Label */}
                  <span className="text-[11px] font-cyber mt-2 max-w-[90px] text-center truncate text-slate-300">
                    {milestone.modelName.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Milestone Deep-Dive Inspection Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Core Historical & Narrative Spec */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-cyan-500/20 text-cyan-300 font-tech text-xs uppercase border border-cyan-500/30">
                  TAHUN {selectedMilestone.year}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 font-tech text-xs">
                  {selectedMilestone.era}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-500/30 font-tech text-xs">
                  {selectedMilestone.category}
                </span>
                <span className="text-xs font-tech text-cyan-400 ml-auto">
                  {selectedMilestone.specs.autonomyLevel}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-cyber font-bold text-white tracking-tight">
                {selectedMilestone.title}
              </h3>
              
              <div className="text-cyan-300 font-cyber font-semibold text-sm">
                Model: {selectedMilestone.modelName} // {selectedMilestone.creatorOrAgency}
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {selectedMilestone.summary}
              </p>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-xs font-tech text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Terobosan Arsitektur Teknik:</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {selectedMilestone.technicalMilestone}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-xs font-tech text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Dampak Sosio-Teknis bagi Peradaban:</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {selectedMilestone.societalImpact}
                </p>
              </div>

            </div>

            {/* Right 5 Columns: Hard Technical Telemetry Specs */}
            <div className="lg:col-span-5 p-5 rounded-xl bg-slate-950/80 border border-cyan-500/20 space-y-4">
              <div className="text-xs font-tech uppercase text-slate-400 tracking-wider flex items-center justify-between border-b border-slate-800 pb-2">
                <span>Spesifikasi Mekanika & Sensor</span>
                <span className="text-cyan-400">TELEMETRY</span>
              </div>

              <div className="space-y-3 font-tech text-xs">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Derajat Kebebasan (DoF):</span>
                  <span className="text-white font-semibold">{selectedMilestone.specs.degreeOfFreedom}</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Daya Komputasi Onboard:</span>
                  <span className="text-cyan-300 font-semibold">{selectedMilestone.specs.computePower}</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Tingkat Otonomi Robotika:</span>
                  <span className="text-emerald-400 font-semibold">{selectedMilestone.specs.autonomyLevel}</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Sistem Sensor & Persepsi:</span>
                  <span className="text-slate-200">{selectedMilestone.specs.sensors}</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] font-tech text-slate-500 text-center">
                Terverifikasi dalam Arsip IEEE Robotics & Automation Society
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
