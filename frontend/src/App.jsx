// import './App.css'
import Home from './pages/Home'
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Main from "./pages/Main"
// import './index.css'


import {createBrowserRouter , RouterProvider} from "react-router-dom"

function App() {
  const router = createBrowserRouter([
    {
      path : "/",
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
