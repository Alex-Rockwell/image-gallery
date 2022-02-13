import { useState } from "react"


function Filters({filterByName, authors}) {
  const [searchName, setSearchName] = useState('')
  const handleSearchName = (e) => {
    setSearchName(e.target.value)
    filterByName(e.target.value)
  }

  return (
    <div className="filters">

      <input 
        className="filters__element" 
        type='text' 
        placeholder="Name" 
        onChange={handleSearchName}
        value={searchName}
      />

      <select className="filters__element">
        <option>Author</option>
        {authors.map(el => <option>{el.name}</option>)} 
      </select>

      <select className="filters__element">
        <option>Location</option>
      </select>

      <select className="filters__element">
        <option>Created</option>
      </select>

    </div>
  )
}

export default Filters