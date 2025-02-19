import React, { useState } from "react";
import "../styles/SampleMetrics.scss";
import { ContentCopy, Check } from "@mui/icons-material";

// Defining interface for a metric
export interface Metric {
  id: number;
  name: string;
  shortDescription: string;
  metricText: string;
  // Optional plot data as Base64
  plot?: string;
}

// Sample metrics list
export const sampleMetrics: Metric[] = [
  {
    id: 1,
    name: "Schwarzschild Vacuum Spacetime",
    shortDescription: "Standard Schwarzschild metric for spherically symmetric vacuum solution.",
    metricText: `
t, r, theta, phi;

0 0 -(1 - 2*M/r)
1 1 1/(1 - 2*M/r)
2 2 r^2
3 3 r^2*sin(theta)**2
`,
    plot: "" 
  },
  {
    id: 2,
    name: "The Three-Sphere",
    shortDescription: "Metric of a three-dimensional sphere embedded in 4D space.",
    metricText: `
theta, phi, psi; a

0 0 a**2*sin(psi)**2
1 1 a**2*sin(psi)**2*sin(theta)**2
2 2 a**2
`,
    plot: ""
  },
  {
    id: 3,
    name: "Four-Dimensional de Sitter Spacetime",
    shortDescription: "De Sitter metric describing an expanding universe with positive cosmological constant.",
    metricText: `
tau, psi, theta, phi; a

0 0 -a**2
1 1 a**2*cosh(tau)**2
2 2 a**2*cosh(tau)**2*sin(psi)**2
3 3 a**2*cosh(tau)**2*sin(psi)**2*sin(theta)**2
`,
    plot: ""
  },
  {
    id: 4,
    name: "Metric Torus in Euclidean Space",
    shortDescription: "Standard metric of a torus embedded in three-dimensional Euclidean space.",
    metricText: `
theta, phi; a, b

0 0 b**2
1 1 (a + b*cos(theta))**2
`,
    plot: ""
  },
  {
    id: 5,
    name: "The Pseudosphere in Euclidean Space",
    shortDescription: "Metric of a pseudosphere - a surface of constant negative curvature.",
    metricText: `
x, y; a

0 0 x**2 * (a**2 - x**2 - y**2) / ((x**2 + y**2)**2)
0 1 x*y * (a**2 - x**2 - y**2) / ((x**2 + y**2)**2)
1 0 x*y * (a**2 - x**2 - y**2) / ((x**2 + y**2)**2)
1 1 y**2 * (a**2 - x**2 - y**2) / ((x**2 + y**2)**2)
`,
    plot: ""
  },
  {
    id: 6,
    name: "FLRW Cosmological Spacetimes",
    shortDescription: "Friedmann-Lemaître-Robertson-Walker metric for cosmological models.",
    metricText: `
t, chi, theta, phi;

0 0 -1
1 1 a(t)**2/(1 - k*chi**2)
2 2 a(t)**2*chi**2
3 3 a(t)**2*chi**2*sin(theta)**2
`,
    plot: "/Figure_1.png"
  }
];

const SampleMetrics: React.FC = () => {

    const [copied, setCopied] = useState(false);
    const [copiedMetrics, setCopiedMetrics] = useState<{ [key: string]: boolean }>({});

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedMetrics(prev => ({
                ...prev,
                [id]: true
            }));
            setTimeout(() => {
                setCopiedMetrics(prev => ({
                    ...prev,
                    [id]: false
                }));
            }, 2000);
        });
    };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Sample Metrics</h2>
      <div style={gridContainerStyle}>
        {sampleMetrics.map(metric => (
          <div key={metric.id} style={gridItemStyle} className="sample-metrics-card">
            <h3 style={headingStyle}>{metric.name}</h3>
            <p style={descriptionStyle}>{metric.shortDescription}</p>
            <pre style={codeStyle} className="sample-metrics-card__code">
              {metric.metricText}

                <button 
                className="sample-metrics-card__copy-btn" 
                onClick={()=> handleCopy(metric.metricText, metric.id.toString())}
                >
                    <span className="sample-metrics-card__copy-btn-icon">
                        {copiedMetrics[metric.id] ? <Check /> : <ContentCopy />}
                    </span>
                    {copiedMetrics[metric.id] ? ' Copied' : ' Copy'}
                </button>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "clamp(1rem, 4vw, 2rem)",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const titleStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "clamp(1.5rem, 4vw, 2rem)",
  fontSize: "clamp(1.5rem, 5vw, 2rem)",
  color: "white",
};

const gridContainerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
  gap: "clamp(1rem, 3vw, 2rem)",
  width: "100%",
  padding: "0.5rem",
  justifyItems: "center",
};

const gridItemStyle: React.CSSProperties = {
  padding: "clamp(1rem, 3vw, 1.5rem)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "8px",
  backgroundColor: "#1a1a1a",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  color: "white",
  width: "100%",
  margin: "0 auto",
  boxSizing: "border-box",
  textAlign: "center",
};

const headingStyle: React.CSSProperties = {
  fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
  marginBottom: "1rem",
  color: "white",
  fontWeight: "500",
};

const descriptionStyle: React.CSSProperties = {
  fontSize: "clamp(0.875rem, 1vw, 1rem)",
  marginBottom: "1rem",
  lineHeight: "1.5",
  color: "rgba(255, 255, 255, 0.8)",
};

const codeStyle: React.CSSProperties = {
  padding: "1rem",
  backgroundColor: "#242424",
  borderRadius: "4px",
  overflowX: "auto",
  fontFamily: "monospace",
  fontSize: "clamp(0.75rem, 1vw, 0.9rem)",
  lineHeight: "1.4",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  color: "rgba(255, 255, 255, 0.9)",
  textAlign: "left",
  margin: "0 auto",
};

export default SampleMetrics;
