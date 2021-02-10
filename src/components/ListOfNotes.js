import React from 'react';
import Note from './Note';
// import '../App.css';


export default function ListOfNotes({ notes, deleteNote }) {
  
  return (
      <div className="Note-container">
      { notes.length > 0 ?
        notes.map((note, index) => (
          <Note  key={note.id || note.name} note={note} index={index} deleteNote={deleteNote}/>
        ))
      : <h1>Loading...</h1> }
    </div>
  )
}