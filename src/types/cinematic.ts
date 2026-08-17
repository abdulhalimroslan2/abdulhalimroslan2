export interface ChapterData {
  id: number;
  chapterNumber: string;
  title: string;
  subtitle: string;
  tagline: string;
  timeRange: [number, number]; // progress 0.0 to 1.0
  videoTimeRange: [number, number]; // in seconds
  depthScale: string; // e.g. "10⁻¹² m" to "10⁰ m"
  coordinates: string; // e.g. "5.1687° N, 100.4855° E"
  primaryColor: string;
  themeGlow: string;
  narrativeFlow: string;
}

export interface AppEcosystemItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  impactMetric: string;
  techStack: string[];
  status: string;
  badgeColor: string;
}

export interface AwardItem {
  year: string;
  title: string;
  level: string;
  award: 'EMAS' | 'PERAK' | 'JOHAN' | 'ANUGERAH' | 'TERBAIK';
  organization: string;
  description: string;
}

export interface ExpertPanelItem {
  role: string;
  body: string;
  domain: string;
  period: string;
}

export interface PublicationItem {
  title: string;
  type: string;
  target: string;
  description: string;
}

export interface CandidateProfile {
  name: string;
  grade: string;
  school: string;
  experienceYears: number;
  serviceSince: number;
  corePhilosophy: string;
  quote: string;
}
