import React, { useRef, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { API, Storage } from 'aws-amplify'
import config from '../../config/config'
import { s3Upload } from '../../libs/awsLib'
import './Notes.css'

function Notes() {
  const file = useRef(null)
  const { id } = useParams()
  const history = useHistory()
  const [note, setNote] = useState(null)
  const [topic, setTopic] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditing, setIsEditing] = useState(true)

  useEffect(() => {
    function loadNote() {
      return API.get("notes", `notes/${id}`)
    }

    async function onLoad() {
      try {
        const note = await loadNote()
        console.log("note..", note)
        const { content, attachment, topic } = note
  
        if (attachment) {
          note.attachmentURL = await Storage.vault.get(attachment)
        }

        setTopic(topic)
        setContent(content)
        setNote(note)
      } catch(e) {
        alert(e.message)
      }
    }

    onLoad()
  }, [id])

  function validateForm() {
    return content.length > 0
  }

  function formatFilename(str) {
    return str.replace(/^\w+-/, "")
  }

  function handleFileChange(event) {
    file.current = event.target.files[0]
  }

  function saveNote(note) {
    return API.put("notes", `notes/${id}`, {body: note})
  }

  async function handleSubmit(event) {
    event.preventDefault()

    let attachment

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a size file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`)
      return
    }
    
    setIsLoading(true)

    try {
      if (file.current) {
        attachment = await s3Upload(file.current)
      }

      await saveNote({ content, attachment: attachment || note.attachment })
      history.push('/')
    } catch (error) {
      alert(error.message)
      setIsLoading(false)
    }
  }

  function deletNote() {
    return API.del('notes', `notes/${id}`)
  }

  async function handleDelete(event) {
    event.preventDefault()

    const confirmed = window.confirm("Are you sure you want to delete this note?")

    if (!confirmed) {
      return
    }

    setIsDeleting(true)

    try {
      await deletNote()
      history.push('/')
    } catch (error) {
      alert(error.message)
      setIsDeleting(false)
    }
  }

  function handleEdit() {
    setIsEditing(!isEditing)
  }

  return (
    <div className="notes">
      {note && (
        <>
        <h3>{note.topic}</h3>
        <form onSubmit={handleSubmit} className="fields">
          <div className="content">
            <textarea disabled={isEditing}
                     className={isEditing ? "not-editable" : "editable"}
                     rows="20"
                     cols="50"
                     value={content}
                     onChange={e => setContent(e.target.value)}
            />
            <label className="checkbox-container">
              <input type="checkbox" onClick={handleEdit}/>
              <span className="checkmark"></span>
              Edit
            </label>
          </div>

          {note.attachment && (
            <>
              <p>File attachment</p>
              <a href={note.attachmentURL} target="_blank" rel="noopener noreferrer">
                <input type="file" 
                  className="custom-file-input"
                  onChange={handleFileChange}  />
                {formatFilename(note.attachment)}
              </a> 
            </>
          )}
  
          <div>
            {!note.attachment && <label htmlFor="custom-file-input">No file attached</label>}
            <input type="file" 
                className="custom-file-input"
                onChange={handleFileChange} 
            />
          </div>
          <button className="form-button"
                  type="submit"
                  disabled={!validateForm()}>
                  {isLoading && <i className="fa fa-refresh fa-spin"></i>} Save
          </button>
          <button className="form-button delete"
                  type="submit"
                  onClick={handleDelete}>
                  {isDeleting && <i className="fa fa-refresh fa-spin"></i>} Delete
          </button>
        </form>
        </>
      )}
    </div>
  )
}

export default Notes
