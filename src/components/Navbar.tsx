import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Menu, 
  X, 
  Clock, 
  Layers, 
  Compass, 
  Sparkles,
  BarChart3
} from 'lucide-react';
import { soundEffects } from '../utils/audioSynthesizer';

interface NavbarProps {
  onOpenBlueprint: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBlueprint, activeSection }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);

  // Active session timer for user engagement tracking
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSoundToggle = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    soundEffects.setMuted(nextState);
    if (!nextState) {
      soundEffects.playCyberClick();
    }
  };

  const navLinks = [
    { id: 'hero', label: 'Beranda' },
    { id: 'timeline', label: 'Timeline Evolusi' },
    { id: 'cyberlab', label: 'CyberLab 3D' },
    { id: 'kalkulator', label: 'Kalkulator 2040' },
    { id: 'benchmark', label: 'Benchmark Lab' },
    { id: 'metrik-si', label: 'Metrik Riset SI' },
  ];

  const scrollTo = (id: string) => {
    soundEffects.playCyberClick();
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0a0b10]/85 backdrop-blur-md border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Thesis Subtitle */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => scrollTo('hero')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 p-0.5 shadow-[0_0_15px_rgba(0,242,254,0.3)] group-hover:shadow-[0_0_22px_rgba(0,242,254,0.6)] transition-all">
                <div className="w-full h-full bg-[#0a0b10] rounded-[10px] flex items-center justify-center text-cyan-400">
                  <Cpu className="w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="font-cyber font-black text-sm tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                  ROBO-EVO <span className="text-cyan-400">2050</span>
                </span>
                <span className="block text-[9px] font-tech text-slate-400 tracking-wider">
                  TUGAS AKHIR SISTEM INFORMASI
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-tech tracking-wide transition-all ${
                  activeSection === link.id
                    ? 'text-cyan-300 bg-cyan-950/50 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Action Tools: Session Timer, Audio Toggle & Blueprint Modal Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Research Session Timer */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] font-tech text-slate-400">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sesi: {formatTimer(sessionSeconds)}</span>
            </div>

            {/* Sound FX Toggle */}
            <button
              onClick={handleSoundToggle}
              title={isMuted ? 'Nyalakan Efek Suara Sci-Fi' : 'Bisukan Suara'}
              className={`p-2 rounded-lg border text-xs transition-all ${
                isMuted
                  ? 'bg-slate-900 border-slate-700 text-slate-500'
                  : 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(0,242,254,0.2)]'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Blueprint Skripsi Button */}
            <button
              onClick={() => {
                soundEffects.playCyberClick();
                onOpenBlueprint();
              }}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/40 hover:border-cyan-400 text-cyan-200 text-xs font-tech flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,242,254,0.15)]"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Blueprint TA</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden p-4 bg-[#0a0b10] border-b border-cyan-500/30 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="w-full text-left p-2.5 rounded-lg text-xs font-tech text-slate-300 hover:bg-cyan-950/40 hover:text-cyan-300"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 text-[11px] font-tech text-slate-400 flex items-center justify-between">
            <span>Durasi Sesi Riset:</span>
            <span className="text-cyan-400 font-bold">{formatTimer(sessionSeconds)}</span>
          </div>
        </div>
      )}
    </nav>
  );
};
