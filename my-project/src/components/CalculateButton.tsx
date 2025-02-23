import React, { useState } from "react";
import { MetricData } from "./MetricInputForm";
import { config } from '../utils/config';

const API_URL = config.apiUrl;
console.log('Using API URL:', API_URL);

interface CalculateButtonProps {
  input: string;
  onCalculate: (result: MetricData) => void;
}

interface BackendResponse {
  metric: string[];
  christoffel: string[];
  riemann: string[];
  ricci: string[];
  einstein: string[];
  scalar: string[];
  success: boolean;
  error?: string;
  detail?: string;
}

const CalculateButton: React.FC<CalculateButtonProps> = ({ input, onCalculate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cleanLatex = (latex: string): string => {
    // Usuń znaczniki \( i \) oraz dodatkowe znaki ucieczki
    return latex
      .replace(/\\+\(/g, '')
      .replace(/\\+\)/g, '')
      .replace(/g_\{(\d+)(\d+)\} = /, '') // Usuń prefiks metryki
      .replace(/.*?= /, ''); // Usuń część przed znakiem równości
  };

  const safeMap = (arr: string[] | undefined, fn: (item: string) => string): string[] => {
    return Array.isArray(arr) ? arr.map(fn) : [];
  };

  const convertToMetricData = (response: BackendResponse): MetricData => {
    // Wyodrębnij współrzędne i parametry z pierwszej linii metryki
    const coordinates = ['t', 'r', 'theta', 'phi']; // Przykładowe wartości - zaktualizuj zgodnie z danymi
    const parameters = ['a']; // Przykładowe wartości - zaktualizuj zgodnie z danymi

    // Konwertuj metrykę do obiektu
    const metryka: { [key: string]: string } = {};
    response.metric?.forEach(metric => {
      const match = metric.match(/g_\{(\d+)(\d+)\} = (.+)/);
      if (match) {
        const [_, i, j, value] = match;
        metryka[`${i}${j}`] = cleanLatex(value);
      }
    });

    return {
      coordinates,
      parameters,
      metryka,
      scalarCurvature: response.scalar?.[0] ? cleanLatex(response.scalar[0]) : "",
      scalarCurvatureLatex: response.scalar?.[0] ? cleanLatex(response.scalar[0]) : "",
      christoffelLatex: safeMap(response.christoffel, cleanLatex),
      riemannLatex: safeMap(response.riemann, cleanLatex),
      ricciLatex: safeMap(response.ricci, cleanLatex),
      einsteinLatex: safeMap(response.einstein, cleanLatex),
    };
  };

  const handleClick = async () => {
    if (!input.trim()) {
      setError("Please enter metric data");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const requestBody = { metric_text: input };
      console.log('API URL:', API_URL);
      console.log('Request body:', requestBody);
      console.log('Request headers:', {
        "Content-Type": "application/json",
        "Accept": "application/json",
      });

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        console.error('Full response:', response);
        throw new Error(`HTTP error! status: ${response.status}, URL: ${API_URL}`);
      }
      
      const data: BackendResponse = await response.json();
      console.log('Response data:', data);
      
      if (data.success) {
        const metricData = convertToMetricData(data);
        onCalculate(metricData);
      } else {
        throw new Error(data.error || data.detail || "Invalid response format");
      }
    } catch (error: any) {
      console.error("Calculation error details:", error);
      setError(error.message || "Wystąpił nieznany błąd");
      onCalculate({
        coordinates: [],
        parameters: [],
        metryka: {},
        scalarCurvature: "",
        scalarCurvatureLatex: "",
        christoffelLatex: [],
        riemannLatex: [],
        ricciLatex: [],
        einsteinLatex: [],
        outputText: `Error: ${error.message}`,
      });
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
