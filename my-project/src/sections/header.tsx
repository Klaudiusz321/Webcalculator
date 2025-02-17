import { Helmet } from "react-helmet-async";

const headerContainerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "2rem",
  boxSizing: "border-box",
};

const headingStyle: React.CSSProperties = {
  color: "white",
  marginBottom: "1rem",
};

const listItemStyle: React.CSSProperties = {
  color: "white",
  marginBottom: "0.5rem",
};

const Header: React.FC = () => {
  return (
    <>
      <Helmet>
        {/* meta tagi */}
      </Helmet>
      
      <div style={headerContainerStyle}>
        <h1 style={titleStyle}>Curvature Calculator</h1>
        <p style={subtitleStyle}>
          Compute tensor metrics with precision. Designed for physicists, students, and researchers in differential geometry.
        </p>
        
        <div style={gridContainerStyle}>
          <div style={gridItemStyle}>
            <h2 style={headingStyle}>What is a Curvature Tensor?</h2>
            <p>Curvature tensors are fundamental in differential geometry and general relativity. They describe the local geometry of space and how it curves in response to mass and energy.</p>
          </div>
          
          <div style={gridItemStyle}>
            <h2 style={headingStyle}>How to Use the Calculator?</h2>
            <p>Enter your metric components in the input field below and click "Compute". The calculator will automatically generate all relevant tensor components and visualizations.</p>
          </div>
          
          <div style={gridItemStyle}>
            <h2 style={headingStyle}>Supported Calculations</h2>
            <ul>
              <li style={listItemStyle}>Riemann Curvature Tensor</li>
              <li style={listItemStyle}>Ricci Tensor</li>
              <li style={listItemStyle}>Einstein Tensor</li>
              <li style={listItemStyle}>Kretschmann Scalar</li>
            </ul>
          </div>
          
          <div style={gridItemStyle}>
            <h2 style={headingStyle}>Applications</h2>
            <p>Essential for research in:</p>
            <ul>
              <li style={listItemStyle}>General Relativity</li>
              <li style={listItemStyle}>Differential Geometry</li>
              <li style={listItemStyle}>Gravitational Physics</li>
              <li style={listItemStyle}>Mathematical Physics</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

const titleStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "0.5rem",
};

const subtitleStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "2rem",
};

const gridContainerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "2rem",
  width: "100%",
  padding: "1rem",
};

const gridItemStyle: React.CSSProperties = {
  padding: "1.5rem",
  border: "1px solid white",
  borderRadius: "8px",
  backgroundColor: "#1a1a1a", // matching dark background
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  color: "white", // white text color
};

export default Header;

