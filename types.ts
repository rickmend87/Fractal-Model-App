export interface AnalysisResult {
  detectedModel: string;
  keyLevelObservation: string;
  smtStatus: string;
  entryTrigger: string;
  confidenceScore: number;
  nextStep: string;
  reasoning: string;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}