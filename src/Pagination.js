import { useEffect, useState } from "react"
import {ReactComponent as LeftArrow2} from './svg/arrowLeft2.svg'
import {ReactComponent as LeftArrow1} from './svg/arrowLeft1.svg'
import {ReactComponent as RightArrow1} from './svg/arrowRight1.svg'
import {ReactComponent as RightArrow2} from './svg/arrowRight2.svg'
import './Pagination.css'
import { useThemeContext } from "./ThemeProvider"


function Pagination(props) {
  const {elementsPerPage, totalElements, paginate, filtersState} = props
  const pageNumbers = [1]
  const [currentPage, setCurrentPage] = useState(1)
  const darkMode = useThemeContext()
  
  for (let i = 2; i <= Math.ceil(totalElements / elementsPerPage); i++) {
    pageNumbers.push(i)
  }
  
  const handlePageNumber = (number) => {
    setCurrentPage(number)
  }
  
  useEffect(() => {
    paginate(currentPage)
  }, [currentPage, paginate])

  // Reset page if filters is active

  useEffect(() => {
    setCurrentPage(1)
  }, [filtersState])

  // Class names

  const isBeginActive = (currentPage === pageNumbers[0]) ? false : true
  const isEndActive = (pageNumbers.length < 2 || currentPage === pageNumbers[pageNumbers.length - 1]) ? false : true

  const beginBtns = `pagination__item 
    ${isBeginActive ? 'pagination__item--hoverable' : 'pagination__item--disable'} 
    ${darkMode ? 'pagination__item--dm' : ''} 
    ${(darkMode && isBeginActive) ? 'pagination__item--hoverabledm' : ''} 
    ${(darkMode && !isBeginActive) ? 'pagination__item--disabledm' : ''}`
    
  const endBtns = `pagination__item 
    ${isEndActive ? 'pagination__item--hoverable' : 'pagination__item--disable'} 
    ${darkMode ? 'pagination__item--dm' : ''} 
    ${(darkMode && isEndActive) ? 'pagination__item--hoverabledm' : ''} 
    ${(darkMode && !isEndActive) ? 'pagination__item--disabledm' : ''}`
  
  const pagination = `pagination ${darkMode ? 'pagination--dm' : ''}`

  const page = (number) => {
    return `pagination__item 
    ${(number === currentPage) ? 'pagination__item--active' : 'pagination__item--hoverable'} 
    ${darkMode ? 'pagination__item--dm' : ''} 
    ${number === currentPage && darkMode ? 'pagination__item--activedm' : ''} 
    ${!(number === currentPage) && darkMode ? 'pagination__item--hoverabledm' : ''} 
    `
  }


  return (
    <div>
      <nav>
        <ul className={pagination}>
          <li onClick={() => setCurrentPage(1)} className={beginBtns + ' pagination__item--left'}>
            <LeftArrow2 />
          </li>
          <li onClick={() => setCurrentPage(prev => prev - 1)} className={beginBtns}>
            <LeftArrow1 />
          </li>
          {pageNumbers.map(number => {
            return (
                <li 
                  key={number} 
                  className={page(number)}
                  onClick={() => handlePageNumber(number)}
                >
                    {number}
                </li>
            )
          })}
          <li onClick={() => setCurrentPage(prev => prev + 1)} className={endBtns}>
            <RightArrow1 />
          </li>
          <li onClick={() => setCurrentPage(pageNumbers.length)} className={endBtns + ' pagination__item--right'}>
            <RightArrow2 />
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination