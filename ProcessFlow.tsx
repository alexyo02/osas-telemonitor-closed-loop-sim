import React from 'react';
import { CloudCog, CheckCircle2, AlertTriangle, XCircle, ArrowDown, Database, GitMerge } from 'lucide-react';
import { SimulationResult, CheckStatus } from './types';
import { THRESHOLDS } from './constants';

interface ProcessFlowProps {
  result: SimulationResult;
}

export const ProcessFlow: React.FC<ProcessFlowProps> = ({ result }) => {
  const getStepStyles = (status: CheckStatus) => {
    switch (status) {
      case CheckStatus.PASS: return 'border-emerald-500 bg-emerald-50/50 text-emerald-900 shadow-sm';
      case CheckStatus.FAIL: return 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm';
      case CheckStatus.PENDING: return 'border-slate-200 bg-white text-slate-400';
      case CheckStatus.SKIPPED: return 'border-slate-100 bg-slate-50 text-slate-300 opacity-60';
      default: return 'border-slate-200';
    }
  };

  const getIcon = (status: CheckStatus) => {
    switch (status) {
      case CheckStatus.PASS: return <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />;
      case CheckStatus.FAIL: return <XCircle size={18} className="text-amber-500 shrink-0" />;
      default: return <div className="w-4 h-4 rounded-full border-2 border-slate-200 shrink-0" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full overflow-hidden">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
        <div className="p-3 bg-purple-100 rounded-full text-purple-600">
          <CloudCog size={24} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">2. Algoritmo CDSS</h2>
          <p className="text-xs text-slate-500">Logica Decisionale (Flowchart)</p>
        </div>
      </div>

      <div className="flex-1 relative flex flex-col items-center space-y-1">
        
        {/* LINE CONNECTORS */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100 z-0" />

        {/* DATA INGESTION */}
        <div className="relative z-10 w-full pl-12 pr-4 py-2 flex items-center gap-3 text-xs text-slate-400 mb-2">
             <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center">
                <Database size={8} />
             </div>
             <span>Integrazione Dati (CPAP + Wearable)</span>
        </div>

        {/* STEP 1: USAGE */}
        <div className={`relative z-10 w-full p-3 border-l-4 rounded-r-lg transition-all duration-300 flex items-start justify-between gap-3 ${getStepStyles(result.usageCheck)}`}>
           <div className="absolute -left-[27px] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-300 rounded-full"></div>
           <div>
             <h4 className="font-bold text-sm">1. Check Aderenza</h4>
             <p className="text-[10px] mt-1 opacity-80">Verifica tempo di utilizzo minimo per efficacia terapeutica.</p>
             <div className="mt-2 inline-block px-2 py-0.5 bg-white/50 rounded text-[10px] font-mono border border-black/5">
                Target: &ge; {THRESHOLDS.USAGE_MIN_HOURS}h
             </div>
           </div>
           {getIcon(result.usageCheck)}
        </div>

        <ArrowDown size={14} className="text-slate-300 relative z-10 ml-[-220px] my-1" />

        {/* STEP 2: LEAK */}
        <div className={`relative z-10 w-full p-3 border-l-4 rounded-r-lg transition-all duration-300 flex items-start justify-between gap-3 ${getStepStyles(result.leakCheck)}`}>
           <div className="absolute -left-[27px] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-300 rounded-full"></div>
           <div>
             <h4 className="font-bold text-sm">2. Check Tecnico (Perdite)</h4>
             <p className="text-[10px] mt-1 opacity-80">Validazione affidabilità del segnale di flusso.</p>
             <div className="mt-2 inline-block px-2 py-0.5 bg-white/50 rounded text-[10px] font-mono border border-black/5">
                Limit: &lt; {THRESHOLDS.LEAK_MAX_LPS} L/s
             </div>
           </div>
           {getIcon(result.leakCheck)}
        </div>

        <ArrowDown size={14} className="text-slate-300 relative z-10 ml-[-220px] my-1" />

        {/* STEP 3: EFFICACY */}
        <div className={`relative z-10 w-full p-3 border-l-4 rounded-r-lg transition-all duration-300 flex items-start justify-between gap-3 ${getStepStyles(result.efficacyCheck)}`}>
           <div className="absolute -left-[27px] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-300 rounded-full"></div>
           <div>
             <h4 className="font-bold text-sm">3. Check Clinico (AHI)</h4>
             <p className="text-[10px] mt-1 opacity-80">Controllo eventi respiratori residui (Apnee/Ipopnee).</p>
             <div className="mt-2 inline-block px-2 py-0.5 bg-white/50 rounded text-[10px] font-mono border border-black/5">
                Target: &lt; {THRESHOLDS.AHI_TARGET} ev/h
             </div>
           </div>
           {getIcon(result.efficacyCheck)}
        </div>

        <ArrowDown size={14} className="text-slate-300 relative z-10 ml-[-220px] my-1" />

         {/* STEP 4: SYSTEMIC (ODI) */}
         <div className={`relative z-10 w-full p-3 border-l-4 rounded-r-lg transition-all duration-300 flex items-start justify-between gap-3 ${getStepStyles(result.systemicCheck)}`}>
           <div className="absolute -left-[27px] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-300 rounded-full"></div>
           <div>
             <h4 className="font-bold text-sm">4. Validazione Sistemica</h4>
             <p className="text-[10px] mt-1 opacity-80">Correlazione multiparametrica (Flusso vs Saturazione).</p>
             <div className="mt-2 flex items-center gap-1 text-[10px] opacity-70">
                <GitMerge size={10} /> Confronto AHI vs ODI
             </div>
           </div>
           {getIcon(result.systemicCheck)}
        </div>

      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 text-[10px] text-slate-400 text-center">
        Analisi a cascata: se un livello fallisce, viene generato un alert specifico.
      </div>
    </div>
  );
};