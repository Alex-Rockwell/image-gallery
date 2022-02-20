import { useRef, useState } from 'react'
import './Dropdown.css'
import { useThemeContext } from './ThemeProvider'
import useClickOutside from './hooks/useClickOutside'


function Dropdown2({optionsList, title='Select option', filter}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(title)
  const darkMode = useThemeContext()
    
  const dropdownRef = useRef()
  useClickOutside(dropdownRef, () => {
    setIsOpen(false)
  })
  
  const selectedVal = `dropdown__selected-val 
    ${isOpen ? 'dropdown__selected-val--open' : ''} 
    ${isOpen && darkMode ? 'dropdown__selected-val--opendm' : ''} 
    ${darkMode ? 'dropdown__selected-val--dm' : ''}`
  const arrow = `dropdown__arrow 
    ${isOpen ? 'dropdown__arrow--open' : ''}`
  const options = `dropdown__options 
    ${isOpen ? 'dropdown__options--open' : ''} 
    ${darkMode ? 'dropdown__options--dm' : ''}`
  const option = `dropdown__option 
    ${darkMode ? 'dropdown__option--dm' : ''}`
  
  const handleClick = (item) => {
    let titleText = item.location
    if (titleText.length >= 33) {
      titleText = titleText.slice(0, 33) + '...'
    }
    setSelected(titleText)
    setIsOpen(false)
    filter(item.id)
  }

  let optionsShort = []
  if (window.innerWidth > 1023) {
    optionsShort = optionsList.map(el => {
      if (el.location.length > 16) {
        el.location = el.location.slice(0, 16) + '...'
        return el
      }
      return el
    })
  } else if (window.innerWidth > 767 && window.innerWidth <= 1023) {
    optionsShort = optionsList.map(el => {
      if (el.location.length > 10) {
        el.location = el.location.slice(0, 10) + '...'
        return el
      }
      return el
    }) 
  } else {
    optionsShort = optionsList.map(el => {
      if (el.location.length > 22) {
        el.location = el.location.slice(0, 22) + '...'
        return el
      }
      return el
    }) 
  }

  return (
    <div>
      <div ref={dropdownRef} className="dropdown">
        <div 
          className="dropdown__control" 
          onClick={() => setIsOpen(!isOpen)} 
          tabIndex={0} 
          onKeyPress={() => setIsOpen(!isOpen)}
        >
          <div className={selectedVal}>{selected}</div>
          <div className={arrow}></div>
        </div>

        <div className={options}>
          {optionsShort.map(item => <div 
            className={option} 
            onClick={() => handleClick(item)} 
            key={item.id}>{item.location}</div>)}
        </div>

      </div>
    </div>
  )
}

export default Dropdown2