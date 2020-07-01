import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import { useAppContext } from '../../libs/contextLib'
import { useHistory } from 'react-router-dom'
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
    <div className="login">
      <h2>Log in</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input autoFocus
               id="email"
               type="email"
               value={formField.email}
               placeholder="email"
               onChange={setFormField} />
        <input id="password"
               type="password"
               value={formField.password}
               placeholder="password"
               onChange={setFormField} />
        <button className="btn"
                type="submit"
                disabled={!validateForm()}>
                {isLoading && <i className="fa fa-refresh fa-spin"></i>} Login
        </button>
      </form>
    </div>
  )
}

export default Login
