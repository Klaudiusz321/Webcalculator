import React, { useState } from "react";

interface CalculateButtonProps {
  input: string;
  onCalculate: (result: any) => void;
}

const CalculateButton: React.FC<CalculateButtonProps> = ({ input, onCalculate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("http://127.0.0.1:8000//api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          metric_text: input 
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || "Błąd obliczeń");
      }
      
      onCalculate(data);
    } catch (error: any) {
      console.error("Calculation error:", error);
      setError(error.message);
      // Przekazujemy pusty obiekt z podstawowymi polami zamiast null
      onCalculate({
        coordinates: [],
        parameters: [],
        metryka: {},
        g: [],
        Gamma: [],
        R_abcd: [],
        Ricci: [],
        scalarCurvature: "",
        outputText: `Error: ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        style={{ 
          padding: "0.5rem 1rem", 
          marginTop: "1rem",
          opacity: isLoading ? 0.7 : 1 
        }}
      >
        {isLoading ? "Calculating..." : "Calculate"}
      </button>
      {error && (
        <div style={{ color: "red", marginTop: "0.5rem" }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default CalculateButton;
