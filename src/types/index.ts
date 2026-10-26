export type SectorId = 
  | 'medis' 
  | 'logistik' 
  | 'software' 
  | 'kreatif' 
  | 'pertanian' 
  | 'pendidikan' 
  | 'fintech' 
  | 'antariksa';

export interface SectorOption {
  id: SectorId;
  name: string;
  category: string;
  iconName: string;
  tagline: string;
  baseAutomationIndex: number; // 0-100
  baseHumanSynergyIndex: number; // 0-100
  description: string;
  accentColor: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  automationDelta: number;
  synergyDelta: number;
  trait: string;
}

export interface CalculatorQuestion {
  id: number;
  title: string;
  subtitle: string;
  options: QuestionOption[];
}

export interface HypotheticalRobotPartner {
  modelCode: string;
  codename: string;
  generation: string;
  primaryRole: string;
  coreSpecifications: {
    neuralCore: string;
    actuatorType: string;
    perceptionLatency: string;
    powerAutonomy: string;
    safeguardProtocol: string;
  };
  keyFunctions: string[];
  humanSymbiosisMethod: string;
  hologramHue: string;
}

export interface HumanOnlySkill {
  name: string;
  importance: 'Kritis' | 'Sangat Tinggi' | 'Tinggi';
  description: string;
  actionableStep: string;
}

export interface ImpactCalculationResult {
  sector: SectorOption;
  humanSynergyPercent: number;
  automationPercent: number;
  verdictTitle: string;
  verdictDescription: string;
  robotPartner: HypotheticalRobotPartner;
  humanOnlySkills: HumanOnlySkill[];
  selectedAnswers: {
    questionId: number;
    questionText: string;
    chosenText: string;
    trait: string;
  }[];
  timestamp: string;
}

// Timeline Types
export interface TimelineMilestone {
  year: number;
  era: 'Pioneering' | 'Industrial Automation' | 'Cognitive & Mobile' | 'Embodied AI' | 'Bionic Singularity';
  category: 'Industrial' | 'Humanoid' | 'Medical' | 'Bio-Robotics' | 'Swarm & Space';
  title: string;
  modelName: string;
  creatorOrAgency: string;
  summary: string;
  technicalMilestone: string;
  societalImpact: string;
  specs: {
    degreeOfFreedom: string;
    computePower: string;
    autonomyLevel: 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4' | 'Level 5';
    sensors: string;
  };
}

// 3D CyberLab Types
export type RobotModelType = 'humanoid_2050' | 'drone_sentinel' | 'bionic_exo';
export type ArmorFinish = 'ceramic_white' | 'acrylic_translucent' | 'carbon_stealth' | 'titanium_gold';

export interface RobotSubsystem {
  id: string;
  name: string;
  component: string;
  status: 'Optimal' | 'Synchronized' | 'Overclocked' | 'Standby';
  temp: string;
  efficiency: string;
  description: string;
  techStack: string;
}

// Telemetry & Academic Metrics (Sistem Informasi)
export interface TelemetryEvent {
  id: string;
  timestamp: number;
  module: 'hero' | 'calculator' | 'cyberlab' | 'timeline' | 'benchmark' | 'sus_evaluation';
  action: string;
  metadata?: Record<string, any>;
}

export interface SUSResponse {
  scores: number[]; // 10 questions, values 1-5
  totalScore: number; // Brooke formula: 0-100
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  adjectiveRating: 'Best Imaginable' | 'Excellent' | 'Good' | 'OK' | 'Poor' | 'Worst Imaginable';
  acceptability: 'Acceptable' | 'Marginal' | 'Not Acceptable';
  completedAt: string;
}

export interface ResearchSessionMetrics {
  sessionId: string;
  startTime: number;
  dwellTimes: Record<string, number>;
  clickCounts: Record<string, number>;
  calculatorCompleted: boolean;
  benchmarkRuns: number;
  susResult?: SUSResponse;
}
