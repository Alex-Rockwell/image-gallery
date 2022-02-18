import axios from "axios";
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import Card from "./Card"
import Filters from "./Filters";
import Pagination_c from "./Pagination_c";
import {ReactComponent as Logo} from './logo.svg'
import {ReactComponent as DarkModeIcon} from './darkModeIcon.svg'
import './Gallery.css'
import { useThemeContext, useThemeToggle } from "./ThemeProvider";




function Gallery() {
  const [paintings, setPaintings] = useState([])
  const [authors, setAuthors] = useState([])
  const [locations, setLocations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [elements, setElements] = useState([])
  const [isFiltersNotEmpty, setIsFiltersNotEmpty] = useState(false)

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

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth) 
    })
  }, [])

  useEffect(() => {
    setElementsPerPage(getElementsPerPage(width))
  }, [width])


  // Load data

  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      const res1 = await axios.get(`https://test-front.framework.team/paintings`)
      const res2 = await axios.get(`https://test-front.framework.team/authors`)
      const res3 = await axios.get(`https://test-front.framework.team/locations`)
      setPaintings(res1.data)
      setAuthors(res2.data)
      setLocations(res3.data)
      setIsLoading(false)
    }
    getData()
  }, [])
 
  const loader = <h1>Loading...</h1>
  
  // Pagination values

  const [currentPage, setCurrentPage] = useState(1)
  const [elementsPerPage, setElementsPerPage] = useState(() => {
    return getElementsPerPage(window.innerWidth)
  })
  const [totalElements, setTotalElements] = useState(paintings.length)
  useEffect(() => {
    if (!isFiltersNotEmpty) {
      setTotalElements(paintings.length)
    } else {
      setTotalElements(elements.length)
    }
  }, [paintings, isFiltersNotEmpty])
  
  // Change page

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Load elements
 
  const initUrl = `https://test-front.framework.team/paintings`

  useEffect(() => {
    async function displayElements() {
      setIsLoading(true)
      
      let currentUrl = initUrl + `?_page=${currentPage}&_limit=${elementsPerPage}`
      const res = await axios.get(currentUrl)
      setElements(res.data)
      const res2 = await axios.get(`https://test-front.framework.team/authors`)
      const res3 = await axios.get(`https://test-front.framework.team/locations`)
      setAuthors(res2.data)
      setLocations(res3.data)

      setIsLoading(false)
    }
    displayElements()
  }, [currentPage, elementsPerPage])

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

  // Create elements
        
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

  //Filters2

  const [filterName, setFilterName] = useState('')
  const [filterAuthor, setFilterAuthor] = useState()
  const [filterLocation, setFilterLocation] = useState()
  const [filterFromVal, setFilterFromVal] = useState()
  const [filterBeforeVal, setFilterBeforeVal] = useState()

  const filterByName = (str) => setFilterName(str)
  const filterByAuthor = (id) => setFilterAuthor(id)
  const filterByLocation = (id) => setFilterLocation(id)
  const filterFrom = (fromVal) => setFilterFromVal(fromVal)
  const filterBefore = (beforeVal) => setFilterBeforeVal(beforeVal)

  useEffect(() => {
    async function displayFiltered() {
      setIsLoading(true)
      
      
      let urlString = !filterName ? '' : `&q=${filterName}`
      let urlAuthor = !filterAuthor ? '' : `&authorId=${filterAuthor}`
      let urlLocation = !filterLocation ? '' : `&locationId=${filterLocation}`
      let urlFrom = !filterFromVal ? '' : `&created_gte=${filterFromVal}`
      let urlBefore = !filterBeforeVal ? '' : `&created_lte=${filterBeforeVal}`    
      let filtersArray = [urlString, urlAuthor, urlLocation, urlFrom, urlBefore]
           
      let firstString = initUrl + `?_page=${1}&_limit=${elementsPerPage}`
      let finalString = firstString + filtersArray.join('')
      
      const res = await axios.get(finalString)
      setElements(res.data)
      const res2 = await axios.get(`https://test-front.framework.team/authors`)
      const res3 = await axios.get(`https://test-front.framework.team/locations`)
      setAuthors(res2.data)
      setLocations(res3.data)


      if (filtersArray.some(el => el.length > 0)) {
        setIsFiltersNotEmpty(true)
      } else {
        setIsFiltersNotEmpty(false)
      }

      setIsLoading(false)
    }
    displayFiltered()
  }, [filterName, filterAuthor, filterLocation, filterFromVal, filterBeforeVal])




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
        <Pagination_c 
          elementsPerPage={elementsPerPage} 
          totalElements={totalElements}
          paginate={paginate}
        />
      </div>
    </div>
  )
}

export default Gallery

