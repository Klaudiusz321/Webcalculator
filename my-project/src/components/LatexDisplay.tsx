import React, { useEffect, useState } from 'react';
import 'katex/dist/katex.min.css';
import katex from 'katex';

interface LatexDisplayProps {
  latexString: string;
}

const LatexDisplay: React.FC<LatexDisplayProps> = ({ latexString }) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!latexString) return;

    try {
      const elementId = `latex-${btoa(latexString).replace(/[^a-zA-Z0-9]/g, '')}`;
      const element = document.getElementById(elementId);
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
      setError('Błąd renderowania wyrażenia LaTeX');
    }
  }, [latexString]);

  if (!latexString) return null;
  if (error) return <div style={errorStyle}>{error}</div>;

  return (
    <div 
      id={`latex-${btoa(latexString).replace(/[^a-zA-Z0-9]/g, '')}`} 
      style={latexStyle} 
    />
  );
};

const latexStyle: React.CSSProperties = {
  overflow: 'auto',
  maxWidth: '100%',
  margin: '0.5rem 0',
};

const errorStyle: React.CSSProperties = {
  color: '#ff6b6b',
  fontSize: '0.9rem',
  padding: '0.5rem',
};

export default LatexDisplay;
