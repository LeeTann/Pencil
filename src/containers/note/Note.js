import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import config from '../../config/config'
import { API } from 'aws-amplify'
import { s3Upload } from '../../libs/awsLib'
import './Note.css'

function Note() {
  const file = useRef(null)
  const history = useHistory()
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  function validateForm() {
    return content.length > 0
  }

  function handleAttachment(e) {
    file.current = e.target.files[0]
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert (`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB`)
      return 
    }
    setIsLoading(true)

    try {
      const attachment = file.current ? await s3Upload(file.current) : null

      await createNote({ content, attachment })
      history.push("/")
    } catch (error) {
      alert(error.message)
      setIsLoading(false)
    }
  }

  function createNote(note) {
    // ("notes table", "notes endpoint", "set body with note parameter")
    return API.post("notes", "notes", { body: note })
  }


  return (
    <div className="note">
      <div className="logo"></div>
      <div className="title">Create a new note</div>
      <form onSubmit={handleSubmit} className="fields">
        <div className="content">
          <textarea autoFocus
                    rows="20"
                    cols="50"
                    value={content}
                    onChange={e => setContent(e.target.value)}
          />
        </div>
        <div className="file">
          <label htmlFor="attachment">Attachment</label>
          <input type="file" 
                id="attachment"
                onChange={handleAttachment} 
          />
        </div>
        <button className="form-button"
                type="submit"
                disabled={!validateForm()}>
                {isLoading && <i className="fa fa-refresh fa-spin"></i>} Create
        </button>
      </form>
      
    </div>
  )
}

export default Note
