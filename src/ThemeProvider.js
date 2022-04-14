import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export function useThemeContext() {
  return useContext(ThemeContext)
}

function ThemeProvider({children}) {
  const [darkMode, setDarkMode] = useState(false)
  
  const toggleTheme = () => {
    setDarkMode(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={{darkMode, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider


