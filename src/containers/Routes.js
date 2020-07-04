import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './home/Home'
import Login from './login/Login'
import Signup from './signup/Signup'
import Note from './note/Note'
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
      <Route exact path="/notes/new">
        <Note />
      </Route>
      <Route>
        <Notfound />
      </Route>
    </Switch>
  )
}

export default Routes
