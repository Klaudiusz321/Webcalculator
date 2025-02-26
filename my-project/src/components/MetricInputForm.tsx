import React, { useState } from "react";
import CalculateButton from "./CalculateButton";

export interface MetricData {
  metric: string[];
  christoffel: string[];
  riemann: string[];
  ricci: string[];
  einstein: string[];
  scalar: string[];
}

interface MetricInputFormProps {
  onResult: (result: MetricData) => void;
}

const MetricInputForm: React.FC<MetricInputFormProps> = ({ onResult }) => {
  const [inputText, setInputText] = useState<string>(
`t,chi,theta,phi
a,k
g_{00} = -1
g_{11} = a(t)^2/(1 - k*chi^2)
g_{22} = a(t)^2*chi^2
g_{33} = a(t)^2*chi^2*sin(theta)^2`);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://calculator1-fc4166db17b2.herokuapp.com/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metric_text: inputText }),
      });
      const data = await response.json();
      onResult(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={10}
        style={textareaStyle}
        placeholder={`Format:
t,chi,theta,phi
a,k
g_{00} = -1
g_{11} = a(t)^2/(1 - k*chi^2)
g_{22} = a(t)^2*chi^2
g_{33} = a(t)^2*chi^2*sin(theta)^2`}
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