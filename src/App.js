// App.js
import React, { useState } from 'react';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import ResultPage from './components/ResultPage';
import "./App.css"

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [csvData, setCsvData] = useState(null);
  const [manualMinMax, setManualMinMax] = useState({
    maxX: '',
    minX: '',
    maxY: '',
    minY: '',
    maxZ: '',
    minZ: '',
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  switch (step) {
    case 1:
      return <StepOne formData={formData} setFormData={setFormData} nextStep={nextStep} />;
    case 2:
      return <StepTwo formData={formData} setFormData={setFormData} csvData={csvData} nextStep={nextStep} setManualMinMax={setManualMinMax} />;
    case 3:
      return <ResultPage formData={formData} manualMinMax={manualMinMax} />;
    default:
      return null;
  }
};

export default App;
