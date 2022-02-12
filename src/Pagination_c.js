import { useEffect, useState } from "react"
import {ReactComponent as LeftArrow2} from './arrowLeft2.svg'
import {ReactComponent as LeftArrow1} from './arrowLeft1.svg'
import {ReactComponent as RightArrow1} from './arrowRight1.svg'
import {ReactComponent as RightArrow2} from './arrowRight2.svg'


function Pagination_c({elementsPerPage, totalElements, paginate}) {
  const pageNumbers = []
  const [currentPage, setCurrentPage] = useState(1)

  for (let i = 1; i < Math.ceil(totalElements / elementsPerPage); i++) {
    pageNumbers.push(i)
  }

  const handlePageNumber = (number) => {
    setCurrentPage(number)
  }
  
  useEffect(() => {
    paginate(currentPage)
  }, [currentPage])

  const isBeginActive = (currentPage === pageNumbers[0]) ? false : true
  const isEndActive = (currentPage === pageNumbers[pageNumbers.length - 1]) ? false : true

  const classBeginBtns = `pagination__item ${isBeginActive ? 'pagination__item--hoverable' : 'pagination__item--disable'}`
  const classEndBtns = `pagination__item ${isEndActive ? 'pagination__item--hoverable' : 'pagination__item--disable'}`

  return (
    <div>
      <nav>
        <ul className="pagination">
          <li onClick={() => setCurrentPage(1)} className={classBeginBtns + ' pagination__item--left'}>
            <LeftArrow2 />
          </li>
          <li onClick={() => setCurrentPage(prev => prev - 1)} className={classBeginBtns}>
            <LeftArrow1 />
          </li>
          {pageNumbers.map(number => {
            return (
              <>
                <li 
                  key={number} 
                  className={`pagination__item ${(number === currentPage) ? 'pagination__item--active' : 'pagination__item--hoverable'}`}
                  onClick={() => handlePageNumber(number)}
                >
                    {number}
                </li>
              </>
            )
          })}
          <li onClick={() => setCurrentPage(prev => prev + 1)} className={classEndBtns}>
            <RightArrow1 />
          </li>
          <li onClick={() => setCurrentPage(pageNumbers.length)} className={classEndBtns + ' pagination__item--right'}>
            <RightArrow2 />
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination_c