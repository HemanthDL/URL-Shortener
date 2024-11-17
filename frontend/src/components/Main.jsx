import React from 'react'
import Navbar from './Navbar'
import "./main.css"
import '../App.css'

const Main = (props) => {
  return (
    <>
    <div className="navbar">
      <Navbar btnval1 = {props.btnval1} btnval2 = {props.btnval2} />
      <div className="content">
        <h1>   
          URL - Shortner App
        </h1>
        <h2>
          Create a Short URL for your Website...
        </h2>
      </div>
    </div>
    </>
  )
}

export default Main
