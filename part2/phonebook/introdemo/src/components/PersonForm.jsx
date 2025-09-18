const PersonForm = ({
    setExist, 
    newName,
    setNewName, 
    newNumber,
    setNewNumber,
    persons
}) => { 

    const handleNewName = (event) => {
        setExist(false)
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

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

    return (
        <form onSubmit={addPerson}>
            <div>
                name: 
                <input 
                    value={newName}
                    onChange={handleNewName}
                />
            </div>
            <div>
                number: 
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
    )
    
}

export default PersonForm