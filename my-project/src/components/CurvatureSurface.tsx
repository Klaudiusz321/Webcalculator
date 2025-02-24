// src/components/CurvatureSurface.tsx
import React, { useMemo } from 'react';
import * as THREE from 'three';
import Delaunator from 'delaunator';

export interface CurvatureData {
  points: number[][];
  values: number[];
  ranges: [number, number][];
  metadata: {
    dimensions: number;
    coordinates: string[];
    parameters: string[];
    num_points: number;
    value_range: [number, number];
  };
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
    const vertices = new Float32Array(points.length * 3);
    
    // Przygotuj punkty 2D do triangulacji
    const points2D = points.map(p => [p[0], p[1]]);
    
    // Stwórz vertices
    for (let i = 0; i < points.length; i++) {
      vertices[i * 3] = points[i][0];     // x
      vertices[i * 3 + 1] = values[i];    // wysokość z krzywizny
      vertices[i * 3 + 2] = points[i][1];  // y
    }
    
    // Wykonaj triangulację Delaunay
    const delaunay = new Delaunator(points2D.flat());
    const indices = Array.from(delaunay.triangles);

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    
    return geom;
  }, [points, values]);

  return (
    <mesh geometry={geometry}>
      <meshPhongMaterial 
        color="skyblue" 
        wireframe={false}
        side={THREE.DoubleSide}
        shininess={60}
      />
    </mesh>
  );
};

export default CurvatureSurface;
