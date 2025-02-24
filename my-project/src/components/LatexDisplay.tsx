import React from 'react';
import 'katex/dist/katex.min.css';
import katex from 'katex';

interface LatexDisplayProps {
  latexString: string;
}

const LatexDisplay: React.FC<LatexDisplayProps> = ({ latexString }) => {
  try {
    // Usuń zewnętrzne znaczniki \( \) jeśli istnieją
    let cleanLatex = latexString.replace(/^\\\((.*)\\\)$/, '$1');
    
    // Zamień \left( na ( i \right) na )
    cleanLatex = cleanLatex
      .replace(/\\left\(/g, '(')
      .replace(/\\right\)/g, ')')
      .replace(/\\frac/g, '\\frac');

    const html = katex.renderToString(cleanLatex, {
      displayMode: true,
      throwOnError: false,
      trust: true,
      strict: false,
      macros: {
        "\\chi": "\\chi",
        "\\theta": "\\theta",
        "\\phi": "\\phi"
      }
    });

    return (
      <div 
        dangerouslySetInnerHTML={{ __html: html }}
        style={latexStyle}
      />
    );
  } catch (error) {
    console.error('LaTeX error:', error);
    return <div style={latexStyle}>{latexString}</div>;
  }
};

const latexStyle: React.CSSProperties = {
  overflow: 'auto',
  maxWidth: '100%',
  color: 'white',
  fontSize: '1.1em',
  lineHeight: '1.5',
  padding: '0.5rem',
};

export default LatexDisplay;
