import React from "react";
import Latex from "react-latex";

interface LatexDisplayProps {
  latexString: string;
}

const LatexDisplay: React.FC<LatexDisplayProps> = ({ latexString }) => {
  // Używamy $$...$$, aby wzór był wyświetlany w trybie display
  return <Latex>{`$$${latexString}$$`}</Latex>;
};

export default LatexDisplay;
