import React from 'react';
import 'katex/dist/katex.min.css';
import katex from 'katex';

interface LatexDisplayProps {
  latexString: string;
}

const LatexDisplay: React.FC<LatexDisplayProps> = ({ latexString }) => {
  try {
    // 1. Najpierw pobieramy oryginalny ciąg LaTeX, np.:
    //    "g_{00} = \\(-1\\)"
    //    "\\Gamma^{0}_{11} = \\(- \\frac{a{\\left(t \\right)} ..."

    let cleanLatex = latexString.trim();

    // 2. Jeśli jest wzór w stylu "coś = \\( ... \\)", to usuwamy część przed znakiem '='
    //    aby pozostawić tylko samą część LaTeX wewnątrz \( ... \).
    //    W niektórych przypadkach nie ma znaku "=", więc zabezpieczamy się przed tym.
    if (cleanLatex.includes('=')) {
      const parts = cleanLatex.split('=');
      // Bierzemy ostatni fragment, gdyby było więcej niż jedno '='
      cleanLatex = parts[parts.length - 1].trim();
    }

    // 3. Usuwamy początkowe "\\(" i końcowe "\\)", jeśli występują.
    //    Regexy dość zachowawcze, żeby nie usuwać za dużo:
    cleanLatex = cleanLatex
      .replace(/^\\\(/, '')    // usuń na początku  "\("
      .replace(/\\\)$/, '')    // usuń na końcu "\)"
      .trim();

    // 4. Zamieniamy np. "\\left(" i "\\right)" na zwykłe "(" i ")", jeśli chcesz unikać dynamicznego rozciągania.
    //    Możesz usunąć ten fragment, jeśli wolisz zachować \left( i \right).
    cleanLatex = cleanLatex
      .replace(/\\left\(/g, '(')
      .replace(/\\right\)/g, ')');

    // 5. Renderujemy przez KaTeX
    const html = katex.renderToString(cleanLatex, {
      displayMode: true,
      throwOnError: false,
      trust: true,
      strict: false,
      macros: {
        // Dodaj tu makra, jeśli potrzebujesz
        "\chi": "\chi",
        "\theta": "\\theta",
        "\phi": "\\phi",
        "\Gamma": "\Gamma"
      }
    });

    // 6. Zwracamy gotowy HTML, wstrzyknięty w <div>.
    return (
      <div 
        dangerouslySetInnerHTML={{ __html: html }}
        style={latexStyle}
      />
    );

  } catch (error) {
    console.error('LaTeX error:', error, 'for string:', latexString);
    // W razie błędu wyświetlamy oryginalny tekst
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
