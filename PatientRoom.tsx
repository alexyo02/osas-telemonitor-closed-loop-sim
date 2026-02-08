import React, { useState, useEffect } from 'react';
import { Bed, Wind, Activity, Watch, X, Zap, ChevronLeft } from 'lucide-react';
import { PatientData } from './types';

interface PatientRoomProps {
  data: PatientData;
  updateData: (key: keyof PatientData, value: number) => void;
}

type DeviceType = 'CPAP' | 'WEARABLE' | null;

export const PatientRoom: React.FC<PatientRoomProps> = ({ data, updateData }) => {
  const [activeDevice, setActiveDevice] = useState<DeviceType>(null);
  
  // Fake real-time data state
  const [livePressure, setLivePressure] = useState(10);
  const [liveFlow, setLiveFlow] = useState(30);
  const [livePulse, setLivePulse] = useState(72);

  // Simulation effect for "Live" numbers
  useEffect(() => {
    if (!activeDevice) return;
    
    const interval = setInterval(() => {
      if (activeDevice === 'CPAP') {
        setLivePressure(prev => 10 + Math.sin(Date.now() / 1000) * 2 + (Math.random() - 0.5));
        setLiveFlow(prev => 30 + Math.cos(Date.now() / 800) * 15 + (Math.random() * 5));
      } else {
        setLivePulse(prev => 70 + Math.floor(Math.random() * 5));
      }
    }, 500);

    return () => clearInterval(interval);
  }, [activeDevice]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4 relative z-10">
        <div className="p-3 bg-blue-100 rounded-full text-blue-600">
          <Bed size={24} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">1. Acquisizione Dati</h2>
          <p className="text-xs text-slate-500">Ambiente Domestico (Paziente)</p>
        </div>
      </div>

      {/* Interactive Visual Area */}
      <div className="relative flex-1 min-h-[240px] bg-slate-50 rounded-xl mb-6 flex flex-col items-center justify-center border border-slate-100 overflow-hidden group">
        
        {/* Background Ambient Light */}
        <div className="absolute w-full h-full bg-gradient-to-b from-slate-50 to-blue-50/50"></div>
        
        {/* Patient Graphics */}
        <div className="relative z-10 flex flex-col items-center mt-4">
           {/* Head & Mask */}
           <div className="relative">
             <div className="w-20 h-20 bg-slate-200 rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                {/* Simple face representation */}
                <div className="w-full h-full bg-[#f3e5dc] relative">
                    <div className="absolute top-[40%] left-[20%] w-2 h-2 bg-slate-400 rounded-full opacity-50"></div> {/* Eye */}
                    <div className="absolute top-[40%] right-[20%] w-2 h-2 bg-slate-400 rounded-full opacity-50"></div> {/* Eye */}
                </div>
             </div>
             {/* Mask Overlay */}
             <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-14 h-12 bg-sky-100/80 border-2 border-sky-300 rounded-xl backdrop-blur-sm"></div>
             {/* Tube */}
             <div className="absolute top-[60%] -left-10 w-20 h-24 border-t-8 border-l-8 border-slate-300 rounded-tl-3xl -z-10"></div>
           </div>
           
           {/* Body */}
           <div className="w-32 h-16 bg-blue-200 rounded-t-3xl mt-[-5px] border-4 border-white shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 skew-y-12 origin-bottom-left"></div>
           </div>
        </div>

        {/* Devices (Buttons) */}
        <div className="flex gap-12 mt-6 relative z-20 w-full justify-center px-4">
            
            {/* CPAP DEVICE */}
            <button 
                onClick={() => setActiveDevice('CPAP')}
                className="group/btn flex flex-col items-center gap-2 transition-transform hover:-translate-y-1"
            >
                <div className={`relative p-3 rounded-xl border-2 shadow-sm transition-colors ${activeDevice === 'CPAP' ? 'bg-sky-100 border-sky-400' : 'bg-white border-slate-200 hover:border-sky-300'}`}>
                    <Wind size={20} className="text-sky-600" />
                    {activeDevice === 'CPAP' && <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span></span>}
                </div>
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider bg-white/80 px-2 rounded py-0.5">CPAP</span>
            </button>

            {/* WEARABLE DEVICE */}
            <button 
                onClick={() => setActiveDevice('WEARABLE')}
                className="group/btn flex flex-col items-center gap-2 transition-transform hover:-translate-y-1"
            >
                <div className={`relative p-3 rounded-xl border-2 shadow-sm transition-colors ${activeDevice === 'WEARABLE' ? 'bg-teal-100 border-teal-400' : 'bg-white border-slate-200 hover:border-teal-300'}`}>
                    <Watch size={20} className="text-teal-600" />
                    {activeDevice === 'WEARABLE' && <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span></span>}
                </div>
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider bg-white/80 px-2 rounded py-0.5">Wearable</span>
            </button>

        </div>

        <div className="absolute bottom-2 text-[9px] text-slate-400 italic">Clicca sui dispositivi per i dati live</div>

        {/* LIVE DATA POPUP OVERLAY */}
        {activeDevice && (
            <div className="absolute inset-0 z-30 bg-white/95 backdrop-blur-sm p-4 animate-in fade-in zoom-in duration-200 flex flex-col">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
                        <button 
                            onClick={() => setActiveDevice('CPAP')}
                            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${activeDevice === 'CPAP' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <span className="flex items-center gap-1"><Wind size={12}/> CPAP</span>
                        </button>
                        <button 
                            onClick={() => setActiveDevice('WEARABLE')}
                            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${activeDevice === 'WEARABLE' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <span className="flex items-center gap-1"><Watch size={12}/> Wearable</span>
                        </button>
                    </div>
                    <button onClick={() => setActiveDevice(null)} className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600"><X size={18} /></button>
                </div>
                
                <div className="flex-1 space-y-3 overflow-y-auto">
                    {activeDevice === 'CPAP' ? (
                        <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                            <div className="flex items-center gap-2 mb-2 text-sky-600">
                                <Zap size={14} className="animate-pulse" />
                                <span className="text-xs font-bold uppercase">CPAP Real-Time Data</span>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <span className="text-xs text-slate-500 block mb-1">Pressione (cmH2O)</span>
                                <div className="h-8 bg-slate-200 rounded overflow-hidden relative">
                                    <div className="absolute bottom-0 left-0 w-full bg-sky-400 transition-all duration-300 opacity-50" style={{ height: `${(livePressure / 15) * 100}%` }}></div>
                                    <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-slate-700">{livePressure.toFixed(1)}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="p-2 bg-slate-50 rounded border border-slate-100">
                                    <span className="text-[10px] text-slate-400 uppercase">Flusso</span>
                                    <div className="font-mono font-bold text-slate-700">{liveFlow.toFixed(0)} <span className="text-[10px] font-normal">L/min</span></div>
                                </div>
                                <div className="p-2 bg-slate-50 rounded border border-slate-100">
                                    <span className="text-[10px] text-slate-400 uppercase">Perdite</span>
                                    <div className="font-mono font-bold text-slate-700">{data.leakLPS.toFixed(2)} <span className="text-[10px] font-normal">L/s</span></div>
                                </div>
                            </div>
                            <div className="text-[10px] text-slate-400 mt-2">
                                <strong>Verifiche in corso:</strong>
                                <ul className="list-disc pl-4 mt-1 space-y-1">
                                    <li>Aderenza alla pressione impostata</li>
                                    <li>Verifica stabilità maschera</li>
                                    <li>Analisi respiro-per-respiro</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                            <div className="flex items-center gap-2 mb-2 text-teal-600">
                                <Activity size={14} className="animate-pulse" />
                                <span className="text-xs font-bold uppercase">Wearable Bio-Signals</span>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <span className="text-xs text-slate-500 block mb-1">Pletismografia (PPG)</span>
                                <div className="h-12 flex items-end justify-between gap-0.5 px-1">
                                    {[...Array(20)].map((_, i) => (
                                        <div key={i} className="w-1 bg-teal-400 rounded-t-sm animate-pulse" style={{ height: `${20 + Math.random() * 80}%`, animationDelay: `${i * 0.05}s` }}></div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="p-2 bg-slate-50 rounded border border-slate-100">
                                    <span className="text-[10px] text-slate-400 uppercase">SpO2</span>
                                    <div className="font-mono font-bold text-teal-700">{data.spo2}%</div>
                                </div>
                                <div className="p-2 bg-slate-50 rounded border border-slate-100">
                                    <span className="text-[10px] text-slate-400 uppercase">HR</span>
                                    <div className="font-mono font-bold text-rose-500">{livePulse} <span className="text-[10px] font-normal">bpm</span></div>
                                </div>
                            </div>
                            <div className="text-[10px] text-slate-400 mt-2">
                                <strong>Verifiche in corso:</strong>
                                <ul className="list-disc pl-4 mt-1 space-y-1">
                                    <li>Ossimetria continua</li>
                                    <li>Attigrafia (movimento)</li>
                                    <li>Correlazione frequenza cardiaca</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                <button 
                    onClick={() => setActiveDevice(null)} 
                    className="mt-4 w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                    <ChevronLeft size={14} /> Torna alla vista paziente
                </button>
            </div>
        )}

      </div>

      <div className="space-y-5">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Parametri Simulazione (Medie)</h3>
        
        {/* USAGE CONTROL */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-slate-700 flex items-center gap-2">
              <Activity size={14} /> Usage Duration
            </span>
            <span className="font-mono bg-slate-100 px-2 rounded text-slate-600">{data.usageHours.toFixed(1)} h</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={data.usageHours}
            onChange={(e) => updateData('usageHours', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* LEAK CONTROL */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-slate-700 flex items-center gap-2">
              <Wind size={14} /> Mask Leak (L/s)
            </span>
            <span className="font-mono bg-slate-100 px-2 rounded text-slate-600">{data.leakLPS.toFixed(2)} L/s</span>
          </div>
          <input
            type="range"
            min="0"
            max="1.0"
            step="0.05"
            value={data.leakLPS}
            onChange={(e) => updateData('leakLPS', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
          />
        </div>

        {/* AHI CONTROL */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-slate-700 flex items-center gap-2">
              <Activity size={14} /> AHI (Residual)
            </span>
            <span className="font-mono bg-slate-100 px-2 rounded text-slate-600">{data.ahi} ev/h</span>
          </div>
          <input
            type="range"
            min="0"
            max="40"
            step="1"
            value={data.ahi}
            onChange={(e) => updateData('ahi', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
        </div>

         {/* ODI CONTROL */}
         <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-slate-700 flex items-center gap-2">
              <Watch size={14} /> ODI (Wearable)
            </span>
            <span className="font-mono bg-slate-100 px-2 rounded text-slate-600">{data.odi} ev/h</span>
          </div>
          <input
            type="range"
            min="0"
            max="40"
            step="1"
            value={data.odi}
            onChange={(e) => updateData('odi', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
          />
        </div>

      </div>
    </div>
  );
};