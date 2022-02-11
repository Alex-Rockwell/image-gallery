import axios from "axios";
import { Pagination } from "fwt-internship-uikit";
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import Card from "./Card"
import Pagination_c from "./Pagination_c";
import UI_kit from "./UI_kit";



function Gallery() {
  const [paintings, setPaintings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [elementsPerPage, setElementsPerPage] = useState(9)

  // Loading data
  useEffect(() => {
    async function getPaintings() {
      setIsLoading(true)
      const res = await axios.get(`https://test-front.framework.team/paintings`)
      setPaintings(res.data)
      setIsLoading(false)
    }
    getPaintings()
    }, [])
  console.log(paintings)

  // Create elements
  const paintingsEls = paintings.map(el => <Card 
    key={uuidv4()} 
    imageUrl={el.imageUrl} 
    cardName={el.name}
    isLoading={isLoading}/>)

  const loader = <h1>Loading...</h1>

  // Get elements to display on current page
  const indexOfLastElt = currentPage * elementsPerPage
  const indexOfFirstElt = indexOfLastElt - elementsPerPage
  const currentElts = paintingsEls.slice(indexOfFirstElt, indexOfLastElt)

  return (
    <div>
      <div className="gallery__card-container">
        {isLoading ? loader : currentElts}
      </div>
      <div>
        <Pagination_c elementsPerPage={elementsPerPage} totalElements={paintings.length}/>
      </div>
      <p>{JSON.stringify(paintings)}</p>
      <UI_kit></UI_kit>
    </div>
  )
}

export default Gallery