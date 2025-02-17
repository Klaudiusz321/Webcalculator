import React from "react";
import LatexDisplay from "./LatexDisplay"; // upewnij się, że ścieżka jest poprawna
import { MetricData } from "./MetricInputForm";


interface MetricOutputFormProps {
  result: MetricData;
}

const MetricOutputForm: React.FC<MetricOutputFormProps> = ({ result }) => {
  if (!result) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h2>Wyniki obliczeń</h2>
      <div>
        <h3>Coordinates</h3>
        <ul>
          {result.coordinates.map((coord, index) => (
            <li key={index}>{coord}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Parameters</h3>
        <ul>
          {result.parameters.map((param, index) => (
            <li key={index}>{param}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Metryka</h3>
        <ul>
          {Object.entries(result.metryka).map(([key, value], index) => (
            <li key={index}>{`${key}: ${value}`}</li>
          ))}
        </ul>
      </div>
      
      {result.g && (
        <div>
          <h3>Metric Tensor (g)</h3>
          <p>{result.g}</p>
        </div>
      )}
      {result.Gamma && (
        <div>
          <h3>Christoffel Symbols (Gamma)</h3>
          <p>{result.Gamma}</p>
        </div>
      )}
      {result.R_abcd && (
        <div>
          <h3>Riemann Tensor (R_abcd)</h3>
          <p>{result.R_abcd}</p>
        </div>
      )}
      {result.Ricci && (
        <div>
          <h3>Ricci Tensor</h3>
          <p>{result.Ricci}</p>
        </div>
      )}
      

     
      {result.scalarCurvatureLatex && (
        <div>
          <h3>Scalar Curvature (LaTeX)</h3>
          <LatexDisplay latexString={result.scalarCurvatureLatex} />
        </div>
      )}
    </div>
  );
};

export default MetricOutputForm;
