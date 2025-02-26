import React, { useState } from "react";
import { MetricData } from "./MetricInputForm";

// Pobierz URL-e z zmiennych środowiskowych
const CALCULATE_API_URL = import.meta.env.VITE_API_URL;
const VISUALIZE_API_URL = import.meta.env.VITE_API_URL_VISUALIZE;

// Dodaj logowanie URL-i
console.log('API URLs:', {
  calculate: CALCULATE_API_URL,
  visualize: VISUALIZE_API_URL
});

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

      console.log('Sending requests to:', {
        calculate: CALCULATE_API_URL,
        visualize: VISUALIZE_API_URL
      });

      const [calculateResponse, visualizeResponse] = await Promise.all([
        fetch(CALCULATE_API_URL, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({ metric_text: input }),
        }),
        fetch(VISUALIZE_API_URL, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({ 
            metric_text: input,
            ranges: [[-5, 5], [-5, 5], [-5, 5]],
            points_per_dim: 50
          }),
        })
      ]);

      console.log('Responses received:', {
        calculate: calculateResponse.status,
        visualize: visualizeResponse.status
      });

      const [calculateData, visualizeData] = await Promise.all([
        calculateResponse.json(),
        visualizeResponse.json()
      ]);

      if (!calculateResponse.ok || !visualizeResponse.ok) {
        throw new Error(`API calls failed: Calculate (${calculateResponse.status}), Visualize (${visualizeResponse.status})`);
      }

      console.log('Data received:', {
        calculate: calculateData,
        visualize: visualizeData
      });

      const combinedData = {
        ...calculateData,
        plot: visualizeData.plot,
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
