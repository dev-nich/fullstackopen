import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [exist, setExist] = useState(false)
  const isExist = (existName) => (persons.some(({name})=> name === existName))

  
  const addPerson = (event) => {
    event.preventDefault()
    const exist = isExist(newName)
    setExist(exist)
    if(!exist){
      const newPerson = {name:`${newName}`};
      setPersons(persons.concat(newPerson))
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
    setExist(isExist(event.target.value))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
          value={newName}
          onChange={handleNewName}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
         <div>{person.name}</div>
        )}
      {exist ? alert(`${newName} is already added to phonebook`) : '' }
    </div>
  )
}

export default App