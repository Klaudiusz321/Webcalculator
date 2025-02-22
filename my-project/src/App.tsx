import Calculator from "./sections/Calculator";
import Footer from "./components/Footer";
import { HelmetProvider } from 'react-helmet-async';
import "./styles/App.scss";

function App() {
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
