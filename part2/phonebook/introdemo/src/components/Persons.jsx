const Persons = ({
    persons, 
    setPersons,
    filter, 
    personsService
}) => { 
    const handleClick = (event) => {
        const data = event.target.dataset;
        const confirm = window.confirm(`Delete ${data.name}?`)
        if(confirm){
            personsService
            .remove(data.id)
            .then((data)=>{
                setPersons(persons.filter((person)=>person.id !== data.id))
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