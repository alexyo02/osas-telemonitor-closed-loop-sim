import React, { useState, useEffect } from 'react';
import { PatientRoom } from './PatientRoom';
import { ProcessFlow } from './ProcessFlow';
import { ClinicalDashboard } from './ClinicalDashboard';
import { PatientData, SimulationResult, ClinicalStatus, CheckStatus } from './types';
import { THRESHOLDS } from './constants';
import { Maximize2, Minimize2 } from 'lucide-react';

const App: React.FC = () => {
  // Initial state mimicking a standard patient case
  const [data, setData] = useState<PatientData>({
    usageHours: 6.5,
    leakLPS: 0.1,
    ahi: 4,
    odi: 3,
    spo2: 96
  });

  const [result, setResult] = useState<SimulationResult>({
    usageCheck: CheckStatus.PENDING,
    leakCheck: CheckStatus.PENDING,
    efficacyCheck: CheckStatus.PENDING,
    systemicCheck: CheckStatus.PENDING,
    finalStatus: ClinicalStatus.GREEN,
    message: '',
    action: ''
  });

  const [presentationMode, setPresentationMode] = useState(false);

  const updateData = (key: keyof PatientData, value: number) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  // The CDSS Algorithm (Core Logic from Page 17 & Figure 5)
  useEffect(() => {
    const newResult: SimulationResult = {
      usageCheck: CheckStatus.PENDING,
      leakCheck: CheckStatus.SKIPPED,
      efficacyCheck: CheckStatus.SKIPPED,
      systemicCheck: CheckStatus.SKIPPED,
      finalStatus: ClinicalStatus.GREEN,
      message: '',
      action: ''
    };

    // 1. Analisi Preliminare (Usage Check)
    if (data.usageHours < THRESHOLDS.USAGE_MIN_HOURS) {
      newResult.usageCheck = CheckStatus.FAIL;
      newResult.finalStatus = ClinicalStatus.YELLOW_ADHERENCE;
      newResult.message = `Usage (${data.usageHours.toFixed(1)}h) is below 4h threshold.`;
      newResult.action = "Intervento: Supporto Motivazionale. Verifica comfort della maschera.";
    } else {
      newResult.usageCheck = CheckStatus.PASS;
      
      // 2. Nodo Tecnico (Leak Check)
      if (data.leakLPS >= THRESHOLDS.LEAK_MAX_LPS) {
        newResult.leakCheck = CheckStatus.FAIL;
        newResult.finalStatus = ClinicalStatus.YELLOW_TECHNICAL;
        newResult.message = `High Mask Leak (${data.leakLPS} L/s). Data unreliable.`;
        newResult.action = "Intervento: Alert Infermieristico. Verifica posizionamento maschera.";
      } else {
        newResult.leakCheck = CheckStatus.PASS;

        // 3. Nodo Clinico (Efficacy AHI)
        if (data.ahi >= THRESHOLDS.AHI_TARGET) {
          newResult.efficacyCheck = CheckStatus.FAIL;
          newResult.finalStatus = ClinicalStatus.RED_INEFFICACY;
          newResult.message = `Residual AHI (${data.ahi}) is too high.`;
          newResult.action = "Intervento: Alert Medico. Richiesta 'Teletitolazione' (Aggiustamento pressioni).";
        } else {
          newResult.efficacyCheck = CheckStatus.PASS;

          // 4. Validation Systemica (SpO2/ODI Check - Logic from Page 17)
          // If AHI is low (<10) but ODI is high relative to AHI, potential false negative
          if (data.odi > THRESHOLDS.AHI_TARGET && (data.odi - data.ahi > 5)) {
             newResult.systemicCheck = CheckStatus.FAIL;
             newResult.finalStatus = ClinicalStatus.RED_DISCREPANCY;
             newResult.message = "Low AHI but High ODI. Potential sensor error or complex pathology.";
             newResult.action = "Intervento: Alert Specialista. Sospetta apnea centrale o malfunzionamento sensore.";
          } else {
             newResult.systemicCheck = CheckStatus.PASS;
             newResult.finalStatus = ClinicalStatus.GREEN;
             newResult.message = "Terapia Efficace. Parametri nella norma.";
             newResult.action = "Nessun Intervento Richiesto. Continua monitoraggio.";
          }
        }
      }
    }

    setResult(newResult);

  }, [data]);

  return (
    <div className={`min-h-screen bg-[#f0f4f8] transition-all duration-500 flex flex-col font-sans ${presentationMode ? 'p-4' : 'p-8 max-w-7xl mx-auto'}`}>
      
      {/* Presentation Mode Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={() => setPresentationMode(!presentationMode)}
          className="p-2 bg-white rounded-full shadow-md text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-all"
          title={presentationMode ? "Esci da Modalità Presentazione" : "Modalità Presentazione (Full Screen)"}
        >
          {presentationMode ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>
      </div>

      {!presentationMode && (
        <header className="mb-8 animate-in slide-in-from-top-4 duration-500">
          <h1 className="text-3xl font-bold text-slate-800">Ecosistema "Closed-Loop" Telemonitoraggio OSAS</h1>
          <p className="text-slate-500 mt-2 max-w-3xl">
            Basato sull'architettura di telemedicina per il trattamento dei disturbi del sonno.
            Regola i parametri del paziente qui sotto per visualizzare come i flussi di dati attraversano la <strong>Body Area Network</strong>, 
            vengono processati dall'<strong>Algoritmo CDSS</strong>, e appaiono sulla <strong>Dashboard Clinica</strong>.
          </p>
        </header>
      )}

      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 transition-all duration-500 ${presentationMode ? 'h-[95vh] items-stretch' : ''}`}>
        {/* Left Col: Patient Input */}
        <div className="h-full">
          <PatientRoom data={data} updateData={updateData} />
        </div>

        {/* Middle Col: Logic Flow */}
        <div className="h-full">
          <ProcessFlow result={result} />
        </div>

        {/* Right Col: Doctor Output */}
        <div className="h-full">
          <ClinicalDashboard result={result} />
        </div>
      </div>
      
      {!presentationMode && (
        <footer className="mt-12 text-center text-slate-400 text-sm animate-in slide-in-from-bottom-4 duration-500">
          <p>Simulazione Interattiva - Ingegneria dei Sistemi Medicali</p>
        </footer>
      )}
    </div>
  );
};

export default App;