import axios from "axios";
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import Card from "./Card"
import Filters from "./Filters";
import Pagination_c from "./Pagination_c";
import './Gallery.css'



function Gallery() {
  const [paintings, setPaintings] = useState([])
  const [authors, setAuthors] = useState([])
  const [locations, setLocations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [elementsPerPage, setElementsPerPage] = useState(9)
  const [elements, setElements] = useState([...paintings])


  // Load data

  useEffect(() => {
    async function getPaintings() {
      setIsLoading(true)
      const res1 = await axios.get(`https://test-front.framework.team/paintings`)
      const res2 = await axios.get(`https://test-front.framework.team/authors`)
      const res3 = await axios.get(`https://test-front.framework.team/locations`)
      setPaintings(res1.data)
      setAuthors(res2.data)
      setLocations(res3.data)
      setIsLoading(false)
    }
    getPaintings()
  }, [])


  // Add authors and locations

  useEffect(() => {
    setPaintings((prev) => {
      const newarr = prev.map(p => {
        let val = authors.find(a => a.id === p.authorId)
        return {...p, authorName: val.name}
      })
      return newarr
    })
  }, [authors])
  useEffect(() => {
    setPaintings((prev) => {
      const newarr = prev.map(p => {
        let val2 = locations.find(l => l.id === p.locationId)
        return {...p, locationName: val2.location}
      })
      return newarr
    })
  }, [locations])

  
  const loader = <h1>Loading...</h1>
  

  // Create elements

  useEffect(() => {
    setElements(paintings)
  }, [paintings, authors, locations])
        
  const paintingsEls = elements.map(el => <Card 
    key={uuidv4()} 
    imageUrl={el.imageUrl} 
    cardName={el.name}
    isLoading={isLoading}
    authorId={el.authorId}
    locationId={el.locationId}
    created={el.created}
  />)


  // Pagination values

  const indexOfLastElt = currentPage * elementsPerPage
  const indexOfFirstElt = indexOfLastElt - elementsPerPage
  const currentElts = paintingsEls.slice(indexOfFirstElt, indexOfLastElt)

  const [totalElements, setTotalElements] = useState(elements.length)
  useEffect(() => {
    setTotalElements(elements.length)
  }, [elements])
  
  // Change page

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  
  
  // Filters

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

  let cond1 = (el) => !filterName || el.name.toLowerCase().includes(filterName.toLowerCase())
  let cond2 = (el) => !filterAuthor || filterAuthor === el.authorId
  let cond3 = (el) => !filterLocation || filterLocation === el.authorId
  let cond4 = (el) => !filterFromVal || el.created >= filterFromVal
  let cond5 = (el) => !filterBeforeVal || el.created <= filterBeforeVal
  let condArray = [cond1, cond2, cond3, cond4, cond5];

  useEffect(() => {
    setElements(paintings.filter(el => condArray.every(cond => cond(el) === true)))
  }, [filterName, filterAuthor, filterLocation, filterFromVal, filterBeforeVal])


  return (
    <div className="container">
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
        {isLoading ? loader : currentElts}
      </div>
      <Pagination_c 
        elementsPerPage={elementsPerPage} 
        totalElements={totalElements}
        paginate={paginate}
      />


      <br/>
      <br/>
      <br/>
      <p style={{fontSize: '20px'}}>{JSON.stringify(paintings)}</p>
      <br/>
      <br/>
      <br/>
      <p style={{fontSize: '20px'}}>{JSON.stringify(authors)}</p>
      <br/>
      <br/>
      <br/>
      <p style={{fontSize: '20px'}}>{JSON.stringify(locations)}</p>
    </div>
  )
}

export default Gallery

