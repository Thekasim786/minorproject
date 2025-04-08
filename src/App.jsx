import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Navbar from './components/NavbarLogin'
import NavbarLogout from './components/NavbarLogout'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavbarLogout/>
    </>
  )
}

export default App
