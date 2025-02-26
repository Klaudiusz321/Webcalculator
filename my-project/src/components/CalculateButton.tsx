import React, { useState } from "react";
import { MetricData } from "./MetricInputForm";

// Pobierz URL-e z zmiennych środowiskowych

interface CalculateButtonProps {
  input: string;
  onCalculate: (result: MetricData) => void;
}

const CalculateButton: React.FC<CalculateButtonProps> = ({ input, onCalculate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (!input.trim()) {
      setError("Please enter metric data");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Wywołaj endpoint calculate dla LaTeX
      const calculateResponse = await fetch('https://calculator1-fc4166db17b2.herokuapp.com/api/calculate', {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ metric_text: input }),
      });

      if (!calculateResponse.ok) {
        throw new Error("Calculate API call failed");
      }

      // Pobierz dane LaTeX
      const calculateData = await calculateResponse.json();

      // Przekaż dane LaTeX do wyświetlenia
      onCalculate(calculateData);

      // Wywołaj endpoint visualize dla wykresu (Scene.tsx go obsłuży)
      const visualizeResponse = await fetch('https://calculator1-fc4166db17b2.herokuapp.com/api/visualize', {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          metric_text: input,
          ranges: [[-5, 5], [-5, 5], [-5, 5]],
          points_per_dim: 50
        }),
      });

      if (!visualizeResponse.ok) {
        throw new Error("Visualize API call failed");
      }

    } catch (error: any) {
      setError("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div style={containerStyle}>
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        style={buttonStyle}
      >
        {isLoading ? "Calculating..." : "Calculate"}
      </button>
      {error && (
        <div style={errorStyle}>
          {error}
        </div>
      )}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
  width: '100%',
};

const buttonStyle: React.CSSProperties = {
  padding: "0.75rem 1.5rem",
  backgroundColor: "#2a2a2a",
  color: "white",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "1rem",
  width: "100%",
  transition: "all 0.2s ease",
  opacity: 1,
};

const errorStyle: React.CSSProperties = {
  color: "#ff6b6b",
  fontSize: "0.9rem",
  textAlign: "center",
  marginTop: "0.5rem",
};

export default CalculateButton;
