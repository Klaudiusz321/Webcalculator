// src/skecja/Scene.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import CurvatureSurface, { CurvatureData } from '../components/CurvatureSurface';
import { MetricData } from '../components/MetricInputForm';
import { transformToCurvatureData } from '../utils/transforData';

interface SceneProps {
  metricData: MetricData;
}

const Scene: React.FC<SceneProps> = ({ metricData }) => {
  // Przekształcamy MetricData na CurvatureData
  const data: CurvatureData = transformToCurvatureData(metricData);

  return (
    <Canvas camera={{ position: [10, 10, 10], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[10, 10, 10]} />
      <CurvatureSurface data={data} />
      <gridHelper args={[20, 20]} />
      <axesHelper args={[5]} />
    </Canvas>
  );
};

export default Scene;
