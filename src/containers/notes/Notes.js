import React, { useRef, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { API, Storage } from 'aws-amplify'

function Notes() {
  const file = useRef(null)
  const { id } = useParams()
  const history = useHistory()
  const [notes, setNotes] = useState(null)
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    function loadNote() {
      return API.get("notes", `notes/${id}`)
    }

    async function onLoad() {
      try {
        const note = await loadNote()
        const { content, attachment } = note
  
        if (attachment) {
          note.attachmentURL = await Storage.vault.get(attachment)
        }
  
        setContent(content)
        setNotes(notes)
      } catch(e) {
        alert(e.message)
      }
    }

    onLoad()
  }, [id, notes])

  return (
    <div className="notes">
      
    </div>
  )
}

export default Notes
