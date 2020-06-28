import React, { useState } from 'react'
import './Login.css'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function validateForm() {
    return email.length > 0 && password.length > 0
  }

  function handleSubmit(e) {
    e.preventDefault()
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
        <input type="submit" value="Login" disabled={!validateForm()} className="btn" />
      </form>
    </div>
  )
}

export default Login
