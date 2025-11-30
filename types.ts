export interface AnalysisResult {
  detectedModel: string;
  keyLevelObservation: string;
  smtStatus: string;
  entryTrigger: string;
  confidenceScore: number;
  nextStep: string;
  reasoning: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  imageData: string; // Base64 string
  result: AnalysisResult;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}