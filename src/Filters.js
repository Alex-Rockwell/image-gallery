import { useState } from "react"
import Dropdown1 from './Dropdown1'
import Dropdown2 from "./Dropdown2"
import Dropdown3 from "./Dropdown3"
import './Filters.css'


function Filters({filterByName, authors, filterByAuthor, locations, filterByLocation, filterFrom, filterBefore}) {
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

      <Dropdown1 optionsList={authors} title={'Author'} filter={filterByAuthor}/>
      
      <Dropdown2 optionsList={locations} title={'Location'} filter={filterByLocation}/>

      <Dropdown3 title={'Created'} filterFrom={filterFrom} filterBefore={filterBefore}/>

    </div>
  )
}

export default Filters