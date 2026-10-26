import React, { useState } from 'react';
import { RobotCanvas3D } from './RobotCanvas3D';
import { ArmorFinish, RobotModelType, RobotSubsystem } from '../types';
import { 
  Box, 
  Cpu, 
  Layers, 
  Shield, 
  Zap, 
  Activity, 
  Sliders, 
  Maximize2, 
  Check, 
  Eye,
  Crosshair
} from 'lucide-react';
import { soundEffects } from '../utils/audioSynthesizer';

const SUBSYSTEMS_DATA: RobotSubsystem[] = [
  {
    id: 'neural',
    name: 'Quantum Neuromorphic Core',
    component: 'Cerebral Subsystem L5',
    status: 'Optimal',
    temp: '14.2 K (Cryo-Cooled)',
    efficiency: '99.98%',
    description: 'Arsitektur fotonik optikal 400 qubit yang memproses inferensi multimodal (VLA) secara instan tanpa pemanasan Joule.',
    techStack: 'Gallium Arsenide Optical Bus + Asimov Triple-Zero Firmware'
  },
  {
    id: 'actuator',
    name: 'Bionic Synthetic Musculature',
    component: 'Kinematic Motor Tendons',
    status: 'Synchronized',
    temp: '32.6 °C',
    efficiency: '96.4%',
    description: 'Serat polimer elektro-aktif (EAP) yang berkontraksi meniru otot biologis manusia dengan kekuatan torsi 6x lebih tinggi tanpa gigi gir mekanik.',
    techStack: 'Continuous Bio-Kinetic Tendons (54 DoF)'
  },
  {
    id: 'sensor',
    name: 'Full-Spectrum LiDAR & Vision Dome',
    component: 'Sensory Perception Array',
    status: 'Overclocked',
    temp: '28.1 °C',
    efficiency: '99.4%',
    description: 'Pemindaian 3D spasial 360° berbasis frekuensi Terahertz dan foton kuantum terbelit yang mampu melihat menembus kabut dan dinding tipis.',
    techStack: 'Sub-millimeter Photonic Rangefinder (0.003 ms)'
  },
  {
    id: 'power',
    name: 'Micro-Fusion Betavoltaic Cell',
    component: 'Auxiliary Power Core',
    status: 'Optimal',
    temp: '41.0 °C',
    efficiency: '98.2%',
    description: 'Pembangkit energi mikro berbasis isotop nikel-63 dengan masa pakai operasional mandiri hingga 15 tahun tanpa pengisian daya eksternal.',
    techStack: 'Solid-State Betavoltaic + Graphene Supercapacitor Matrix'
  }
];

