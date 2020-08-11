import React, { useState, useEffect} from 'react'
import { useAppContext } from '../../libs/contextLib'
import { API } from 'aws-amplify'
import './Home.css'
import { NavLink, Link } from 'react-router-dom'

function Home() {
  const [notes, setNotes] = useState([])
  const [filtered, setFiltered] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const { isAuthenticated } = useAppContext()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return 
      }

      try {
        let notes = await loadNotes()
        setNotes(notes)
        setFiltered(notes)
      } catch (error) {
        alert(error.message)
      }

      setIsLoading(false)
    }
    onLoad()
  }, [isAuthenticated])

  useEffect(() => {
    const results = filtered.filter(note => note.topic.toLowerCase().includes(searchTerm.trim()))

    setNotes(results)
  }, [filtered, searchTerm])

  console.log("new notes",notes)

  function loadNotes() {
    const notes = API.get("notes", "notes")
    console.log("notes ",notes)

    return notes
  }

  function displayListofNotes(filtered) {
    const listOfNotes = [{}].concat(notes).map((note, i) => (
      i !== 0 ? (
        <ul>
          <li className="notes-list">
            <NavLink key={note.noteId} to={`/notes/${note.noteId}`}>
              <div className="topic-title">{note.topic}</div>
              <div className="created-at">{note.topic ? "Created: " + new Date(note.createdAt).toLocaleString() : null}</div>
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <NavLink key={i} to="/notes/new" className="new-note">
              <b>{"\uFF0B"}</b> Create a new note
            </NavLink>
          </li>
        </ul>
      )
    ))
    return listOfNotes
  }

  const onChange = (e) => {
    setSearchTerm(e.target.value)
    console.log(searchTerm)
  }

  function renderLandingPage() {
    return (
      <div className="lander">
        <h1>Pencil</h1>
        <p>A note taking app utilizing neumorphic design</p>
        <div>
          <Link to="/login" className="btn-login">Login</Link>
          <Link to="/signup" className="btn-signup">Sign up</Link>
        </div>
      </div>
    )
  }

  function renderNotesPage(){
    return (
      <div className="your-notes">
        <h1>Your Notes</h1>
        <input type="text"
              placeholder="search"
              value={searchTerm}
              onChange={onChange} 
        />
        <li>
          {!isLoading ? displayListofNotes(filtered) : <h1><i className="fa fa-refresh fa-spin main-loader"></i></h1>}
        </li>
    </div>
    )
  }

  return (
    <div>
      {isAuthenticated ? renderNotesPage() : renderLandingPage()}
    </div>
  )
}
export default Home
