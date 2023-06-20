import './App.css';
import { useState } from 'react';
import ContactFrom from './components/ContactForm';
import ContactList from './components/ContactList';
import Contact from './models/Contact';

interface State {
  list:Contact[];
  id:number;
}

function App() {

  const [state, setState] = useState<State>({
    list:[],
    id:100
  })

  const addContact = (contact:Contact) => {
    setState((state) => {
      contact.id = state.id;
      return {
        list:state.list.concat(contact),
        id:state.id+1
      }
    })
  }

  const removeContact = (id:number) => {
    setState((state) => {
      let tempList = state.list.filter(contact => contact.id !== id);
      return {
        ...state,
        list:tempList
      }
    })
  }

  return (
    <div className="App">
      <ContactFrom addContact={addContact} />
      <hr />
      <ContactList list={state.list} removeContact={removeContact} />
    </div>
  );
}

export default App;
