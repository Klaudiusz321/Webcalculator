import React, { useState } from "react";
import CalculateButton from "./CalculateButton";

// Zaktualizowany interfejs MetricData z polem scalarCurvatureLatex
export interface MetricData {
  coordinates: string[];
  parameters: string[];
  metryka: { [key: string]: string };
  g: any[];
  Gamma: any[];
  R_abcd: any[];
  Ricci: any[];
  scalarCurvature: string;
  scalarCurvatureLatex: string;  // Nowe pole do przechowywania LaTeX-a
  outputText?: string;
  plotImage?: string;
  plot?: string; 
}

interface MetricInputFormProps {
  onResult: (result: MetricData) => void;
}

const MetricInputForm: React.FC<MetricInputFormProps> = ({ onResult }) => {
  const [inputText, setInputText] = useState<string>("");

  const filterNonZeroResults = (data: MetricData): MetricData => {
    const filterNonZero = (arr: any[]) => arr.filter(item => item !== 0);
    return {
      ...data,
      g: filterNonZero(data.g),
      Gamma: filterNonZero(data.Gamma),
      R_abcd: filterNonZero(data.R_abcd),
      Ricci: filterNonZero(data.Ricci),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metric_text: inputText }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Wystąpił błąd podczas obliczeń.");
      }
      const filteredData = filterNonZeroResults(data);
      onResult(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={10}
        style={{ width: "100%", padding: "0.5rem" }}
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

export default MetricInputForm;
