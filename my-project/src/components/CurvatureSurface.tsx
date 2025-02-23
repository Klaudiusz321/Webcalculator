import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CurvatureSurfaceProps {
  amplitude?: number;
  frequency?: number;
  size?: number;
  segments?: number;
}

const CurvatureSurfaceComponent: React.FC<CurvatureSurfaceProps> = ({ amplitude = 1, frequency = 1, size = 10, segments = 100 }) => {
  const meshRef = useRef<THREE.Mesh | null>(null);

  // Tworzymy geometrię płaszczyzny tylko raz, chyba że zmienią się parametry
  const geometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(size, size, segments, segments);
    // Obracamy płaszczyznę, by była pozioma (obrót o -90° wokół osi X)
    geom.rotateX(-Math.PI / 2);
    return geom;
  }, [size, segments]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const positionAttribute = meshRef.current.geometry?.attributes.position;

    if (!positionAttribute) return;

    // Przetwarzamy każdy wierzchołek geometrii
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const z = positionAttribute.getZ(i);
      // Funkcja przemieszczenia – możesz ją modyfikować według potrzeb (np. na podstawie danych z backendu)
      const displacement = amplitude * Math.sin(frequency * Math.sqrt(x * x + z * z) - time);
      positionAttribute.setY(i, displacement);
    }
    positionAttribute.needsUpdate = true;
    // Aktualizacja normalnych, aby oświetlenie poprawnie padało na zdeformowaną powierzchnię
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <>
      <mesh ref={meshRef}>
        <planeGeometry args={[size, size, segments, segments]} />
        <meshStandardMaterial color="skyblue" side={THREE.DoubleSide} />
      </mesh>
      {/* Dodajemy podstawową czerwoną kulę */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
};

const CurvatureSurface: React.FC<CurvatureSurfaceProps> = (props) => {
  return (
    <Canvas camera={{ position: [0, 10, 10], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7.5]} intensity={1} />
      <CurvatureSurfaceComponent {...props} />
    </Canvas>
  );
};

export default CurvatureSurface;
