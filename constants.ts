// Thresholds based on the provided thesis text
export const THRESHOLDS = {
  USAGE_MIN_HOURS: 4.0, // Page 17: Analisi Preliminare >= 4 ore
  LEAK_MAX_LPS: 0.4,    // Page 16: Leak Check > 0.4 L/s
  AHI_TARGET: 10,       // Page 16: Soglia intervento AHI > 10
  ODI_DISCREPANCY_GAP: 5 // Page 17: "Discrepanza Clinica" logic (implied gap between AHI and ODI)
};

export const COLORS = {
  green: 'bg-emerald-500',
  yellow: 'bg-amber-400',
  red: 'bg-rose-500',
  neutral: 'bg-slate-200',
  checkPass: 'text-emerald-600',
  checkFail: 'text-rose-600',
};