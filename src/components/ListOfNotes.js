import React from 'react';


const stickyColors = ['Orange', 'Red', 'Green', 'Purple', 'Blue']


export default function ListOfNotes({ notes, deleteNote }) {
  
    return (
        <div className="Note-container">
        { notes.length > 0 ?
          notes.map((note, index) => (
            <div className={`Note ${stickyColors[index % stickyColors.length]}`} key={note.id || note.name}>
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
               onClick={() => deleteNote(note)}>
                <svg className="Filter-white" width="25px" height="25px" id="ei-trash-icon" viewBox="0 0 50 50"><path d="M20 18h2v16h-2z"></path><path d="M24 18h2v16h-2z"></path><path d="M28 18h2v16h-2z"></path><path d="M12 12h26v2H12z"></path><path d="M30 12h-2v-1c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v1h-2v-1c0-1.7 1.3-3 3-3h4c1.7 0 3 1.3 3 3v1z"></path><path d="M31 40H19c-1.6 0-3-1.3-3.2-2.9l-1.8-24 2-.2 1.8 24c0 .6.6 1.1 1.2 1.1h12c.6 0 1.1-.5 1.2-1.1l1.8-24 2 .2-1.8 24C34 38.7 32.6 40 31 40z"></path></svg>   
              </button>
              </div>
            </div>
          ))
       : <h1>Loading...</h1> }
      </div>
    )
}