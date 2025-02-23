import React, { useState } from "react";
import CalculateButton from "./CalculateButton";

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
  // Dodane pola dla danych tensorowych
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://calculator1-fc4166db17b2.herokuapp.com/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metric_text: inputText }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Error");
      }
      const filteredData = filterNonZeroResults(data);
      onResult(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={10}
        style={textareaStyle}
        placeholder={`Example:
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
  backgroundColor: "#242424",
  color: "white",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "4px",
};

export default MetricInputForm;