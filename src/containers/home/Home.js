import React, { useState, useEffect} from 'react'
import { useAppContext } from '../../libs/contextLib'
import { API } from 'aws-amplify'
import './Home.css'
import { NavLink } from 'react-router-dom'

function Home() {
  const [notes, setNotes] = useState([])
  const { isAuthenticated } = useAppContext()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return 
      }

      try {
        const notes = await loadNotes()
        setNotes(notes)
      } catch (error) {
        alert(error.message)
      }

      setIsLoading(false)
    }
    onLoad()
  }, [isAuthenticated])

  function loadNotes() {
    const notes = API.get("notes", "notes")
    console.log("notes ",notes)
    return notes
  }

  function displayListofNotes(notes) {
    return [{}].concat(notes).map((note, i) => (
      i !== 0 ? (
        <ul>
          <li className="notes-list">
            <NavLink key={note.noteId} to={`/notes/${note.noteId}`}>
              <div className="topic-title">{note.topic}</div>
              <div className="created-at">{"Created: " + new Date(note.createdAt).toLocaleString()}</div>
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <NavLink key="new" to="/notes/new" className="new-note">
              <b>{"\uFF0B"}</b> Create a new note
            </NavLink>
          </li>
        </ul>
      )
    ))
  }

  function renderLandingPage() {
    return (
      <div className="lander">
        <h1>Pencil</h1>
        <p>A simple note taking app utilizing neumorphic design</p>
      </div>
    )
  }

  function renderNotesPage(){
    return (
      <div className="your-notes">
        <h1>Your Notes</h1>
        <li>
          {!isLoading && displayListofNotes(notes)}
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
