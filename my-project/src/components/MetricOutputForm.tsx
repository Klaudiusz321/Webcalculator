import React from "react";
import LatexDisplay from "./LatexDisplay";

interface MetricOutputFormProps {
  result: {
    coordinates: string[];
    parameters: string[];
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
    return <div style={sectionStyle}>Brak dostępnych danych</div>;
  }

  return (
    <div style={containerStyle}>
      {/* Współrzędne i Parametry */}
      <section style={sectionStyle}>
        <h3 style={titleStyle}>Współrzędne i Parametry</h3>
        <div style={latexContainerStyle}>
          <div style={latexItemStyle}>
            <strong>Współrzędne:</strong> {result.coordinates.join(", ")}
          </div>
          {result.parameters.length > 0 && (
            <div style={latexItemStyle}>
              <strong>Parametry:</strong> {result.parameters.join(", ")}
            </div>
          )}
        </div>
      </section>

      {/* Komponenty Metryki */}
      <section style={sectionStyle}>
        <h3 style={titleStyle}>Komponenty Metryki</h3>
        <div style={latexContainerStyle}>
          {result.metric?.map((latex, index) => (
            <div key={`metric-${index}`} style={latexItemStyle}>
              <LatexDisplay latexString={latex} />
            </div>
          ))}
        </div>
      </section>

      {/* Symbole Christoffela */}
      <section style={sectionStyle}>
        <h3 style={titleStyle}>Symbole Christoffela</h3>
        <div style={latexContainerStyle}>
          {result.christoffel?.map((latex, index) => (
            <div key={`christoffel-${index}`} style={latexItemStyle}>
              <LatexDisplay latexString={latex} />
            </div>
          ))}
        </div>
      </section>

      {/* Tensor Riemanna */}
      <section style={sectionStyle}>
        <h3 style={titleStyle}>Tensor Riemanna</h3>
        <div style={latexContainerStyle}>
          {result.riemann?.map((latex, index) => (
            <div key={`riemann-${index}`} style={latexItemStyle}>
              <LatexDisplay latexString={latex} />
            </div>
          ))}
        </div>
      </section>

      {/* Tensor Ricciego */}
      <section style={sectionStyle}>
        <h3 style={titleStyle}>Tensor Ricciego</h3>
        <div style={latexContainerStyle}>
          {result.ricci?.map((latex, index) => (
            <div key={`ricci-${index}`} style={latexItemStyle}>
              <LatexDisplay latexString={latex} />
            </div>
          ))}
        </div>
      </section>

      {/* Tensor Einsteina */}
      <section style={sectionStyle}>
        <h3 style={titleStyle}>Tensor Einsteina</h3>
        <div style={latexContainerStyle}>
          {result.einstein?.map((latex, index) => (
            <div key={`einstein-${index}`} style={latexItemStyle}>
              <LatexDisplay latexString={latex} />
            </div>
          ))}
        </div>
      </section>

      {/* Krzywizna Skalarna */}
      <section style={sectionStyle}>
        <h3 style={titleStyle}>Krzywizna Skalarna</h3>
        <div style={latexContainerStyle}>
          {result.scalar?.map((latex, index) => (
            <div key={`scalar-${index}`} style={latexItemStyle}>
              <LatexDisplay latexString={latex} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  padding: "1rem",
  maxWidth: "1400px",
  margin: "0 auto",
  backgroundColor: "#1a1a1a",
  borderRadius: "8px",
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  marginBottom: "1rem",
  color: "white",
  textAlign: "center",
};

const sectionStyle: React.CSSProperties = {
  marginBottom: "2rem",
  padding: "1rem",
  borderRadius: "8px",
  backgroundColor: "#242424",
  border: "1px solid rgba(255, 255, 255, 0.1)",
};

const latexContainerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "1rem",
  padding: "1rem",
};

const latexItemStyle: React.CSSProperties = {
  padding: "1rem",
  backgroundColor: "#2a2a2a",
  borderRadius: "4px",
  color: "white",
  fontSize: "0.9rem",
  overflow: "auto",
};

export default MetricOutputForm;
