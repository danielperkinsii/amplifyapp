import React from 'react';
import Note from './Note';

export default function ListOfNotes({ notes, updateNote, deleteNote }) {

  return (
      <div className="Note-container">
      { notes.length > 0 ?
        notes.map((note, index) => (
          <Note key={note.id || note.name} index={index} note={note} updateNote={updateNote} deleteNote={deleteNote}/>
        ))
      : <h1>Loading...</h1> }
    </div>
  )
}