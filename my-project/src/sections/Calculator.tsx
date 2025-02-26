import React, { useState } from "react";
import MetricInputForm, { MetricData } from "../components/MetricInputForm";
import MetricOutputForm from "../components/MetricOutputForm";
import SampleMetrics from "../components/SampleMetrics";
import Header from "./header";
import DataImport from "../components/DataImport";

import Scene from "./Scene";


const Calculator: React.FC = () => {
  const [result, setResult] = useState<MetricData | null>(null);

  const handleResult = (data: MetricData) => {
    setResult(data);
  };

  // Przygotuj dane dla CurvatureSurface


  return (
    <div className="min-h-screen p-4">
      

      <Header />
      <section style={inputSectionStyle}>
        <div style={importSectionStyle}>
          <DataImport />
        </div>
        <MetricInputForm onResult={handleResult} />
      </section>
      
      {/* Reklama AdSense */}
      <ins 
        className="adsbygoogle"
        style={{
          display: "block",
          textAlign: "center",
          margin: "20px 0"
        }}
        data-ad-client="pub-6565480842270630"
        data-ad-slot="5735748263"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      
      {result && <MetricOutputForm result={result} />}
      <hr className="my-8" />
      {result ? <Scene metricData={result} /> : <div>Ładowanie danych...</div>}



      <SampleMetrics />
    </div>
  );
};

const importSectionStyle: React.CSSProperties = {
  width: "100%",
  marginBottom: "2rem",
  padding: "1.5rem",
  backgroundColor: "#1a1a1a",
  borderRadius: "8px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxSizing: "border-box",
};

const inputSectionStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "800px",
  margin: "0 auto",
  padding: "1rem",
};

export default Calculator;
