import React from 'react';
import { Stethoscope, CheckCircle, AlertTriangle, AlertOctagon, FileText } from 'lucide-react';
import { ClinicalStatus, SimulationResult, CheckStatus } from './types';

interface ClinicalDashboardProps {
  result: SimulationResult;
}

export const ClinicalDashboard: React.FC<ClinicalDashboardProps> = ({ result }) => {
  
  const getStatusConfig = (status: ClinicalStatus) => {
    switch (status) {
      case ClinicalStatus.GREEN:
        return {
          color: 'bg-emerald-500',
          lightColor: 'bg-emerald-50',
          borderColor: 'border-emerald-200',
          textColor: 'text-emerald-800',
          icon: <CheckCircle className="w-12 h-12 text-emerald-500" />,
          label: 'STABLE (Green)'
        };
      case ClinicalStatus.YELLOW_ADHERENCE:
        return {
          color: 'bg-amber-400',
          lightColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          textColor: 'text-amber-800',
          icon: <AlertTriangle className="w-12 h-12 text-amber-500" />,
          label: 'ALERT: ADHERENCE (Yellow)'
        };
      case ClinicalStatus.YELLOW_TECHNICAL:
        return {
          color: 'bg-amber-400',
          lightColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          textColor: 'text-amber-800',
          icon: <AlertTriangle className="w-12 h-12 text-amber-500" />,
          label: 'ALERT: LEAK/TECHNICAL (Yellow)'
        };
      case ClinicalStatus.RED_INEFFICACY:
        return {
          color: 'bg-rose-500',
          lightColor: 'bg-rose-50',
          borderColor: 'border-rose-200',
          textColor: 'text-rose-800',
          icon: <AlertOctagon className="w-12 h-12 text-rose-500" />,
          label: 'ALARM: INEFFICACY (Red)'
        };
      case ClinicalStatus.RED_DISCREPANCY:
        return {
          color: 'bg-rose-500',
          lightColor: 'bg-rose-50',
          borderColor: 'border-rose-200',
          textColor: 'text-rose-800',
          icon: <AlertOctagon className="w-12 h-12 text-rose-500" />,
          label: 'ALARM: DISCREPANCY (Red)'
        };
      default:
        return {
            color: 'bg-slate-500',
            lightColor: 'bg-slate-50',
            borderColor: 'border-slate-200',
            textColor: 'text-slate-800',
            icon: <CheckCircle />,
            label: 'Unknown'
        };
    }
  };

  const config = getStatusConfig(result.finalStatus);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full overflow-y-auto">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
        <div className="p-3 bg-rose-100 rounded-full text-rose-600">
          <Stethoscope size={24} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">3. Dashboard Clinica</h2>
          <p className="text-xs text-slate-500">Gestione "By Exception"</p>
        </div>
      </div>

      <div className={`flex flex-col items-center p-6 rounded-2xl border-2 mb-6 transition-colors duration-300 ${config.lightColor} ${config.borderColor}`}>
        <div className="mb-4 bg-white p-4 rounded-full shadow-sm">
            {config.icon}
        </div>
        <h3 className={`text-xl font-bold mb-2 text-center ${config.textColor}`}>{config.label}</h3>
        <p className="text-center text-sm opacity-80 max-w-[200px]">{result.message}</p>
      </div>

      <div className="space-y-4 flex-1">
        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Azione Raccomandata</h4>
        
        <div className="bg-slate-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <div className="flex gap-3">
                <FileText size={20} className="text-blue-500 shrink-0 mt-1" />
                <div>
                    <span className="text-xs font-bold text-blue-600 uppercase mb-1 block">Protocollo Standard</span>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                        {result.action}
                    </p>
                </div>
            </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100">
            <h5 className="text-xs font-semibold text-slate-500 mb-2">Correlazione Dati</h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-slate-50 rounded">
                    <span className="block text-slate-400">AHI (Flow)</span>
                    <span className="font-bold text-slate-700">{Math.round(result.efficacyCheck === CheckStatus.PENDING ? 0 : 100)}% Confidence</span>
                </div>
                <div className="p-2 bg-slate-50 rounded">
                     <span className="block text-slate-400">SpO2 (Pulse)</span>
                    <span className="font-bold text-slate-700">Valid</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};