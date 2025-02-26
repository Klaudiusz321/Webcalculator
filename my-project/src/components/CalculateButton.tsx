import React, { useState } from "react";
import { MetricData } from "./MetricInputForm";

// Pobierz URL-e z zmiennych środowiskowych
const CALCULATE_API_URL = import.meta.env.VITE_API_URL || 'https://tensor-calculator-cbcf2141c885.herokuapp.com/api/calculate';
const VISUALIZE_API_URL = import.meta.env.VITE_API_URL_VISUALIZE || 'https://tensor-calculator-cbcf2141c885.herokuapp.com/api/visualize';

console.log('Environment:', import.meta.env);
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

      // Używamy relatywnych ścieżek zamiast pełnych URL-i
      const [calculateResponse, visualizeResponse] = await Promise.all([
        fetch('/api/calculate', {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ metric_text: input }),
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
            points_per_dim: 50
          }),
        })
      ]);

      // Sprawdź status odpowiedzi
      if (!calculateResponse.ok) {
        throw new Error(`Calculate API error: ${calculateResponse.status}`);
      }
      if (!visualizeResponse.ok) {
        throw new Error(`Visualize API error: ${visualizeResponse.status}`);
      }

      // Próbuj sparsować JSON tylko jeśli odpowiedź jest ok
      const [calculateData, visualizeData] = await Promise.all([
        calculateResponse.json().catch(e => {
          console.error('Calculate JSON parse error:', e);
          throw new Error('Invalid calculate response format');
        }),
        visualizeResponse.json().catch(e => {
          console.error('Visualize JSON parse error:', e);
          throw new Error('Invalid visualize response format');
        })
      ]);

      const combinedData = {
        ...calculateData,
        plot: visualizeData.plot,
        outputText: input
      };

      onCalculate(combinedData);
    } catch (error: any) {
      console.error("Calculation error:", error);
      setError(error.message || "Server error. Please try again later.");
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
