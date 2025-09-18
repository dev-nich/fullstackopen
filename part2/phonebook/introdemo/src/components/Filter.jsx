


const Filter = (filter, setFilter) => { 

    const handleFilterParam = (event) => {
        // setExist(false)
        setFilter(event.target.value)
      }

    return (
    <div>
        filter shown with
        <input 
        value={filter}
        onChange={handleFilterParam}
        />
    </div>
    )
    
}

export default Filter