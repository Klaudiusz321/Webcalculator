import React, { useState, useEffect } from "react";
import MetricInputForm, { MetricData } from "../components/MetricInputForm";
import MetricOutputForm from "../components/MetricOutputForm";
import SampleMetrics from "../components/SampleMetrics";
import Header from "./header";
import DataImport from "../components/DataImport";
import { Helmet } from 'react-helmet-async';

const Calculator: React.FC = () => {
  const [result, setResult] = useState<MetricData | null>(null);

  useEffect(() => {
    // Dodaj skrypt Google AdSense
    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6565480842270630";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, []);

  const handleResult = (data: MetricData) => {
    setResult(data);
  };

  return (
    <div className="min-h-screen p-4">
      <Helmet>
        <title>Tensor Calculator</title>
        <meta name="description" content="Calculate tensor operations online" />
      </Helmet>

      <Header />
      <section style={inputSectionStyle}>
        <div style={importSectionStyle}>
          <DataImport />
        </div>
        <MetricInputForm onResult={handleResult} />
      </section>
      {result && <MetricOutputForm result={result} />}
      <hr className="my-8" />
      <SampleMetrics />

      {/* Kontener na reklamę */}
      <div style={{ 
        margin: '20px auto',
        textAlign: 'center',
        maxWidth: '100%',
        overflow: 'hidden'
      }}>
        <ins className="adsbygoogle"
          style={{
            display: 'block',
            textAlign: 'center',
          }}
          data-ad-client="ca-pub-6565480842270630"
          data-ad-slot="twój-slot-id"
          data-ad-format="auto"
          data-full-width-responsive="true">
        </ins>
      </div>
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
