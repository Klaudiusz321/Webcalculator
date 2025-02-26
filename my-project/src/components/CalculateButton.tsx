import React, { useState } from "react";
import { MetricData } from "./MetricInputForm";
import { config } from '../utils/config';

const API_URL = config.apiUrl;
console.log('Using API URL:', API_URL);

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

      // Równoległe wywołania do obu endpointów
      const [calculateResponse, visualizeResponse] = await Promise.all([
        // Wywołanie do /api/calculate dla danych symbolicznych
        fetch('http://127.0.0.1:8000/api/calculate/', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ metric_text: input }),
        }),
        // Wywołanie do /api/visualize dla wizualizacji
        fetch('http://127.0.0.1:8000/api/visualize/', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            metric_text: input,
            ranges: [[-5, 5], [-5, 5], [-5, 5]],
            points_per_dim: 50
          }),
        })
      ]);

      const [calculateData, visualizeData] = await Promise.all([
        calculateResponse.json(),
        visualizeResponse.json()
      ]);

      if (!calculateResponse.ok || !visualizeResponse.ok) {
        throw new Error("One of the API calls failed");
      }

      // Łączymy dane z obu endpointów
      const combinedData = {
        ...calculateData,
        plot: visualizeData.plot, // Dodajemy plot z /api/visualize
        outputText: input
      };

      onCalculate(combinedData);
    } catch (error: any) {
      console.error("Calculation error:", error);
      setError(error.message || "An error occurred");
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
