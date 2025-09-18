const Persons = ({persons, filter}) => { 
    return (
    <div>
        { 
            persons
            .filter(person => filter ? person.name.toLowerCase().includes(filter.toLowerCase()) : person.name)
            .map(person => <div>{person.name} {person.number}</div>)
        }
    </div>
    )
}

export default Persons