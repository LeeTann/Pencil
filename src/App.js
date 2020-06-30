import React, { useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar'
import Routes from './containers/Routes'
import { AppContext } from './libs/contextLib'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <div className="container">
      <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Navbar />
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
