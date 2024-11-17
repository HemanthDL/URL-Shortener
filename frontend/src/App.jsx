// import './App.css'
import Home from './components/Home'
import Signup from "./components/Signup"
import Login from "./components/Login"
import Main from "./components/Main"
// import './index.css'


import {createBrowserRouter , RouterProvider} from "react-router-dom"

function App() {
  const router = createBrowserRouter([
    {
      path : "/home",
      element : <><Main btnval1 = "login" btnval2 = "signup" /></>
    },
    {
      path : "/userpage",
      element : <><Home btnval1 = "" btnval2 = "logout" /></>
    },
    {
      path : "/signup",
      element : <><Signup btnval1 = "" btnval2 = "home" /></>
    },
    {
      path : "/login",
      element : <><Login btnval1 = "" btnval2 = "home" /></>
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
