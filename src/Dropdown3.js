import { useRef, useState } from 'react'
import './Dropdown.css'
import useClickOutside from './useClickOutside'


function Dropdown3({title='Select option', filterFrom, filterBefore}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(title)
  const [fromVal, setFromVal] = useState('')
  const [beforeVal, setBeforeVal] = useState('')
    
  const dropdownRef = useRef()
  useClickOutside(dropdownRef, () => {
    setIsOpen(false)
  })
  
  const selectedVal = `dropdown__selected-val ${isOpen ? 'dropdown__selected-val--open' : ''}`
  const arrow = `dropdown__arrow ${isOpen ? 'dropdown__arrow--open' : ''}`
  const options = `dropdown__options ${isOpen ? 'dropdown__options--open' : ''}`
  

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
              className='dropdown__date-input' 
              placeholder='from'
              value={fromVal}
              onChange={handleInputFrom}
            />
            <div className='dropdown__date-dash'></div>
            <input 
              type={'text'}
              className='dropdown__date-input' 
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