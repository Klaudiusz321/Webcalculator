// src/components/CurvatureSurface.tsx
import React, { useMemo } from 'react';
import * as THREE from 'three';

export interface CurvatureData {
  points: number[][];  // np. [[x, y], ...]
  values: number[];    // np. [z1, z2, ...]
  ranges?: [number, number][];
  coordinates?: string[];
  parameters?: string[];
}

interface CurvatureSurfaceProps {
  data: CurvatureData;
}

const CurvatureSurface: React.FC<CurvatureSurfaceProps> = ({ data }) => {
  const { points, values } = data;
  if (points.length !== values.length) {
    console.error('Liczba punktów nie odpowiada liczbie wartości!');
    return null;
  }

  const geometry = useMemo(() => {
    const numPoints = points.length;
    const gridSize = Math.sqrt(numPoints);
    if (!Number.isInteger(gridSize)) {
      console.error('Punkty nie tworzą kwadratowej siatki!');
      return new THREE.BufferGeometry();
    }
    
    const vertices = new Float32Array(numPoints * 3);
    for (let i = 0; i < numPoints; i++) {
      const [x, y] = points[i];
      const z = values[i];
      vertices[i * 3] = x;
      vertices[i * 3 + 1] = z;
      vertices[i * 3 + 2] = y;
    }
    
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    const indices: number[] = [];
    for (let i = 0; i < gridSize - 1; i++) {
      for (let j = 0; j < gridSize - 1; j++) {
        const a = i * gridSize + j;
        const b = a + 1;
        const c = a + gridSize;
        const d = c + 1;
        indices.push(a, b, d);
        indices.push(a, d, c);
      }
    }
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }, [points, values]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="skyblue" wireframe={false} />
    </mesh>
  );
};

export default CurvatureSurface;
