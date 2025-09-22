import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [exist, setExist] = useState(false)
  const [filterParam, setFilterParam] = useState(null)


  axios
    .get('http://localhost:3001/persons')
    .then(response => setPersons(response.data))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filter={filterParam} 
        setFilter={setFilterParam} 
        setExist={setExist} 
      />
  
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setExist={setExist}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filterParam} />
      {exist ? alert(`${newName} is already added to phonebook`) : '' }
    </div>
  )
}

export default App