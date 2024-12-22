import { useState } from 'react'
import './App.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/auth/Login.jsx'
import Signup from './components/auth/Signup.jsx'
import Jobs from './components/Jobs.jsx' 
import Browse from './components/Browse'

const appRouter = createBrowserRouter([
  {
    path:'/',
    element: <Home/>
  },
  {
    path:'/login',
    element: <Login/>
  },
  {
    path:'/signup',
    element: <Signup/>
  },
  {
    path:'/jobs',
    element: <Jobs/>
  },
  {
    path:'/browse',
    element: <Browse/>
  }
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router = {appRouter} /> 
    </>
  )
}

export default App
