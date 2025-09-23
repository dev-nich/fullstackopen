import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [exist, setExist] = useState(false)
  const [filterParam, setFilterParam] = useState(null)


  useEffect(()=>{
    personsService
      .getAll()
      .then( data=>setPersons(data))
  },[])


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
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setExist={setExist}
        personsService={personsService}
      />
      <h3>Numbers</h3>
      <Persons 
        persons={persons} 
        setPersons={setPersons}
        filter={filterParam} 
        personsService={personsService}
      />
      {exist ? alert(`${newName} is already added to phonebook`) : '' }
    </div>
  )
}

export default App