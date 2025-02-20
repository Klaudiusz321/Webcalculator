import Calculator from "./sections/Calculator";
import { HelmetProvider } from 'react-helmet-async';
import "./styles/App.scss";

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <Calculator />
      </div>
    </HelmetProvider>
  );
}

export default App;
