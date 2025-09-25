import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [exist, setExist] = useState(false)
  const [filterParam, setFilterParam] = useState(null)
  const [notification, setNotification] = useState({level:null, message:''})


  useEffect(()=>{
    personsService
      .getAll()
      .then(data=>setPersons(data))
  },[])


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
        setNotification={setNotification}
      />
      <h3>Numbers</h3>
      <Persons 
        persons={persons} 
        setPersons={setPersons}
        filter={filterParam} 
        personsService={personsService}
        setNotification={setNotification}
      />
    </div>
  )
}

export default App