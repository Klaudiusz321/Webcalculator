import React, { useState } from "react";
import CalculateButton from "./CalculateButton";

// Zaktualizowany interfejs MetricData z polem scalarCurvatureLatex
export interface MetricData {
  coordinates: string[];
  parameters: string[];
  metryka: { [key: string]: string };
  scalarCurvature: string;
  scalarCurvatureLatex: string;
  christoffelLatex: string[];
  riemannLatex: string[];
  ricciLatex: string[];
  einsteinLatex: string[];
  outputText?: string;
  plotImage?: string;
  plot?: string;
  g?: any[];
  Gamma?: any[];
  R_abcd?: any[];
  Ricci?: any[];
}

interface MetricInputFormProps {
  onResult: (result: MetricData) => void;
}

const MetricInputForm: React.FC<MetricInputFormProps> = ({ onResult }) => {
  const [inputText, setInputText] = useState<string>("");

  const filterNonZeroResults = (data: MetricData): MetricData => {
    const filterNonZero = (arr: any[] | undefined) => arr ? arr.filter(item => item !== 0) : [];
    return {
      ...data,
      g: filterNonZero(data.g),
      Gamma: filterNonZero(data.Gamma),
      R_abcd: filterNonZero(data.R_abcd),
      Ricci: filterNonZero(data.Ricci),
    };
  };

  const validateInput = (input: string): string | null => {
    if (!input.trim()) {
      return "Input cannot be empty";
    }

    const lines = input.trim().split('\n');
    if (lines.length < 2) {
      return "Input must contain at least coordinates/parameters line and one metric component";
    }

    // Sprawdź linię współrzędnych i parametrów
    const coordParamLine = lines[0].trim();
    if (!/^[a-zA-Z0-9\s,;]+$/.test(coordParamLine)) {
      return "Coordinates and parameters line can only contain letters, numbers, commas, and semicolons";
    }

    // Sprawdź komponenty metryki
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      if (!/^[0-9\s]+[-+*/().\sa-zA-Z0-9^]+$/.test(line)) {
        return `Invalid metric component format at line ${i + 1}`;
      }
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateInput(inputText);
    if (validationError) {
      console.error(validationError);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metric_text: inputText }),
      });
      
      if (response.status === 429) {
        alert("Too many requests. Please wait a minute before trying again.");
        return;
      }
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Wystąpił błąd podczas obliczeń.");
      }
      const filteredData = filterNonZeroResults(data);
      onResult(filteredData);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={10}
        style={textareaStyle}
        placeholder={`Przykład:
x, y ; a, tau, psi, theta, phi
0 0 -c**2
1 1 a(t)**2/(-k*psi**2+1)
...`}
      />
      <CalculateButton input={inputText} onCalculate={(res: MetricData) => onResult(res)} />
    </form>
  );
};

const formStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  padding: "1rem",
  boxSizing: "border-box",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  height: "200px",
  padding: "1rem",
  boxSizing: "border-box",
  resize: "none",
  fontSize: "16px",
  fontFamily: "monospace",
  marginBottom: "1rem",
};

export default MetricInputForm;
