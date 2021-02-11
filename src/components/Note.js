import React, { useState } from 'react';
import EditNoteForm from './EditNoteForm';

const stickyColors = ['Orange', 'Red', 'Green', 'Purple', 'Blue']
export default function Note({ index, note, updateNote, deleteNote }) {
  const [isEditing, setIsEditing] = useState(false)

  function editNote(bool) {
      setIsEditing(bool)
  }
  
  if (isEditing) {
    return <EditNoteForm note={note} updateNote={updateNote} editNote={editNote}/>
  } else {
      return (
        <div className={`Note ${stickyColors[index % stickyColors.length]}`}>
        <div className="Note-header">
            <h2 className="Note-title">{note.name}</h2>
            {
            note.image && <img className="Note-image-thumbnail" src={note.image}/>
            }
        </div>
        <p className="Note-body">{note.description}</p>
        <div className="Note-utilities">
        <button
            className="Button-space Button-style Delete"
            onClick={() => editNote(true)}>
            <svg className="Filter-white" width="25px" height="25px" id="ei-pencil-icon" viewBox="0 0 50 50"><path d="M9.6 40.4l2.5-9.9L27 15.6l7.4 7.4-14.9 14.9-9.9 2.5zm4.3-8.9l-1.5 6.1 6.1-1.5L31.6 23 27 18.4 13.9 31.5z"></path><path d="M17.8 37.3c-.6-2.5-2.6-4.5-5.1-5.1l.5-1.9c3.2.8 5.7 3.3 6.5 6.5l-1.9.5z"></path><path d="M29.298 19.287l1.414 1.414-13.01 13.02-1.414-1.41z"></path><path d="M11 39l2.9-.7c-.3-1.1-1.1-1.9-2.2-2.2L11 39z"></path><path d="M35 22.4L27.6 15l3-3 .5.1c3.6.5 6.4 3.3 6.9 6.9l.1.5-3.1 2.9zM30.4 15l4.6 4.6.9-.9c-.5-2.3-2.3-4.1-4.6-4.6l-.9.9z"></path></svg>   
            </button>
            <button
            className="Button-space Button-style Delete"
            onClick={() => deleteNote(note)}>
            <svg className="Filter-white" width="25px" height="25px" id="ei-trash-icon" viewBox="0 0 50 50"><path d="M20 18h2v16h-2z"></path><path d="M24 18h2v16h-2z"></path><path d="M28 18h2v16h-2z"></path><path d="M12 12h26v2H12z"></path><path d="M30 12h-2v-1c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v1h-2v-1c0-1.7 1.3-3 3-3h4c1.7 0 3 1.3 3 3v1z"></path><path d="M31 40H19c-1.6 0-3-1.3-3.2-2.9l-1.8-24 2-.2 1.8 24c0 .6.6 1.1 1.2 1.1h12c.6 0 1.1-.5 1.2-1.1l1.8-24 2 .2-1.8 24C34 38.7 32.6 40 31 40z"></path></svg>   
            </button>
        </div>
      </div>
    )
  }
}