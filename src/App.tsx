import React from 'react';
import logo from './logo.svg';
import InvestmentCalculator from './components/InvestmentCalculator';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <InvestmentCalculator />
      </div>
    </div>
  );
}

export default App;
