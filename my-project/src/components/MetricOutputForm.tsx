import React from "react";
import LatexDisplay from "./LatexDisplay";

interface MetricOutputFormProps {
  result: {
    metric: string[];
    christoffel: string[];
    riemann: string[];
    ricci: string[];
    einstein: string[];
    scalar: string[];
  };
}

const MetricOutputForm: React.FC<MetricOutputFormProps> = ({ result }) => {
  if (!result) {
    return <div style={sectionStyle}>No data available</div>;
  }

  return (
    <div style={containerStyle}>
      {/* Metryka */}
      <section style={sectionStyle}>
        <h3 style={titleStyle}>Metric Components</h3>
        <div style={latexContainerStyle}>
          {result.metric?.map((latex, index) => (
            <div key={index} style={latexItemStyle}>
              <LatexDisplay latexString={latex} />
            </div>
          ))}
        </div>
      </section>

      {/* Symbole Christoffela */}
      <section style={sectionStyle}>
        <h3 style={titleStyle}>Christoffel Symbols</h3>
        <div style={latexContainerStyle}>
          {result.christoffel?.map((latex, index) => (
            <div key={index} style={latexItemStyle}>
              <LatexDisplay latexString={latex} />
            </div>
          ))}
        </div>
      </section>

      {/* Tensor Riemanna */}
      <section style={sectionStyle}>
        <h3 style={titleStyle}>Riemann Tensor</h3>
        <div style={latexContainerStyle}>
          {result.riemann?.map((latex, index) => (
            <div key={index} style={latexItemStyle}>
              <LatexDisplay latexString={latex} />
            </div>
          ))}
        </div>
      </section>

      {/* Tensor Ricciego */}
      <section style={sectionStyle}>
        <h3 style={titleStyle}>Ricci Tensor</h3>
        <div style={latexContainerStyle}>
          {result.ricci?.map((latex, index) => (
            <div key={index} style={latexItemStyle}>
              <LatexDisplay latexString={latex} />
            </div>
          ))}
        </div>
      </section>

      {/* Tensor Einsteina */}
      <section style={sectionStyle}>
        <h3 style={titleStyle}>Einstein Tensor</h3>
        <div style={latexContainerStyle}>
          {result.einstein?.map((latex, index) => (
            <div key={index} style={latexItemStyle}>
              <LatexDisplay latexString={latex} />
            </div>
          ))}
        </div>
      </section>

      {/* Krzywizna skalarna */}
      <section style={sectionStyle}>
        <h3 style={titleStyle}>Scalar Curvature</h3>
        <div style={latexContainerStyle}>
          {result.scalar?.map((latex, index) => (
            <div key={index} style={latexItemStyle}>
              <LatexDisplay latexString={latex} />
            </div>
          ))}
        </div>
      </section>
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
