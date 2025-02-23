// src/utils/transformData.ts
import { MetricData } from '../components/MetricInputForm';
import { CurvatureData } from '../components/CurvatureSurface';

export function transformToCurvatureData(metric: MetricData): CurvatureData {
  const gridSize = 20; // Przykładowa liczba punktów w każdym wymiarze
  const points: number[][] = [];
  const values: number[] = [];
  
  // Generujemy regularną siatkę w zakresie -10 do 10
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const x = (i / (gridSize - 1)) * 20 - 10;
      const y = (j / (gridSize - 1)) * 20 - 10;
      points.push([x, y]);
      // Przykładowa funkcja wyznaczająca wartość z na podstawie x, y
      // Możesz tutaj wykorzystać metric.scalarCurvature lub inną logikę obliczeniową
      const z = Math.sin(x) * Math.cos(y); 
      values.push(z);
    }
  }
  
  return {
    points,
    values,
    ranges: [[-10, 10], [-10, 10]],
    coordinates: metric.coordinates,
    parameters: metric.parameters,
  };
}
