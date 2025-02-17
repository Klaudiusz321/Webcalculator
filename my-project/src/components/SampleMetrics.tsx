import React from "react";

// Definiujemy interfejs dla metryki
export interface Metric {
  id: number;
  name: string;
  shortDescription: string;
  metricText: string;
  // Jeśli masz już pre-generowane wykresy jako Base64, możesz dodać:
  plot?: string;
}

// Przykładowa lista metryk
export const sampleMetrics: Metric[] = [
  {
    id: 1,
    name: "Schwarzschild Vacuum Spacetime",
    shortDescription: "Standardowa metryka Schwarzschilda.",
    metricText: `
t, r, theta, phi;

0 0 -(1 - 2*M/r)
1 1 1/(1 - 2*M/r)
2 2 r^2
3 3 r^2*sin(theta)**2
`,
    // Możesz wstawić tutaj wygenerowany Base64 obraz (jeśli masz) lub zostawić puste
    plot: "" 
  },
  {
    id: 2,
    name: "The Three-Sphere",
    shortDescription: "Metryka sfery trójwymiarowej.",
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
    shortDescription: "Metryka de Sitter 4D.",
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
    shortDescription: "Metryka torusa w przestrzeni euklidesowej.",
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
    shortDescription: "Pseudosfera – powierzchnia o ujemnej krzywiźnie.",
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
    shortDescription: "Metryki FLRW dla kosmologii.",
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
  return (
    <div>
      <h2>Przykładowe Metryki</h2>
      <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem"
        }}>
        {sampleMetrics.map(metric => (
          <div key={metric.id} style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "4px",
              backgroundColor: "#1a1a1a"
            }}>
            <h3>{metric.name}</h3>
            <p>{metric.shortDescription}</p>
            <pre style={{ padding: "0.5rem", overflowX: "auto" }}>
              {metric.metricText}
            </pre>
            {/* Jeśli pole "plot" zawiera wygenerowany Base64 obraz, wyświetl go: */}
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default SampleMetrics;
