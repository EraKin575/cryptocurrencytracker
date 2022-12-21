import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import CryptoPrices from './components/CryptoPrices';
import CoinData from './components/CoinData';

function App() {
  return (
    <div className="App">
     <CryptoPrices/>
     
    </div>
  );
}

export default App;
