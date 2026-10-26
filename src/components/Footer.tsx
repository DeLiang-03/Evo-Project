import React from 'react';
import { Cpu, ShieldCheck, Heart, BookOpen, ExternalLink, Code2 } from 'lucide-react';
import { soundEffects } from '../utils/audioSynthesizer';

interface FooterProps {
  onOpenBlueprint: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBlueprint }) => {
  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 bg-[#07080c] border-t border-cyan-500/20 text-slate-400 text-xs font-tech">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/40">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-cyber font-bold text-sm text-white tracking-wider">
                ROBO-EVO 2050 // TUGAS AKHIR
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Proyek tugas akhir Sistem Informasi yang meneliti evolusi robotika (1950 - 2060), 
              simulasi dampak otomasi profesi 2040, dan instrumen empiris System Usability Scale (SUS).
            </p>
            <div className="text-[11px] text-cyan-400/80">
              Tema Estetika: Sci-Fi Futuristic, Dark Theme (#0a0b10), Neon Cyan (#00f2fe) & Violet (#4facfe).
            </div>
          </div>

          {/* Academic Citations */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-white font-cyber font-semibold uppercase tracking-wider text-xs mb-2">
              Landasan Teoretis & Standar Riset
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>• System Usability Scale (Brooke, 1996) ISO 9241-11</li>
              <li>• Cognitive Load Theory in HRI (Sweller, 1988)</li>
              <li>• IEEE Robotics and Automation Society Timeline Records</li>
              <li>• Level of Automation Taxonomy (Sheridan & Verplank, 1978)</li>
            </ul>
          </div>

          {/* Quick Action */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-white font-cyber font-semibold uppercase tracking-wider text-xs mb-2">
              Dokumentasi Solusi IT
            </div>
            <button
              onClick={() => {
                soundEffects.playCyberClick();
                onOpenBlueprint();
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-950/40 text-xs font-tech flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,242,254,0.1)]"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Buka Blueprint Skripsi</span>
            </button>
            <div className="text-[10px] text-slate-500 text-center">
              Termasuk diagram Sitemap, User Journey, dan Tech Stack.
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 ROBO-EVO 2050 • Karya Tugas Akhir Mahasiswa Sistem Informasi
          </div>
          <div className="flex items-center gap-2">
            <span>Dibangun dengan React 19, Three.js PBR, dan Tailwind CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
