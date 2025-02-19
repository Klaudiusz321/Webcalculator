import React from "react";
import LatexDisplay from "./LatexDisplay";
import { MetricData } from "./MetricInputForm";

interface MetricOutputFormProps {
  result: MetricData;
}

const MetricOutputForm: React.FC<MetricOutputFormProps> = ({ result }) => {
  if (!result) {
    return <div>No data available</div>;
  }

  return (
    <div style={containerStyle}>
      <style>{mediaStyles}</style>
      <h2 style={titleStyle}>Computation Results</h2>

      <section style={sectionStyle}>
        <h3 style={subtitleStyle}>Coordinates & Parameters</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <h4 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Coordinates</h4>
            <ul style={listStyle}>
              {result.coordinates.map((coord, index) => (
                <li key={index} className="list-item">{coord}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Parameters</h4>
            <ul style={listStyle}>
              {result.parameters.map((param, index) => (
                <li key={index} className="list-item">{param}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {result.christoffelLatex && result.christoffelLatex.length > 0 && (
        <section style={sectionStyle}>
          <h3 style={subtitleStyle}>Christoffel Symbols</h3>
          <div style={latexContainerStyle} className="latex-grid">
            {result.christoffelLatex.map((latex, index) => (
              <div key={index} style={latexItemStyle} className="latex-item">
                <LatexDisplay latexString={latex} />
              </div>
            ))}
          </div>
        </section>
      )}

      {result.riemannLatex && result.riemannLatex.length > 0 && (
        <section style={sectionStyle}>
          <h3 style={subtitleStyle}>Riemann Tensor</h3>
          <div style={latexContainerStyle} className="latex-grid">
            {result.riemannLatex.map((latex, index) => (
              <div key={index} style={latexItemStyle} className="latex-item">
                <LatexDisplay latexString={latex} />
              </div>
            ))}
          </div>
        </section>
      )}

      {result.ricciLatex && result.ricciLatex.length > 0 && (
        <section style={sectionStyle}>
          <h3 style={subtitleStyle}>Ricci Tensor</h3>
          <div style={latexContainerStyle} className="latex-grid">
            {result.ricciLatex.map((latex, index) => (
              <div key={index} style={latexItemStyle} className="latex-item">
                <LatexDisplay latexString={latex} />
              </div>
            ))}
          </div>
        </section>
      )}

      {result.einsteinLatex && result.einsteinLatex.length > 0 && (
        <section style={sectionStyle}>
          <h3 style={subtitleStyle}>Einstein Tensor</h3>
          <div style={latexContainerStyle} className="latex-grid">
            {result.einsteinLatex.map((latex, index) => (
              <div key={index} style={latexItemStyle} className="latex-item">
                <LatexDisplay latexString={latex} />
              </div>
            ))}
          </div>
        </section>
      )}

      {result.scalarCurvatureLatex && (
        <section style={sectionStyle}>
          <h3 style={subtitleStyle}>Scalar Curvature</h3>
          <div style={latexItemStyle} className="latex-item">
            <LatexDisplay latexString={result.scalarCurvatureLatex} />
          </div>
        </section>
      )}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  padding: "clamp(1rem, 4vw, 2rem)",
  maxWidth: "1400px",
  margin: "0 auto",
};

const titleStyle: React.CSSProperties = {
  fontSize: "clamp(1.5rem, 5vw, 2rem)",
  marginBottom: "clamp(1rem, 4vw, 2rem)",
  textAlign: "center",
};

const sectionStyle: React.CSSProperties = {
  marginBottom: "clamp(1rem, 4vw, 2rem)",
  padding: "clamp(1rem, 3vw, 1.5rem)",
  borderRadius: "8px",
  backgroundColor: "#1a1a1a",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
  marginBottom: "clamp(0.75rem, 3vw, 1.5rem)",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  paddingBottom: "0.5rem",
  textAlign: "center",
};

const listStyle: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: "0 auto",
  maxWidth: "100%",
  textAlign: "center",
};

const latexContainerStyle: React.CSSProperties = {
  display: "grid",
  gap: "clamp(0.5rem, 2vw, 1rem)",
  gridTemplateColumns: "repeat(2, 1fr)",
  width: "100%",
  maxWidth: "100%",
  margin: "0 auto",
};

const mediaStyles = `
  @media (max-width: 768px) {
    .latex-grid {
      grid-template-columns: 1fr !important;
      padding: 0 !important;
    }
    
    .latex-item {
      font-size: 14px !important;
      padding: 0.75rem !important;
      margin: 0 auto !important;
      max-width: 100% !important;
      overflow-x: auto !important;
    }
    
    li {
      font-size: 14px;
      margin-bottom: 0.5rem;
    }
    
    .katex {
      font-size: 1.1em !important;
    }
  }
`;

const latexItemStyle: React.CSSProperties = {
  padding: "clamp(0.75rem, 2vw, 1rem)",
  borderRadius: "4px",
  backgroundColor: "#242424",
  overflowX: "auto",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  transition: "background-color 0.2s ease",
  cursor: "pointer",
  margin: "0 auto",
  width: "100%",
  boxSizing: "border-box",
};

export default MetricOutputForm;
