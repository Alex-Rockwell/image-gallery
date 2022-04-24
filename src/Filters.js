import React, {useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import Dropdown1 from './Dropdown1';
import Dropdown2 from './Dropdown2';
import Dropdown3 from './Dropdown3';
import './Filters.css';
import {useFilterContext} from './FiltersProvider';
import {useThemeContext} from './ThemeProvider';


function Filters(props) {
  const {authors, locations} = props;

  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';

  const {darkMode} = useThemeContext();
  const [searchName, setSearchName] = useState(q || '');

  const {setFilters} = useFilterContext();
  const filterByName = setFilters.filterByName;

  const handleSearchName = (e) => {
    setSearchName(e.target.value);
    filterByName(e.target.value);
  };

  return (
    <div className="filters">

      <input
        className={`filters__search-input 
          ${darkMode ? 'filters__search-input--dm' : ''}`}
        type='text'
        placeholder="Name"
        onChange={handleSearchName}
        value={searchName}
      />

      <Dropdown1
        optionsList={authors}
        title={'Author'}
      />

      <Dropdown2
        optionsList={locations}
        title={'Location'}
      />

      <Dropdown3
        title={'Created'}
      />

    </div>
  );
}

export default Filters;
