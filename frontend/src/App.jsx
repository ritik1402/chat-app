import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <h1 class="text-3xl font-bold underline text-blue-600/100 dark:text-sky-400/100">
    Hello world!
  </h1>
    </>
  )
}

export default App
