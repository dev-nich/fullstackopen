import { useState } from 'react'
import Filter from './components/Filter'

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
  const isExist = (existName) => (persons.some(({name})=> name === existName))

  
  const addPerson = (event) => {
    event.preventDefault()
    const exist = isExist(newName)
    setExist(exist)
    if(!exist){
      const newPerson = {
        name:`${newName}`,
        number:`${newNumber}`
      };
      setPersons(persons.concat(newPerson))
    }
  }

  const handleNewName = (event) => {
    setExist(false)
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterParam = (event) => {
    setExist(false)
    setFilterParam(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with
          <input 
          value={filterParam}
          onChange={handleFilterParam}
          />
        </div>

      <form onSubmit={addPerson}>
      
        <h2>Add a new</h2>
        <div>
          name: 
          <input 
          value={newName}
          onChange={handleNewName}
          />
        </div>
        <div>number: 
        <input
          type='tel' 
          pattern="[0-9\-]+"
          placeholder="00-000-000"
          value={newNumber}
          onChange={handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons
        .filter(
          person => filterParam ? person.name.toLowerCase().includes(filterParam) : person.name
        )
        .map(
          person => <div>{person.name} {person.number}</div>
        )
      }
      {exist ? alert(`${newName} is already added to phonebook`) : '' }
    </div>
  )
}

export default App