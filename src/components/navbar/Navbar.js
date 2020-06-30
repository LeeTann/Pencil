import React, { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { GoThreeBars } from 'react-icons/go'
import { GrFormClose } from 'react-icons/gr'
import { useAppContext} from '../../libs/contextLib'
import { Auth } from 'aws-amplify'

function Navbar() {
  const [menuActive, setMenuActive] = useState(false)
  const node = useRef()
  const { isAuthenticated, setIsAuthenticated, isAuthenticating } = useAppContext()

  // handles clicks outside of menu
  const handleClick = (e) => {
    e.preventDefault()
    if (node.current.contains(e.target)) {
      return node
    } else {
      setMenuActive(false)
    }
  }
  
  useEffect(() => {
    // add event listener when mounted
    document.addEventListener("mousedown", handleClick)

    // then remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClick)
    }
  }, [menuActive])

  async function handleLogout() {
    Auth.signOut()
    setIsAuthenticated(false)
  }

  return (
    !isAuthenticating &&
    <nav className="navbar">
      <NavLink to="/">
        <h1 className="title">Pencil</h1>
      </NavLink>
        {/* only if menuActive is true, set 'active' classname */}
        <div ref={node} className={`menu-content ${menuActive && 'active'}`}>
        {isAuthenticated
        ? <ul><li><NavLink to="/" onClick={handleLogout}>Logout</NavLink></li></ul>
        : <>
            <ul>
              <li>
                <NavLink to="/signup">Sign up</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </ul> 
            </>
          }
          </div>

          {menuActive ? <GrFormClose className="close-menu" onClick={() => setMenuActive(!menuActive)} /> : <GoThreeBars className="menu-bar" onClick={() => setMenuActive(!menuActive)} />}
 
    
 
    </nav>
  )
}

export default Navbar
