import { useEffect, useState } from 'react';
import Calculator from "./sections/Calculator";
import Footer from "./components/Footer";
import { HelmetProvider } from 'react-helmet-async';
import "./styles/App.scss";

function App() {
  const [isAdBlocked, setIsAdBlocked] = useState(false);

  useEffect(() => {
    // Sprawdź czy AdSense jest blokowany
    const checkAdBlock = async () => {
      try {
        await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
      } catch (e) {
        setIsAdBlocked(true);
      }
    };
    
    checkAdBlock();
  }, []);

  useEffect(() => {
    const loadAdSense = async () => {
      try {
        const response = await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
        if (response.ok) {
          const script = document.createElement('script');
          script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6565480842270630";
          script.async = true;
          script.crossOrigin = "anonymous";
          document.head.appendChild(script);
        }
      } catch (e) {
        console.log('AdBlock detected');
      }
    };
    
    loadAdSense();
  }, []);

  return (
    <HelmetProvider>
      <div className="App">
        {isAdBlocked && (
          <div style={{
            padding: '10px',
            backgroundColor: '#fff3cd',
            color: '#856404',
            textAlign: 'center',
            margin: '10px 0'
          }}>
            Wykryto AdBlock. Prosimy o wyłączenie blokady reklam, aby wspierać rozwój aplikacji.
          </div>
        )}
        <Calculator />
        <Footer/>
      </div>
    </HelmetProvider>
  );
}

export default App;
