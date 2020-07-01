import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import { useAppContext } from '../../libs/contextLib'
import { useHistory } from 'react-router-dom'
import './Login.css'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { setIsAuthenticated } = useAppContext()
  const history = useHistory()

  function validateForm() {
    return email.length > 0 && password.length > 0
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setIsLoading(true)

    try {
      await Auth.signIn(email, password)
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
               type="email"
               value={email}
               placeholder="Email"
               onChange={e => setEmail(e.target.value)} />
        <input type="password"
               value={password}
               placeholder="Password"
               onChange={e => setPassword(e.target.value)} />
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
