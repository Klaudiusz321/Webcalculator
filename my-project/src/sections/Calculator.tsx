import React, { useState } from "react";
import MetricInputForm, { MetricData } from "../components/MetricInputForm";
import MetricOutputForm from "../components/MetricOutputForm";


const Calculator: React.FC = () => {
  // Tutaj trzymasz stan, w którym przechowujesz wynik
  const [result, setResult] = useState<MetricData | null>(null);

  // Funkcja, którą wywołuje MetricInputForm, kiedy dostanie wynik z backendu
  const handleResult = (data: MetricData) => {
    setResult(data);  // Zapisanie wyniku w stanie
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Curvature Calcutator</h1>
      {/* MetricInputForm to formularz – gdy otrzyma wyniki, wywoła handleResult */}
      <MetricInputForm onResult={handleResult} />
      {/* Jeśli result !== null, wyświetlamy MetricOutputForm, przekazując result */}
      {result && <MetricOutputForm result={result} />}
    </div>
  );
};

export default Calculator;
