import React, { useState } from 'react';

export default function EditNoteForm({ note, updateNote, editNote }) {
  const [data, setData] = useState(note)

  return (
    <div className="Note-form Purple">
      <div className="Note-header">
        <input
          className="Name-field Purple" 
          onChange={e => setData({ ...data, 'name': e.target.value})} 
          value={data.name}
          />
        {
          null && <img className="Note-image-thumbnail" src={null}/>
        }
          <input type="file" 
          onChange={null} // TODO: Image update functionality
          />
      </div>
      <textarea
        className="Description-field Purple"
        rows="4"
        cols="10"
        onChange={e => setData({ ...data, 'description': e.target.value})} 
        value={data.description}
        >
      </textarea>
      <button className="Button-space Button-style Save" 
      onClick={()=>{
        updateNote(data.id, data)
        editNote(false)
        }}>
        <svg className="Filter-white" width="25px" height="25px" id="ei-check-icon" viewBox="0 0 50 50"><path d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17-7.6 17-17 17zm0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15-6.7-15-15-15z"></path><path d="M23 32.4l-8.7-8.7 1.4-1.4 7.3 7.3 11.3-11.3 1.4 1.4z"></path></svg> 
      </button>
    </div>
  )
}