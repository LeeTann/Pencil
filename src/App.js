import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar'
import Routes from './containers/Routes'
import { AppContext } from './libs/contextLib'
import { Auth } from 'aws-amplify'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(true)

  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    try {
      await Auth.currentSession()
      setIsAuthenticated(true)
    } catch (e) {
      if (e !== 'No current user') {
        alert(e)
      }
    }

    setIsAuthenticating(false)
  }

  return (
    <div className="container">
      <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, isAuthenticating, setIsAuthenticating }}>
        <Navbar />
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
