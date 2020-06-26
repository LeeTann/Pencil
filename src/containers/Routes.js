import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './home/Home'
import Login from './login/Login'
import Signup from './signup/Signup'
import Notfound from './notfound/Notfound'

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route>
        <Notfound />
      </Route>
    </Switch>
  )
}

export default Routes
