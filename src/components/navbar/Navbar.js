import React, { useState, useRef, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import './Navbar.css'
import { GoThreeBars } from 'react-icons/go'
import { MdClose } from 'react-icons/md'
import { useAppContext} from '../../libs/contextLib'
import { Auth } from 'aws-amplify'

function Navbar() {
  const [menuActive, setMenuActive] = useState(false)
  const node = useRef()
  const { isAuthenticated, setIsAuthenticated, isAuthenticating } = useAppContext()
  const history = useHistory()

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
    if (menuActive) {
      // add event listener when mounted
      document.addEventListener("mousedown", handleClick)
          // then remove event listener
      return () => {
        document.removeEventListener("mousedown", handleClick)
      }
    }
  }, [menuActive])

  async function handleLogout() {
    await Auth.signOut()
    
    setIsAuthenticated(false)

    history.push("/login")
  }

  return (
    !isAuthenticating &&
    <nav className="navbar">
      <NavLink to="/">
        <div className="main-logo"></div>
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

          {menuActive ? <MdClose className="close-menu" onClick={() => setMenuActive(!menuActive)} /> : <GoThreeBars className="menu-bar" onClick={() => setMenuActive(!menuActive)} />}
 
    
 
    </nav>
  )
}

export default Navbar
