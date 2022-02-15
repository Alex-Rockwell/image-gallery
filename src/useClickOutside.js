import { useEffect } from "react"

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

export default useClickOutside