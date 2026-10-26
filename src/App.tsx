/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FutureTimeline } from './components/FutureTimeline';
import { CyberLab3DExplorer } from './components/CyberLab3DExplorer';
import { ImpactCalculator2040 } from './components/ImpactCalculator2040';
import { RobotCustomizerBenchmark } from './components/RobotCustomizerBenchmark';
import { ResearchTelemetryDashboard } from './components/ResearchTelemetryDashboard';
import { Footer } from './components/Footer';
import { ThesisArchitectBlueprintModal } from './components/ThesisArchitectBlueprintModal';
import { SUSResponse } from './types';

export default function App() {
  const [isBlueprintOpen, setIsBlueprintOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Real-time Information Systems Research Telemetry
  const [dwellTimes, setDwellTimes] = useState<Record<string, number>>({
    hero: 0,
    timeline: 0,
    cyberlab: 0,
    calculator: 0,
    benchmark: 0,
    'metrik-si': 0
  });

  const [clickCounts, setClickCounts] = useState<Record<string, number>>({
    global_clicks: 0
  });

  const activeSectionRef = useRef<string>('hero');
  activeSectionRef.current = activeSection;

  // Track global clicks for HCI engagement analysis
  useEffect(() => {
    const handleGlobalClick = () => {
      setClickCounts((prev) => ({
        ...prev,
        global_clicks: (prev.global_clicks || 0) + 1
      }));
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // Track dwell time per active module in view
  useEffect(() => {
    const interval = setInterval(() => {
      const current = activeSectionRef.current;
      setDwellTimes((prev) => ({
        ...prev,
        [current]: (prev[current] || 0) + 1
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // IntersectionObserver to determine active section
  useEffect(() => {
    const sections = ['hero', 'timeline', 'cyberlab', 'kalkulator', 'benchmark', 'metrik-si'];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportMid = scrollY + window.innerHeight * 0.35;

      for (const sectionId of sections) {
        const elem = document.getElementById(sectionId);
        if (elem) {
          const top = elem.offsetTop;
          const height = elem.offsetHeight;
          if (viewportMid >= top && viewportMid < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogTelemetry = (action: string, metadata: any) => {
    setClickCounts((prev) => ({
      ...prev,
      [action]: (prev[action] || 0) + 1
    }));
  };

  const handleSaveSUS = (result: SUSResponse) => {
    handleLogTelemetry('sus_submitted', { score: result.totalScore });
  };

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b10] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Futuristic Navigation Bar */}
      <Navbar
        onOpenBlueprint={() => setIsBlueprintOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <div id="hero">
          <HeroSection
            onStartExpedition={() => scrollToSection('timeline')}
            onOpenCalculator={() => scrollToSection('kalkulator')}
            onOpenThesisBlueprint={() => setIsBlueprintOpen(true)}
          />
        </div>

        {/* Feature 1: Interactive Future Timeline (1950 - 2060) */}
        <FutureTimeline />

        {/* Feature 2: 3D Model Explorer (CyberLab 2050) */}
        <CyberLab3DExplorer />

        {/* Edu-Tech Mini Simulator: Kalkulator Dampak Robotika 2040 */}
        <ImpactCalculator2040 onLogTelemetry={handleLogTelemetry} />

        {/* Feature 4: Virtual Robot Lab & Kinetic Benchmark */}
        <RobotCustomizerBenchmark />

        {/* Feature 3: Research Telemetry & Usability Evaluation (SUS) */}
        <ResearchTelemetryDashboard
          dwellTimes={dwellTimes}
          clickCounts={clickCounts}
          onSaveSUSResult={handleSaveSUS}
        />

      </main>

      {/* Footer */}
      <Footer onOpenBlueprint={() => setIsBlueprintOpen(true)} />

      {/* Thesis Blueprint & Architecture Dossier Modal */}
      <ThesisArchitectBlueprintModal
        isOpen={isBlueprintOpen}
        onClose={() => setIsBlueprintOpen(false)}
      />

    </div>
  );
}
