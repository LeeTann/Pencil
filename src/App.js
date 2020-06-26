import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar'
import Routes from './containers/Routes'

function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;
