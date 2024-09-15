import './App.css'
import Home from './components/Home'
import Signup from "./components/Signup"
import Login from "./components/Login"
import Main from "./components/Main"

import {createBrowserRouter , RouterProvider} from "react-router-dom"

function App() {
  const router = createBrowserRouter([
    {
      path : "/",
      element : <><Main/></>
    },
    {
      path : "/home",
      element : <><Home/></>
    },
    {
      path : "/signup",
      element : <><Signup/></>
    },
    {
      path : "/login",
      element : <><Login/></>
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
