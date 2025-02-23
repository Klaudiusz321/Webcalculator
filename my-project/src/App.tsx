import { useEffect, useState } from 'react';
import Calculator from "./sections/Calculator";
import Footer from "./components/Footer";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import "./styles/App.scss";
import AdSenseAd from "./components/AdSenseAd";
function App() {
  const [isAdBlocked, setIsAdBlocked] = useState(false);

  useEffect(() => {
    // Próba pobrania skryptu AdSense i inicjalizacja reklamy
    const loadAdSense = async () => {
      try {
        const response = await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
        if (response.ok) {
          const script = document.createElement('script');
          script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6565480842270630";
          script.async = true;
          script.crossOrigin = "anonymous";
          document.head.appendChild(script);
          
          // Czekamy na załadowanie skryptu
          script.onload = () => {
            try {
              ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
              setIsAdBlocked(false);
            } catch (e) {
              console.error('adsbygoogle push error:', e);
              setIsAdBlocked(true);
            }
          };
        }
      } catch (e) {
        console.error('AdSense blocked:', e);
        setIsAdBlocked(true);
      }
    };

    loadAdSense();
  }, []); // Pusta tablica zależności - wykonaj tylko raz

  return (
    <HelmetProvider>
      <div className="App">
        {/* Komunikat, jeśli wykryto blokadę reklam */}
        {isAdBlocked && (
          <div style={{
            padding: '10px',
            backgroundColor: '#fff3cd',
            color: '#856404',
            textAlign: 'center',
            margin: '10px 0'
          }}>
            Wykryto blokadę reklam. Aby zobaczyć reklamy, wyłącz blokowanie reklam dla tej strony.
          </div>
        )}
        <Helmet>
          <title>My Calculator App</title>
        </Helmet>
        
        {/* Twoje komponenty */}
        <Calculator />
        
       <AdSenseAd />

        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