export const CyberLab3DExplorer: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<RobotModelType>('humanoid_2050');
  const [activeFinish, setActiveFinish] = useState<ArmorFinish>('acrylic_translucent');
  const [selectedSubsystem, setSelectedSubsystem] = useState<RobotSubsystem>(SUBSYSTEMS_DATA[0]);

  const handleSubsystemSelect = (sub: RobotSubsystem) => {
    soundEffects.playScannerPulse();
    setSelectedSubsystem(sub);
  };

  const handleFinishChange = (finish: ArmorFinish) => {
    soundEffects.playCyberClick();
    setActiveFinish(finish);
  };

  return (
    <section id="cyberlab" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#090b10] border-b border-cyan-500/20">
      
      {/* Background glow mesh */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-violet-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-tech mb-3">
            <Box className="w-3.5 h-3.5 text-cyan-400" />
            <span>FITUR 2 // CYBERLAB 3D MODEL EXPLORER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cyber font-bold text-white tracking-tight">
            Eksplorasi Anatomi & Sub-Sistem Robot 2050
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Interaksi langsung dengan model humanoid generasi masa depan dalam ruang simulasi WebGL 3D. 
            Bongkar komponen pelindung, periksa kabel serat optik transparan, dan analisis telemetri sub-sistem internal.
          </p>
        </div>

        {/* CyberLab Interactive Canvas & Diagnostic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 8 Cols: Full Interactive 3D Canvas */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Model & View Switcher Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="text-xs font-tech text-slate-400">Model Prototipe:</span>
                <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-cyber font-semibold border border-cyan-500/30">
                  Synthetica Humanoid Gen-7 [2050]
                </span>
              </div>

              {/* Material Finish Swatches */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-tech text-slate-400 hidden sm:inline">Material:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleFinishChange('acrylic_translucent')}
                    title="Akrilik Transparan Berkilau"
                    className={`px-2.5 py-1 rounded-md text-xs font-tech transition-all ${
                      activeFinish === 'acrylic_translucent'
                        ? 'bg-cyan-500 text-black font-semibold shadow-[0_0_12px_#00f2fe]'
                        : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-cyan-500/40'
                    }`}
                  >
                    Akrilik Fotonik
                  </button>
                  <button
                    onClick={() => handleFinishChange('ceramic_white')}
                    title="Keramik Putih Nanokristalin"
                    className={`px-2.5 py-1 rounded-md text-xs font-tech transition-all ${
                      activeFinish === 'ceramic_white'
                        ? 'bg-cyan-500 text-black font-semibold shadow-[0_0_12px_#00f2fe]'
                        : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-cyan-500/40'
                    }`}
                  >
                    Keramik Putih
                  </button>
                  <button
                    onClick={() => handleFinishChange('carbon_stealth')}
                    title="Komposit Karbon Stealth"
                    className={`px-2.5 py-1 rounded-md text-xs font-tech transition-all ${
                      activeFinish === 'carbon_stealth'
                        ? 'bg-cyan-500 text-black font-semibold shadow-[0_0_12px_#00f2fe]'
                        : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-cyan-500/40'
                    }`}
                  >
                    Karbon Hitam
                  </button>
                </div>
              </div>
            </div>

            {/* 3D WebGL Viewport Container */}
            <div className="relative w-full h-[520px] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_35px_rgba(0,242,254,0.15)]">
              <RobotCanvas3D
                className="w-full h-full"
                modelType={selectedModel}
                initialFinish={activeFinish}
                showControls={true}
              />
            </div>

            {/* Navigation hint */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs font-tech text-slate-400 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-cyan-400" />
                <span>Klik & drag untuk rotasi 360°, scroll untuk zoom, gunakan slider pecah komponen di dock bawah.</span>
              </div>
              <span className="text-cyan-400">ROOM_ENVIRONMENT ACTIVE</span>
            </div>

          </div>

          {/* Right 4 Cols: Subsystem Diagnostic Telemetry Panel */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30">
              <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                <span className="text-xs font-tech uppercase text-cyan-400 tracking-wider">
                  Diagnostik Sub-Sistem
                </span>
                <span className="text-[10px] font-tech text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>SYNCHRONIZED</span>
                </span>
              </div>

              {/* Subsystem Select Buttons */}
              <div className="space-y-2 mb-4">
                {SUBSYSTEMS_DATA.map((sub) => {
                  const isSelected = selectedSubsystem.id === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => handleSubsystemSelect(sub)}
                      className={`w-full text-left p-3 rounded-lg border transition-all text-xs flex items-center justify-between ${
                        isSelected
                          ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                          : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Cpu className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                        <div>
                          <div className="font-cyber font-semibold text-white">{sub.name}</div>
                          <div className="text-[10px] font-tech text-slate-500">{sub.component}</div>
                        </div>
                      </div>
                      <span className={`text-[10px] font-tech px-2 py-0.5 rounded ${
                        sub.status === 'Optimal' ? 'bg-emerald-950 text-emerald-400' : 'bg-cyan-950 text-cyan-300'
                      }`}>
                        {sub.status}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Detailed Inspector Card for Selected Subsystem */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-cyber font-bold text-sm text-cyan-300">
                    {selectedSubsystem.name}
                  </h4>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedSubsystem.description}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 font-tech text-xs">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Termal:</span>
                    <span className="text-cyan-300 font-semibold">{selectedSubsystem.temp}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Efisiensi:</span>
                    <span className="text-emerald-400 font-semibold">{selectedSubsystem.efficiency}</span>
                  </div>
                </div>

                <div className="pt-2 text-[10px] font-tech text-slate-400">
                  <span className="text-cyan-400">Hardware Standard: </span>
                  {selectedSubsystem.techStack}
                </div>
              </div>

            </div>

            {/* Architectural note for thesis */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="text-slate-300 font-cyber font-semibold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>Relevansi Desain bagi Skripsi Sistem Informasi</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Visualisasi 3D WebGL ini mengimplementasikan prinsip Cognitive Load Theory (Sweller, 1988) 
                dan Human-Robot Interaction (HRI) untuk mengukur kecepatan pemahaman pengguna terhadap arsitektur bionik 2050.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
