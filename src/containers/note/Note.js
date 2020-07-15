import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import config from '../../config/config'
import { API } from 'aws-amplify'
import { s3Upload } from '../../libs/awsLib'
import './Note.css'

function Note() {
  const file = useRef(null)
  const history = useHistory()
  const [topic, setTopic] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  function validateForm() {
    return content.length > 0 && topic.length > 0
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

      await createNote({ topic, content, attachment })
      history.push("/")
    } catch (error) {
      alert(error.message)
      setIsLoading(false)
    }
  }

  function createNote(note) {
    // ("notes table", "notes endpoint", "set body with note parameter")
    const posted = API.post("notes", "notes", { body: note })
    console.log("posted...", posted)
    return posted
  }


  return (
    <div className="note">
      {/* <div className="logo"></div> */}
      <div className="title">Create a new note</div>
      <form onSubmit={handleSubmit} className="fields">
        <div className="topic">
          <i className="fa fa-pencil-square-o icon"></i>
          <input autoFocus
                id="topic"
                type="topic"
                value={topic}
                placeholder="topic"
                onChange={e => setTopic(e.target.value)} />
        </div>
        <div className="content">
          <textarea 
                    rows="20"
                    cols="50"
                    value={content}
                    onChange={e => setContent(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="custom-file-input">Attachment</label>
          <input type="file" 
                className="custom-file-input"
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
