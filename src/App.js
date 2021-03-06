import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import {updateNote as updateNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
import ListOfNotes from './components/ListOfNotes'
import NewNoteForm from './components/NewNoteForm'

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);  
  
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

  async function updateNote(id, updatedNote) {
    const updatedNotesArray = notes.map(note => note.id === id ? updatedNote : note);
    setNotes(updatedNotesArray)
    await API.graphql({ query: updateNoteMutation, variables: { input: { 'id': id, 'name': updatedNote.name, 'description': updatedNote.description } } })
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } } })
  }

  return (
    <div className="App">
      <h1>Sticky Notes</h1>
      <NewNoteForm notes={notes} setNotes={setNotes} fetchNotes={fetchNotes}/>
      <ListOfNotes notes={notes} updateNote={updateNote} deleteNote={deleteNote}/>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);