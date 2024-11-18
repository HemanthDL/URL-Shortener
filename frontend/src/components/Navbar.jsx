import React from 'react'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom'


const Navbar = (props) => {

  const navigate = useNavigate()

  const handleLogoutButton = async ()=>{
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/logout`,{
      method : "GET",
      headers : {
        "Content-Type" : "application/json",
      },
      credentials: 'include'
    })

    const d = await response.json()

    if(d.success){
      navigate("/home")
      return
    }
    else{
      alert("error...")
    }


  }
  return (
    <>
      <nav className='navbar'>
        <div></div>
        <div className="buttons">
            {props.btnval1 && <a href={"/" + props.btnval1}><button>{props.btnval1.toUpperCase()}</button></a>}
            {(props.btnval2 && props.btnval2 != "logout")?<a href={"/" + props.btnval2}><button>{props.btnval2.toUpperCase()}</button></a> : <button onClick={handleLogoutButton}>{props.btnval2.toUpperCase()}</button>}
        </div>
      </nav>
    </>
  )
}

export default Navbar
