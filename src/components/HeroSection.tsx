import React, { useState, useEffect } from 'react';
import { RobotCanvas3D } from './RobotCanvas3D';
import { 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  ChevronRight, 
  Activity, 
  Binary, 
  SlidersHorizontal,
  Layers,
  Flame
} from 'lucide-react';
import { soundEffects } from '../utils/audioSynthesizer';

interface HeroSectionProps {
  onStartExpedition: () => void;
  onOpenCalculator: () => void;
  onOpenThesisBlueprint: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartExpedition,
  onOpenCalculator,
  onOpenThesisBlueprint
}) => {
  // Typing glitch effect state
  const fullTitle = 'EVOLUSI DAN PERKEMBANGAN ROBOTIKA MASA DEPAN';
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [glitchActive, setGlitchActive] = useState(false);
  const [activeTabVisual, setActiveTabVisual] = useState<'3d' | 'render'>('3d');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedTitle(fullTitle.slice(0, index));
      index++;
      if (index > fullTitle.length) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // Periodic subtle glitch trigger
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 220);
    }, 6000);
    return () => clearInterval(glitchInterval);
  }, []);

  const handleCtaClick = () => {
    soundEffects.playGlowRipple();
    onStartExpedition();
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0a0b10] cyber-grid">
      {/* Radial Gradient Ambient Mesh */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[480px] h-[480px] bg-violet-600/12 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-blue-500/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Cybernetic HUD Frame Lines */}
      <div className="absolute inset-x-8 top-20 h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent pointer-events-none" />
      <div className="absolute inset-y-16 left-4 w-px bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent pointer-events-none hidden md:block" />
      <div className="absolute inset-y-16 right-4 w-px bg-gradient-to-b from-transparent via-violet-500/15 to-transparent pointer-events-none hidden md:block" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        
        {/* Left Side: Typography & Hero Content */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-6">
          
          {/* Top Academic & Topic Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-400/30 text-cyan-300 text-xs font-tech tracking-wide backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe]" />
            <span>TUGAS AKHIR SISTEM INFORMASI // PROYEKSI TAHUN 2050</span>
          </div>

          {/* Glitch & Typing Hero Heading */}
          <div className="relative">
            <h1 
              className={`font-cyber text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tight leading-[1.12] text-white transition-all ${
                glitchActive ? 'translate-x-1 skew-x-2 text-cyan-300' : ''
              }`}
            >
              {displayedTitle}
              <span className="inline-block w-2.5 h-8 bg-cyan-400 ml-1.5 animate-pulse align-middle" />
            </h1>
            <p className="mt-3 text-lg font-cyber font-semibold bg-gradient-to-r from-[#00f2fe] via-[#38bdf8] to-[#a855f7] bg-clip-text text-transparent">
              Dari Elektromekanik Kaku Menuju Kesadaran Bionik & Swarm Singularity
            </p>
          </div>

          {/* Hero Narrative Description */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
            Jelajahi arsitektur robotika masa depan melalui simulasi interaktif WebGL 3D, kalkulator dampak profesi 2040, 
            dan instrumen pengujian Sistem Informasi terstandarisasi untuk akademisi dan generasi inovator cerdas.
          </p>

          {/* Key Metrics Mini Grid */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-lg pt-1">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-sm">
              <div className="text-xs font-tech text-slate-400 uppercase">Evolusi</div>
              <div className="text-lg font-cyber font-bold text-cyan-400">1950 - 2060</div>
              <div className="text-[11px] text-slate-500">11 Era Terobosan</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-violet-500/20 backdrop-blur-sm">
              <div className="text-xs font-tech text-slate-400 uppercase">Simulasi</div>
              <div className="text-lg font-cyber font-bold text-violet-400">8 Sektor</div>
              <div className="text-[11px] text-slate-500">Kalkulator 2040</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-sm">
              <div className="text-xs font-tech text-slate-400 uppercase">Riset SI</div>
              <div className="text-lg font-cyber font-bold text-emerald-400">SUS Score</div>
              <div className="text-[11px] text-slate-500">Instrumen Skripsi</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            
            {/* Primary Futuristic CTA with Glow Ripple Effect */}
            <button
              onClick={handleCtaClick}
              onMouseEnter={() => soundEffects.playCyberClick()}
              className="relative group px-7 py-3.5 rounded-xl font-cyber font-bold text-sm tracking-wide uppercase overflow-hidden bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 text-slate-950 shadow-[0_0_25px_rgba(0,242,254,0.45)] hover:shadow-[0_0_40px_rgba(0,242,254,0.7)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Compass className="w-4 h-4 transition-transform group-hover:rotate-45" />
                <span>Mulai Ekspedisi 2050</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              {/* Ripple Hover Ring */}
              <span className="absolute inset-0 bg-white/25 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-500 origin-center opacity-0 group-hover:opacity-100" />
            </button>

            {/* Secondary CTA: Kalkulator Dampak */}
            <button
              onClick={() => {
                soundEffects.playCyberClick();
                onOpenCalculator();
              }}
              className="px-5 py-3.5 rounded-xl font-cyber text-sm tracking-wide text-cyan-300 bg-slate-950/70 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/30 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Kalkulator Dampak 2040</span>
            </button>

            {/* Academic Blueprint CTA */}
            <button
              onClick={() => {
                soundEffects.playCyberClick();
                onOpenThesisBlueprint();
              }}
              className="text-xs font-tech text-slate-400 hover:text-cyan-300 underline underline-offset-4 decoration-cyan-500/40 transition-colors flex items-center gap-1.5"
            >
              <span>Dokumentasi Arsitektur TA</span>
            </button>
          </div>

        </div>

        {/* Right Side: 3D Robot Interactive Canvas & Floating HUD Cards */}
        <div className="lg:col-span-6 relative flex flex-col items-center">
          
          {/* Visual Mode Switcher (Interactive 3D vs 8K Cinematic Render) */}
          <div className="w-full flex items-center justify-between mb-3 px-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-tech text-slate-400 uppercase tracking-wider">Viewport:</span>
              <div className="inline-flex rounded-lg bg-slate-900/80 p-0.5 border border-slate-700/60 text-xs font-tech">
                <button
                  onClick={() => {
                    soundEffects.playCyberClick();
                    setActiveTabVisual('3d');
                  }}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTabVisual === '3d'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Three.js 3D View
                </button>
                <button
                  onClick={() => {
                    soundEffects.playCyberClick();
                    setActiveTabVisual('render');
                  }}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTabVisual === 'render'
                      ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  8K Cinematic Render
                </button>
              </div>
            </div>

            <div className="text-[11px] font-tech text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>LIVE TELEMETRY</span>
            </div>
          </div>

          {/* Main Visual Display Container */}
          <div className="relative w-full h-[460px] sm:h-[500px] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_40px_rgba(0,242,254,0.12)]">
            
            {activeTabVisual === '3d' ? (
              <RobotCanvas3D className="w-full h-full" initialFinish="acrylic_translucent" />
            ) : (
              <div className="relative w-full h-full bg-slate-950">
                <img
                  src="/src/assets/images/robot_2050_hero_1792976614236.jpg"
                  alt="Humanoid Robot of 2050 with ceramic and acrylic armor"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-cyan-500/30">
                  <div className="text-xs font-cyber text-cyan-300 font-semibold">SYNTHETICA 2050 // OCTANE 8K</div>
                  <div className="text-[11px] text-slate-300">
                    Pelindung keramik putih monolitik, lapisan akrilik transparan dengan kabel serat optik bercahaya sian.
                  </div>
                </div>
              </div>
            )}

            {/* Floating Glassmorphic Telemetry Card: Neural Sync (Top Right) */}
            <div className="absolute top-4 right-4 hidden sm:flex items-center gap-2.5 p-2.5 rounded-xl glass-panel pointer-events-none">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300">
                <Activity className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <div className="text-[10px] font-tech uppercase text-slate-400">Neural Sync</div>
                <div className="text-xs font-cyber font-bold text-cyan-300">99.8% [STABLE]</div>
              </div>
            </div>

            {/* Floating Glassmorphic Telemetry Card: Autonomy Level (Bottom Left) */}
            <div className="absolute bottom-16 left-4 hidden sm:flex items-center gap-2.5 p-2.5 rounded-xl glass-panel-violet pointer-events-none">
              <div className="p-2 rounded-lg bg-violet-500/20 text-violet-300">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-tech uppercase text-slate-400">Autonomy Core</div>
                <div className="text-xs font-cyber font-bold text-violet-300">Level 5 Cognition</div>
              </div>
            </div>

          </div>

          {/* Subtitle helper underneath canvas */}
          <div className="mt-3 text-center text-xs font-tech text-slate-400 flex items-center justify-center gap-3">
            <span>Drag untuk rotasi 360°</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span>Scroll untuk zoom detail</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span>Ganti material di dermaga kontrol</span>
          </div>

        </div>

      </div>
    </section>
  );
};
