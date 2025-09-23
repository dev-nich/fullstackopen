const Persons = ({
    persons, 
    setPersons,
    filter, 
    personsService,
    setNotification
}) => { 
    const setSuccessMessage = (name) => {
        return {
             level:"success",
             message:`Removed ${name}`
        } 
     }
 
     const setErrorMessage = (name) => {
         return {
              level:"error",
              message:`Information of  ${name} has already been removed from the server`
         } 
      }
 
      const setDefaultMessage = (name) => {
         return {
              level:null,
              message:''
         } 
      }

    const handleClick = (event) => {
        const data = event.target.dataset;
        const confirm = window.confirm(`Delete ${data.name}?`)
        if(confirm){
            personsService
            .remove(data.id)
            .then((data)=>{
                setPersons(persons.filter((person)=>person.id !== data.id))
            })
            .then(()=>{
                setNotification(setSuccessMessage(data.name))
                setTimeout(() => {setNotification(setDefaultMessage) }, 5000)
            })
            .catch(()=>{
                setNotification(setErrorMessage(data.name))
                setTimeout(() => {setNotification(setDefaultMessage) }, 5000)
            })
        }
    }
    return (
    <div>
        { 
            persons
            .filter(person => filter ? person.name.toLowerCase().includes(filter.toLowerCase()) : person.name)
            .map(person => 
            <div>
                {person.name} {person.number} 
                <button
                    id={person.id}
                    onClick={handleClick} 
                    data-name={person.name}
                    data-id={person.id}
                >
                    delete
                </button>  
            </div>
            )
        }
    </div>
    )
}

export default Persons