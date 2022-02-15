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

  // Loading data

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
  
  // console.log('Use effect-1 paintings', paintings)

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
  
  // Filter

  const filterByName = (str) => {
    setElements(paintings.filter((el) => {
      if (str === '') {
        return el
      } else if (el.name.toLowerCase().includes(str.toLowerCase())) {
        return el
      }
    }))
  }
  const filterByAuthor = (id) => {
    setElements(paintings.filter((el) => {
      if (!id) {
        return el
      } else if (id === el.authorId) {
        return el
      }
    }))
  }
  const filterByLocation = (id) => {
    setElements(paintings.filter((el) => {
      if (!id) {
        return el
      } else if (id === el.locationId) {
        return el
      }
    }))
  }
  const filterFrom = (fromVal) => {
    setElements(paintings.filter((el) => {
      if (!fromVal) {
        return el
      } else if (el.created > fromVal) {
        return el
      }
    }))
  }
  const filterBefore = (beforeVal) => {
    setElements(paintings.filter((el) => {
      if (!beforeVal) {
        return el
      } else if (el.created < beforeVal) {
        return el
      }
    }))
  }

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

