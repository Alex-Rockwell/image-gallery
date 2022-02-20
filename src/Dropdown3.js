import { useRef, useState } from 'react'
import './Dropdown.css'
import { useThemeContext } from './ThemeProvider'
import useClickOutside from './hooks/useClickOutside'


function Dropdown3({title='Select option', filterFrom, filterBefore}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(title)
  const [fromVal, setFromVal] = useState('')
  const [beforeVal, setBeforeVal] = useState('')
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
    ${darkMode ? 'dropdown__options--dm' : ''} 
    dropdown__options--date`
  const dateInput = `dropdown__date-input ${darkMode ? 'dropdown__date-input--dm' : ''}`
  

  const handleInputFrom = (e) => {
    setFromVal(e.target.value)
    filterFrom(Number(e.target.value))
  }
  const handleInputBefore = (e) => {
    setBeforeVal(e.target.value)
    filterBefore(Number(e.target.value))
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
          <div className='dropdown__date'>
            <input 
              type={'text'}
              className={dateInput} 
              placeholder='from'
              value={fromVal}
              onChange={handleInputFrom}
            />
            <div className='dropdown__date-dash'></div>
            <input 
              type={'text'}
              className={dateInput} 
              placeholder='before'
              value={beforeVal}
              onChange={handleInputBefore}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dropdown3