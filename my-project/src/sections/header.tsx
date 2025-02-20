import React from "react";
import { Helmet } from "react-helmet-async";

const headerContainerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "clamp(1rem, 4vw, 2rem)",
  boxSizing: "border-box",
};

const titleStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "clamp(0.5rem, 3vw, 1rem)",
  fontSize: "clamp(1.5rem, 5vw, 2rem)",
};

const subtitleStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "clamp(1rem, 4vw, 2rem)",
  fontSize: "clamp(1rem, 3vw, 1.2rem)",
  maxWidth: "800px",
  margin: "0 auto 2rem",
};

const gridContainerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
  gap: "clamp(1rem, 3vw, 2rem)",
  width: "100%",
  padding: "0.5rem",
};

const gridItemStyle: React.CSSProperties = {
  padding: "clamp(1rem, 3vw, 1.5rem)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "8px",
  backgroundColor: "#1a1a1a",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  color: "white",
  maxWidth: "100%",
  margin: "0 auto",
  boxSizing: "border-box",
};

const headingStyle: React.CSSProperties = {
  color: "white",
  marginBottom: "1rem",
  fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
};

const listItemStyle: React.CSSProperties = {
  color: "white",
  marginBottom: "0.5rem",
  fontSize: "clamp(0.9rem, 3vw, 1rem)",
};

const paragraphStyle: React.CSSProperties = {
  fontSize: "clamp(0.9rem, 3vw, 1rem)",
  lineHeight: "1.5",
  margin: "0 0 1rem 0",
};

const Header: React.FC = () => {
  return (
    <header style={headerContainerStyle}>
      {/* SEO META TAGS */}
      <Helmet>
        <title>Curvature Calculator - Tensor Metric Computation</title>
        <meta name="description" content="Calculate curvature tensors and metrics with precision. Designed for physicists, students, and researchers in differential geometry." />
        <meta name="keywords" content="curvature calculator, tensor metrics, Riemann tensor, Ricci tensor, Einstein equations, differential geometry, physics calculator" />
        <meta property="og:title" content="Curvature Calculator - Tensor Metric Computation" />
        <meta property="og:description" content="Compute curvature tensors and metrics using advanced tensor mathematics. Ideal for physicists and students." />
        <meta property="og:image" content="https://example.com/curvature-calculator.jpg" />
        <meta property="og:url" content="https://example.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Curvature Calculator - Tensor Metric Computation" />
        <meta name="twitter:description" content="A powerful tool for computing curvature tensors and metrics in physics." />
      </Helmet>

      {/* MAIN HEADING */}
      <h1 style={titleStyle}>Curvature Calculator</h1>
      <p style={subtitleStyle}>
        Compute tensor metrics with precision. Designed for physicists, students, and researchers in differential geometry.
      </p>

      {/* SEO STRUCTURED DATA (JSON-LD) */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Curvature Calculator",
            "url": "https://example.com",
            "description": "A powerful tool for computing curvature tensors and metrics.",
            "applicationCategory": "Science",
            "creator": {
              "@type": "Person",
              "name": "Klaudiusz Sroka"
            }
          })}
        </script>
      </Helmet>

      {/* CONTENT SECTIONS */}
      <div style={gridContainerStyle}>
        
        {/* What is a Curvature Tensor */}
        <section style={gridItemStyle} aria-labelledby="curvature-tensor">
          <h2 id="curvature-tensor" style={headingStyle}>What is a Curvature Tensor?</h2>
          <p style={paragraphStyle}>
            Curvature tensors are fundamental in differential geometry and general relativity. They describe the local geometry of space and how it curves in response to mass and energy.
          </p>
        </section>

        {/* How to Use the Calculator */}
        <section style={gridItemStyle} aria-labelledby="how-to-use">
          <h2 id="how-to-use" style={headingStyle}>How to Use the Calculator?</h2>
          <p style={paragraphStyle}>
            Enter your metric components in the input field below and click "Compute". The calculator will automatically generate all relevant tensor components and visualizations.
          </p>
        </section>

        {/* Supported Calculations */}
        <section style={gridItemStyle} aria-labelledby="supported-calculations">
          <h2 id="supported-calculations" style={headingStyle}>Supported Calculations</h2>
          <ul>
            <li style={listItemStyle}>Riemann Curvature Tensor</li>
            <li style={listItemStyle}>Ricci Tensor</li>
            <li style={listItemStyle}>Einstein Tensor</li>
            <li style={listItemStyle}>Kretschmann Scalar</li>
          </ul>
        </section>

      </div>
    </header>
  );
};

export default Header;