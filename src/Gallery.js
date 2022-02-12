import axios from "axios";
import { Pagination } from "fwt-internship-uikit";
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import Card from "./Card"
import Pagination_c from "./Pagination_c";
import UI_kit from "./UI_kit";



function Gallery() {
  const [paintings, setPaintings] = useState([])
  const [authors, setAuthors] = useState([])
  const [locations, setLocations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [elementsPerPage, setElementsPerPage] = useState(9)

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
  
  console.log('Use effect-1 paintings', paintings)

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

  // Create elements
  const paintingsEls = paintings.map(el => <Card 
    key={uuidv4()} 
    imageUrl={el.imageUrl} 
    cardName={el.name}
    isLoading={isLoading}
  />)

  const loader = <h1>Loading...</h1>

  // Get elements to display on current page
  const indexOfLastElt = currentPage * elementsPerPage
  const indexOfFirstElt = indexOfLastElt - elementsPerPage
  const currentElts = paintingsEls.slice(indexOfFirstElt, indexOfLastElt)

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }



  return (
    <div>
      <div className="gallery__card-container">
        {isLoading ? loader : currentElts}
      </div>
      <div>
        <Pagination_c 
          elementsPerPage={elementsPerPage} 
          totalElements={paintings.length}
          paginate={paginate}
        />
      </div>
      <p>{JSON.stringify(paintings)}</p>
      <UI_kit></UI_kit>
    </div>
  )
}

export default Gallery

