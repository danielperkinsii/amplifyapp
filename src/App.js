import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
import ListOfNotes from './components/ListOfNotes'
import NewNoteForm from './components/NewNoteForm'

const initialFormState = { name: '', description: ''};

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
      <h1>Sticky Notes</h1>
      <div className="Note-form Purple">
      <div className="Note-header">
      <input
       className="Name-field Purple" 
       onChange={e => setFormData({ ...formData, 'name': e.target.value })} 
       placeholder="Name" 
       value={formData.name}/>

      <label className="Gray Image-button">
        <svg className="Filter-white" width="50px" height="50px" id="ei-image-icon" viewBox="0 0 50 50"><path d="M39 38H11c-1.7 0-3-1.3-3-3V15c0-1.7 1.3-3 3-3h28c1.7 0 3 1.3 3 3v20c0 1.7-1.3 3-3 3zM11 14c-.6 0-1 .4-1 1v20c0 .6.4 1 1 1h28c.6 0 1-.4 1-1V15c0-.6-.4-1-1-1H11z"></path><path d="M30 24c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path><path d="M35.3 37.7L19 22.4 9.7 31l-1.4-1.4 10.7-10 17.7 16.7z"></path><path d="M40.4 32.7L35 28.3 30.5 32l-1.3-1.6 5.8-4.7 6.6 5.4z"></path></svg>
       <input 
       type="file" onChange={handleChange}/>
       </label>
      </div>
      
      <textarea
        className="Description-field Purple"
        rows="4"
        cols="10"
        onChange={e => setFormData({ ...formData, 'description': e.target.value})} 
        placeholder="Note description" 
        value={formData.description}></textarea>
       <button 
       className="Button-space Button-style Save"
       onClick={createNote}>
          <svg className="Filter-white" width="25px" height="25px" id="ei-check-icon" viewBox="0 0 50 50"><path d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17-7.6 17-17 17zm0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15-6.7-15-15-15z"></path><path d="M23 32.4l-8.7-8.7 1.4-1.4 7.3 7.3 11.3-11.3 1.4 1.4z"></path></svg> 
        </button><br/>
       </div>
      
      <ListOfNotes notes={notes} deleteNote={deleteNote}/>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);