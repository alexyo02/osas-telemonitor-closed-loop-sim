export enum CheckStatus {
  PENDING = 'PENDING',
  PASS = 'PASS',
  FAIL = 'FAIL',
  SKIPPED = 'SKIPPED'
}

export enum ClinicalStatus {
  GREEN = 'GREEN', // Stable, monitoring only
  YELLOW_ADHERENCE = 'YELLOW_ADHERENCE', // Low usage
  YELLOW_TECHNICAL = 'YELLOW_TECHNICAL', // High leak
  RED_INEFFICACY = 'RED_INEFFICACY', // High AHI
  RED_DISCREPANCY = 'RED_DISCREPANCY', // Low AHI but high ODI
}

export interface PatientData {
  usageHours: number;
  leakLPS: number; // Liters per second
  ahi: number; // Events per hour
  odi: number; // Oxygen Desaturation Index
  spo2: number; // Average SpO2
}

export interface SimulationResult {
  usageCheck: CheckStatus;
  leakCheck: CheckStatus;
  efficacyCheck: CheckStatus;
  systemicCheck: CheckStatus;
  finalStatus: ClinicalStatus;
  message: string;
  action: string;
}