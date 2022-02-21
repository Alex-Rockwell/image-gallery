import axios from "axios";
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import Card from "./Card"
import Filters from "./Filters";
import Pagination from "./Pagination";
import {ReactComponent as Logo} from './svg/logo.svg'
import {ReactComponent as DarkModeIcon} from './svg/darkModeIcon.svg'
import './Gallery.css'
import { useThemeContext, useThemeToggle } from "./ThemeProvider";
const initUrl = `https://test-front.framework.team/paintings`


function Gallery() {
  const [paintings, setPaintings] = useState([])
  const [authors, setAuthors] = useState([])
  const [locations, setLocations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [elements, setElements] = useState([])

  const darkMode = useThemeContext()
  const toggleTheme = useThemeToggle()

  // Set elements per page
  
  function getElementsPerPage(width) {
    if (width <= 767) {
      return 6
    } else if (width <= 1023) {
      return 8
    } else if (width >= 1024) {
      return 9
    }
  }

  const [width, setWidth] = useState(window.innerWidth)

  const changeWidth = () => {
    setWidth(window.innerWidth) 
  }
  useEffect(() => {
    window.addEventListener('resize', changeWidth)
    return () => {
      window.removeEventListener('resize', changeWidth)
    } 
  }, [])

  useEffect(() => {
    setElementsPerPage(getElementsPerPage(width))
  }, [width])

  // Filters

  const [filterName, setFilterName] = useState('')
  const [filterAuthor, setFilterAuthor] = useState('')
  const [filterLocation, setFilterLocation] = useState('')
  const [filterFromVal, setFilterFromVal] = useState('')
  const [filterBeforeVal, setFilterBeforeVal] = useState('')

  const filterByName = (str) => setFilterName(str)
  const filterByAuthor = (id) => setFilterAuthor(id)
  const filterByLocation = (id) => setFilterLocation(id)
  const filterFrom = (fromVal) => setFilterFromVal(fromVal)
  const filterBefore = (beforeVal) => setFilterBeforeVal(beforeVal)

  const [filtersState, setFiltersState] = useState([])

  useEffect(() => {
    let urlString = !filterName ? '' : `&q=${filterName}`
    let urlAuthor = !filterAuthor ? '' : `&authorId=${filterAuthor}`
    let urlLocation = !filterLocation ? '' : `&locationId=${filterLocation}`
    let urlFrom = !filterFromVal ? '' : `&created_gte=${filterFromVal}`
    let urlBefore = !filterBeforeVal ? '' : `&created_lte=${filterBeforeVal}` 
    
    setFiltersState([urlString, urlAuthor, urlLocation, urlFrom, urlBefore])

  }, [filterName, filterAuthor, filterLocation, filterFromVal, filterBeforeVal])

  // Pagination values

  const [currentPage, setCurrentPage] = useState(1)
  const [elementsPerPage, setElementsPerPage] = useState(() => {
    return getElementsPerPage(window.innerWidth)
  })
  const [totalElements, setTotalElements] = useState(paintings.length)

  useEffect(() => {
    setTotalElements(paintings.length)
  }, [paintings])
  
  // Change page

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Add authors and locations

  useEffect(() => {
    setElements((prev) => {
      const newarr = prev.map(p => {
        let val = authors.find(a => a.id === p.authorId)
        return {...p, authorName: val.name}
      })
      return newarr
    })
  }, [authors, currentPage])

  useEffect(() => {
    setElements((prev) => {
      const newarr = prev.map(p => {
        let val2 = locations.find(l => l.id === p.locationId)
        return {...p, locationName: val2.location}
      })
      return newarr
    })
  }, [locations, currentPage])

  // Load data and elements on page

  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      
      let string = `${initUrl}?${filtersState.join('')}`
      
      const res1 = await axios.get(string)
      setPaintings(res1.data)
      
      let firstString = initUrl + `?_page=${currentPage}&_limit=${elementsPerPage}`
      let finalString = firstString + filtersState.join('')
      
      const res2 = await axios.get(finalString)
      setElements(res2.data)

      const res3 = await axios.get(`https://test-front.framework.team/authors`)
      const res4 = await axios.get(`https://test-front.framework.team/locations`)
      setAuthors(res3.data)
      setLocations(res4.data)

      setIsLoading(false)     
    }

    getData()
  }, [filtersState, currentPage, elementsPerPage])
 

  // Create elements

  const loader = <h1>Loading...</h1>
        
  const paintingsEls = elements.map(el => {
    return <Card 
    key={uuidv4()} 
    imageUrl={el.imageUrl} 
    cardName={el.name}
    authorName={el.authorName}
    locationName={el.locationName}
    created={el.created}
    />
  })



  return (
    <div className={`gallery ${darkMode ? 'gallery--dm' : ''}`}>
      <div className="container">
        <header className="gallery__header">
          <Logo />
          <DarkModeIcon 
            className={`gallery__darkmode-icon ${darkMode ? 'gallery__darkmode-icon--dm' : ''}`}
            onClick={toggleTheme}
          />
        </header>
        <Filters 
          filterByName={filterByName}
          authors={authors}
          filterByAuthor={filterByAuthor}
          locations={locations}
          filterByLocation={filterByLocation}
          filterFrom={filterFrom}
          filterBefore={filterBefore}
        />
        <div className="gallery__card-container">
          {isLoading ? loader : paintingsEls}
        </div>
        <Pagination 
          elementsPerPage={elementsPerPage} 
          totalElements={totalElements}
          paginate={paginate}
          filtersState={filtersState}
        />
      </div>
    </div>
  )
}

export default Gallery

