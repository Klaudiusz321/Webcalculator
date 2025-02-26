// src/skecja/Scene.tsx
import React from 'react';
import { MetricData } from '../components/MetricInputForm';

interface SceneProps {
  metricData: MetricData;
}

const Scene: React.FC<SceneProps> = ({ metricData }) => {
  if (!metricData.plot) {
    return <div>Waiting for visualization data...</div>;
  }

  return (
    <div style={containerStyle}>
      <img 
        src={`data:image/png;base64,${metricData.plot}`}
        alt="Metric visualization"
        style={imageStyle}
      />
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
  padding: '1rem',
  backgroundColor: '#1a1a1a',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: 'auto',
  borderRadius: '4px',
};

export default Scene;
