import { useEffect } from 'react';
import Calculator from "./sections/Calculator";
import Footer from "./components/Footer";
import { HelmetProvider } from 'react-helmet-async';
import "./styles/App.scss";

function App() {
  useEffect(() => {
    // Inicjalizacja AdSense
    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute('data-ad-client', 'ca-pub-6565480842270630');
    document.head.appendChild(script);
  }, []);

  return (
    <HelmetProvider>
      <div className="App">
        <Calculator />
        <Footer/>
      </div>
    </HelmetProvider>
  );
}

export default App;
