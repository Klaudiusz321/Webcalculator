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

      const [calculateResponse, visualizeResponse] = await Promise.all([
        fetch('/api/calculate', {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ 
            metric_text: input 
          }),
        }),
        fetch('/api/visualize', {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ 
            metric_text: input,
            ranges: [[-5, 5], [-5, 5], [-5, 5]],
            points_per_dim: 50,
            coordinates: input.split('\n')[0].split(',').map(s => s.trim()),
            parameters: input.split('\n')[1].split(',').map(s => s.trim())
          }),
        })
      ]);

      if (!calculateResponse.ok) {
        throw new Error(`Calculate API error: ${calculateResponse.status}`);
      }
      if (!visualizeResponse.ok) {
        throw new Error(`Visualize API error: ${visualizeResponse.status}`);
      }

      const [calculateData, visualizeData] = await Promise.all([
        calculateResponse.json(),
        visualizeResponse.json()
      ]);

      const combinedData = {
        ...calculateData,
        plot: visualizeData.plot,
        outputText: input
      };

      onCalculate(combinedData);
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
