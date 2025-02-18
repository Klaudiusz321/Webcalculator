import React, { useState } from "react";
import MetricInputForm, { MetricData } from "../components/MetricInputForm";
import MetricOutputForm from "../components/MetricOutputForm";
import SampleMetrics from "../components/SampleMetrics";
import Header from "./header";
import { HelmetProvider } from "react-helmet-async";

const CurvatureCalculator: React.FC = () => {
  const [result, setResult] = useState<MetricData | null>(null);

  const handleResult = (data: MetricData) => {
    setResult(data);
  };

  return (
    <HelmetProvider>
      <div style={containerStyle}>
        <Header />
        <main style={mainStyle}>
          <section style={inputSectionStyle}>
            <h1 style={headingStyle}>Curvature Calculator</h1>
            <MetricInputForm onResult={handleResult} />
          </section>
          {result && (
            <section style={outputSectionStyle}>
              <MetricOutputForm result={result} />
            </section>
          )}
        </main>
        <hr style={{ margin: "1rem 0" }} />
        <section style={sampleSectionStyle}>
          <SampleMetrics />
        </section>
      </div>
    </HelmetProvider>
  );
};

const containerStyle: React.CSSProperties = {
  padding: "clamp(1rem, 2vw, 2rem)",
  width: "100%",
  minHeight: "100vh",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
};

const mainStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "clamp(1rem, 3vw, 2rem)",
  width: "100%",
  maxWidth: "1400px",
  margin: "0 auto",
};

const inputSectionStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "800px",
  padding: "clamp(0.75rem, 2vw, 1.5rem)",
};

const outputSectionStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "800px",
  padding: "clamp(0.75rem, 2vw, 1.5rem)",
};

const sampleSectionStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "1200px",
  padding: "clamp(1rem, 2vw, 2rem)",
  margin: "0 auto",
};

const headingStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "clamp(1rem, 2vw, 2rem)",
  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
};

export default CurvatureCalculator;
