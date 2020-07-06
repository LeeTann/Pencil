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
    return API.get("notes", "notes")
  }

  function displayListofNotes(notes) {
    return [{}].concat(notes).map((note, i) => (
      i !== 0 ? (
        <ol>
          <li>
            <NavLink key={note.noteId} to={`/notes/${note.noteId}`}>
              {note.content.trim().split("\n")[0]}
              {"Created: " + new Date(note.createdAt).toLocaleString()}
            </NavLink>
          </li>
        </ol>
      ) : (
        <ul>
          <li>
            <NavLink key="new" to="/notes/new">Created a new note</NavLink>
          </li>
        </ul>
      )
    ))
  }

  function renderLandingPage() {
    return (
      <div className="lander">
        <h1>Pencil</h1>
        <p>A simple note taking app</p>
      </div>
    )
  }

  function renderNotesPage(){
    return (
      <div className="notes">
        <h1>Your Notes</h1>
        <li>
          {!isLoading && displayListofNotes(notes)}
        </li>
    </div>
    )
  }

  return (
    <div className="home">
      {isAuthenticated ? renderNotesPage() : renderLandingPage()}
    </div>
  )
}
export default Home
