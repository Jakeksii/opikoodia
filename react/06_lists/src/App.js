import './App.css';
import { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {

  const [state, setState] = useState({
    list:[],
    id:100
  })

  const addContact = (contact) => {
    setState((state => {
      contact.id = state.id;
      return {
        list:state.list.concat(contact),
        id:state.id+1
      }
    }))
  }

  const removeContact = (id) => {
    setState((state) => {
      let tempList = state.list.filter(contact => contact.id !== id);
      return {
        ...state, //kolme pistettä kopioi objektin
        list:tempList
      }
    })
  }


  return (
    <div className="App">
      <ContactForm addContact={addContact}></ContactForm>
      <hr/>
      <ContactList list={state.list} removeContact={removeContact}></ContactList>
    </div>
  );
}

export default App;
