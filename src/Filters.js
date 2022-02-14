import { useState } from "react"
import Dropdown from './Dropdown'


function Filters({filterByName, authors, filterByAuthor}) {
  const [searchName, setSearchName] = useState('')
  const handleSearchName = (e) => {
    setSearchName(e.target.value)
    filterByName(e.target.value)
  }

  return (
    <div className="filters">

      <input 
        className="filters__search-input" 
        type='text' 
        placeholder="Name" 
        onChange={handleSearchName}
        value={searchName}
      />

      <Dropdown optionsList={authors} title={'Author'} filter={filterByAuthor}/>

    </div>
  )
}

export default Filters