import React, { useEffect } from 'react';
import 'katex/dist/katex.min.css';
import katex from 'katex';

interface LatexDisplayProps {
  latexString: string;
}

const LatexDisplay: React.FC<LatexDisplayProps> = ({ latexString }) => {
  useEffect(() => {
    try {
      const element = document.getElementById(`latex-${latexString}`);
      if (element) {
        katex.render(latexString, element, {
          throwOnError: false,
          displayMode: true,
          fleqn: false,
          leqno: false,
          strict: false
        });
      }
    } catch (error) {
      console.error('Error rendering LaTeX:', error);
    }
  }, [latexString]);

  return <div id={`latex-${latexString}`} style={latexStyle} />;
};

const latexStyle: React.CSSProperties = {
  overflow: 'auto',
  maxWidth: '100%',
  margin: '0.5rem 0',
};

export default LatexDisplay;
