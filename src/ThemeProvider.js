import { createContext, useContext, useState } from 'react'


const ThemeContext = createContext()
const ThemeToggle = createContext()

export function useThemeContext() {
  return useContext(ThemeContext)
}
export function useThemeToggle() {
  return useContext(ThemeToggle)
}


function ThemeProvider({children}) {
  const [darkMode, setDarkMode] = useState(false)
  
  const toggleTheme = () => {
    setDarkMode(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={darkMode}>
      <ThemeToggle.Provider value={toggleTheme}>
        {children}
      </ThemeToggle.Provider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider


