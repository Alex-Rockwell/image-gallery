import { useEffect, useRef, useState } from 'react'
import './Dropdown.css'

const useClickOutside = (ref, handeler) => {
  useEffect(() => {
    const outHandeler = (e) => {
      if (!ref.current.contains(e.target)) {
        handeler()
      }
    }
    document.addEventListener('mousedown', outHandeler)
    
    return () => {
      document.removeEventListener('mousedown', outHandeler)
    }
  }, [ref])
}




function Dropdown({optionsList, title='Select option', filter}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(title)
    
  const dropdownRef = useRef()
  useClickOutside(dropdownRef, () => {
    setIsOpen(false)
  })
  
  const selectedVal = `dropdown__selected-val ${isOpen ? 'dropdown__selected-val--open' : ''}`
  const arrow = `dropdown__arrow ${isOpen ? 'dropdown__arrow--open' : ''}`
  const options = `dropdown__options ${isOpen ? 'dropdown__options--open' : ''}`
  
  const handleClick = (item) => {
    setSelected(item.name)
    setIsOpen(false)
    filter(item.id)
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
          {optionsList.map(item => <div className='dropdown__option' onClick={() => handleClick(item)}>{item.name}</div>)}
        </div>
      </div>
    </div>
  )
}

export default Dropdown