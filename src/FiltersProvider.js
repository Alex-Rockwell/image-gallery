import React, {createContext, useContext, useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';

const FilterContext = createContext();
export function useFilterContext() {
  return useContext(FilterContext);
}

function FiltersProvider({children}) {
  // Get search params

  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';

  // let authorId = searchParams.get('authorId') || ''
  // let locationId = searchParams.get('locationId') || ''
  // let created_gte = searchParams.get('created_gte') || ''
  // let created_lte = searchParams.get('created_lte') || ''

  // Filters

  const [filterName, setFilterName] = useState(q);
  const [filterAuthor, setFilterAuthor] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterFromVal, setFilterFromVal] = useState('');
  const [filterBeforeVal, setFilterBeforeVal] = useState('');

  const setFilters = {
    filterByName: (str) => setFilterName(str),
    filterByAuthor: (id) => setFilterAuthor(id),
    filterByLocation: (id) => setFilterLocation(id),
    filterFrom: (fromVal) => setFilterFromVal(fromVal),
    filterBefore: (beforeVal) => setFilterBeforeVal(beforeVal),
  };

  const [filtersState, setFiltersState] = useState([]);

  useEffect(() => {
    const urlString = !filterName ? '' : `&q=${filterName}`;
    const urlAuthor = !filterAuthor ? '' : `&authorId=${filterAuthor}`;
    const urlLocation = !filterLocation ? '' : `&locationId=${filterLocation}`;
    const urlFrom = !filterFromVal ? '' : `&created_gte=${filterFromVal}`;
    const urlBefore = !filterBeforeVal ? '' : `&created_lte=${filterBeforeVal}`;

    setFiltersState([urlString, urlAuthor, urlLocation, urlFrom, urlBefore]);
  }, [filterName, filterAuthor, filterLocation, filterFromVal,
    filterBeforeVal]);

  return (
    <FilterContext.Provider value={{filtersState, setFilters}}>
      {children}
    </FilterContext.Provider>
  );
}

export default FiltersProvider;

