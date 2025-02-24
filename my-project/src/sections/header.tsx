import React from "react";
import { Helmet } from "react-helmet-async";
import "../styles/HeaderContainer.scss";

const headerContainerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
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
  borderRadius: "8px",
  backgroundColor: "#1a1a1a",
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
    <header className="header-container">
      {/* SEO META TAGS */}
      <Helmet>
  <title>Curvature Calculator | Tensor Calculations Online</title>
  <meta name="description" content="A powerful online tool for calculating curvature tensors, Ricci tensors, and Riemann metrics." />
  <meta name="keywords" content="curvature calculator, tensor calculator, 
  Ricci tensor, Riemann tensor, metric tensor, differential geometry, tensor 
  analysis, Christoffel symbols, Riemann curvature tensor, 
  Ricci tensor, Einstein tensor, Kretschmann scalar" />
  <meta name="author" content="Klaudiusz Sroka" />
  <meta name="robots" content="index, follow" />
  <meta name="google-adsense-account" content="ca-pub-6565480842270630" />
  <meta property="og:title" content="Curvature Calculator | ITensor Tensor Calculations Online" />
  <meta property="og:description" content="Compute curvature tensors and Riemann metrics online. Ideal for physicists, mathematicians, and researchers." />
  <meta property="og:url" content="https://itensor.online/" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://itensor.online/images/curvature-calculator.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Curvature Calculator | Tensor Computation" />
  <meta name="twitter:description" content="A powerful tool for computing curvature tensors and metrics." />
  <meta name="twitter:image" content="https://itensor.online/images/curvature-calculator.png" />
  
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Curvature Calculator",
      "url": "https://itensor.online/",
      "description": "A powerful tool for computing curvature tensors, Ricci tensors, and Riemann metrics.",
      "applicationCategory": "Calculator",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "creator": {
        "@type": "Person",
        "name": "Klaudiusz Sroka"
      }
    }
    )}
  </script>
</Helmet>


      <div style={headerContainerStyle} className="header-container__inner">
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
              "url": "https://itensor.online/",
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
            <h2 id="curvature-tensor" style={headingStyle}>
              What is a Curvature Tensor?
            </h2>
            <p style={paragraphStyle}>
              Curvature tensors are fundamental in differential geometry and general relativity. They describe the local geometry of space and how it curves in response to mass and energy.
            </p>
          </section>

          {/* How to Use the Calculator */}
          <section style={gridItemStyle} aria-labelledby="how-to-use">
            <h2 id="how-to-use" style={headingStyle}>
              How to Use the Calculator?
            </h2>
            <p style={paragraphStyle}>
              Enter your metric components in the input field below and click "Compute". The calculator will automatically generate all relevant tensor components and visualizations.
            </p>
          </section>

          {/* Supported Calculations */}
          <section style={gridItemStyle} aria-labelledby="supported-calculations">
            <h2 id="supported-calculations" style={headingStyle}>
              Supported Calculations
            </h2>
            <ul>
              <li style={listItemStyle}>Riemann Curvature Tensor</li>
              <li style={listItemStyle}>Ricci Tensor</li>
              <li style={listItemStyle}>Einstein Tensor</li>
              <li style={listItemStyle}>Kretschmann Scalar</li>
            </ul>
          </section>
        </div>
      </div>
    </header>
  );
};

export default Header;
