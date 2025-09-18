import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [exist, setExist] = useState(false)
  const [filterParam, setFilterParam] = useState(null)

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