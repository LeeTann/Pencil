import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import { useAppContext } from '../../libs/contextLib'
import { useHistory } from 'react-router-dom'
import { useFormField } from '../../libs/hooksLib'
import './Signup.css'

function Signup() {
  const [formField, setFormField] = useFormField({email: "", password: "", confirmPassword: "", confirmationCode: ""})
  const [isLoading, setIsLoading] = useState(false)
  const { setIsAuthenticated } = useAppContext()
  const history = useHistory()
  const [newUser, setNewUser] = useState(null)

  function validateSignupForm() {
    return formField.email.length > 0 && formField.password.length > 0 && formField.password === formField.confirmPassword
  }

  function validateConfirmationForm() {
    return formField.confirmationCode.length > 0
  }

  async function handleSignupSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    
    try {
      const newUser = await Auth.signUp({
        username: formField.email,
        password: formField.password
      })
      setIsLoading(false)
      setNewUser(newUser)
    } catch (e) {
      alert(e.message)
      setIsLoading(false)
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault()
    setIsLoading(true)

    try {
      await Auth.confirmSignUp(formField.email, formField.confirmationCode)
      await Auth.signIn(formField.email, formField.password)

      setIsAuthenticated(true)
      history.push("/")
    } catch (e) {
      alert(e.message)
      setIsLoading(false)
    }
  }

  function renderSignupForm() {
    return (
      <>
        <h2>Sign up</h2>
        <form onSubmit={handleSignupSubmit} className="form-container">
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
          <input id="confirmPassword"
                 type="password"
                 value={formField.confirmPassword}
                 placeholder="confirm password"
                 onChange={setFormField} />
          <button className="btn" type="submit" disabled={!validateSignupForm()}>
            {isLoading && <i className="fa fa-refresh fa-spin"></i>} Sign up
          </button>
        </form>
      </>
    )
  }

  function renderConfirmationForm() {
    return (
      <>
        <h2>Confirmation Code</h2>
        <form onSubmit={handleConfirmationSubmit} className="form-container">
          <input autoFocus
                 id="confirmationCode"
                 type="tel"
                 value={formField.confirmationCode}
                 placeholder="confirmation code"
                 onChange={setFormField} />
          <p>Please check your email for the code.</p>
          <button className="btn" type="submit" disabled={!validateConfirmationForm()}>
            {isLoading && <i className="fa fa-refresh fa-spin"></i>} Verify
          </button>
        </form>
      </>
    )
  }

  return (
    <div className="signup">
      {newUser === null ? renderSignupForm() : renderConfirmationForm()}
    </div>
  )
}

export default Signup
