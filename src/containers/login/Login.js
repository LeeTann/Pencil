import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import { useAppContext } from '../../libs/contextLib'
import { useHistory, NavLink } from 'react-router-dom'
import { useFormField } from '../../libs/hooksLib'
import './Login.css'

function Login() {
  const [formField, setFormField] = useFormField({email: "", password: ""})
  const [isLoading, setIsLoading] = useState(false)
  const { setIsAuthenticated } = useAppContext()
  const history = useHistory()

  function validateForm() {
    return formField.email.length > 0 && formField.password.length > 0
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setIsLoading(true)

    try {
      await Auth.signIn(formField.email, formField.password)
      setIsAuthenticated(true)
      history.push("/")
    } catch (e) {
      alert(e.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="form-container">
      <div className="logo"></div>
      <div className="title"><h2>Login</h2></div>
      <form onSubmit={handleSubmit} className="fields">
        <div className="email">
          <i className="fa fa-envelope icon"></i>
          <input autoFocus
                 id="email"
                 type="email"
                 value={formField.email}
                 placeholder="email"
                 onChange={setFormField} />
        </div>
        <div className="password">
          <i className="fa fa-lock icon"></i>
          <input id="password"
                 type="password"
                 value={formField.password}
                 placeholder="password"
                 onChange={setFormField} />
        </div>
        <button className="form-button"
                type="submit"
                disabled={!validateForm()}>
                {isLoading && <i className="fa fa-refresh fa-spin"></i>} Login
        </button>
        <p>Don't have an account? <NavLink to="/signup" className="form-links">Sign up</NavLink></p>
      </form>
    </div>
  )
}

export default Login
