const PersonForm = ({
    setExist, 
    newName,
    setNewName, 
    newNumber,
    setNewNumber,
    persons,
    setPersons,
    personsService,
    setNotification
}) => { 

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const isExist = (existName) => (persons.find((person)=> person.name === existName))

    const setSuccessMessage = (name) => {
       return {
            level:"success",
            message:`Added ${name}`
       } 
    }

    const setErrorMessage = (name) => {
        return {
             level:"error",
             message:`Cannot Add  ${name}`
        } 
     }

     const setDefaultMessage = (name) => {
        return {
             level:null,
             message:''
        } 
     }

    const addPerson = (event) => {
        event.preventDefault()
        const exist = isExist(newName)
        if(!exist){
          const newPerson = {
            name:`${newName}`,
            number:`${newNumber}`,
          };

          
          
          personsService
            .create(newPerson)
            .then((result)=>{
                const newPersons = persons.concat(result)
                setPersons(newPersons)
            })
            .then(()=>{
                setNotification(setSuccessMessage(newName))
                setTimeout(() => {setNotification(setDefaultMessage) }, 5000)
            })
            .catch(()=>{
                setNotification(setSuccessMessage(newName))
                setTimeout(() => {setNotification(setDefaultMessage) }, 5000)
            })
        }else{
            
            if(newNumber.length > 0){
                const updatePerson = {
                    number:`${newNumber}`
                };
                console.log(exist)

                personsService.update(exist.id,updatePerson).then((result)=>{
                    const updatedPersons = persons.map((person)=>{
                        console.log(person)
                        console.log(exist)
                        console.log(person.id === exist.id)
                        console.log(person.id == exist.id)
                        return person.id === result.id ? {...person,number:newNumber} : person;
                    })

                    console.log(updatedPersons)
                    setPersons(updatedPersons)

                    setNotification(setSuccessMessage(newName))
                    setTimeout(() => {setNotification(setDefaultMessage) }, 5000)
                })
            }else{
                setNotification(setErrorMessage(newName))
                setTimeout(() => {setNotification(setDefaultMessage) }, 5000)
            }
            
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