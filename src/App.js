import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote, deleteNote as deleteNoteMutation } from './graphql/mutations';
import ImageIcon from './svg/si-sprite.svg'

const initialFormState = { name: '', description: ''};
const stickyColors = ['Orange', 'Red', 'Green', 'Purple', 'Blue']

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState)
 

  useEffect(() => {
    fetchNotes();
  }, []);  

  async function handleChange(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchNotes()
  }
  
  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(notesFromAPI.map(async note => {
      if (note.image) {
        const image = await Storage.get(note.image);
        note.image = image
      }
      return note;
    }))
    setNotes(apiData.data.listNotes.items);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData }});
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }})
  }

  return (
    <div className="App">
      <h1>My Notes App</h1>
      <div className="Note-form">
      <input
       className="Field" 
       onChange={e => setFormData({ ...formData, 'name': e.target.value })} 
       placeholder="Note name" 
       value={formData.name}/><br/>
      <textarea
       className="Field"
      rows="5"
      cols="50"
      onChange={e => setFormData({ ...formData, 'description': e.target.value})} 
      placeholder="Note description" 
      value={formData.description}></textarea> <br/>
       <label className="Button-space Upload-style Upload">
       Image
       <input 
       type="file" onChange={handleChange}/>
       </label><br/>
       <button 
       className="Button-space Button-style Save"
       onClick={createNote}>Save</button><br/>
       </div>
      
      <div className="Note-container">
        {
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
               onClick={() => deleteNote(note)}>Delete note</button>
              </div>
            </div>
          ))
        }
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);