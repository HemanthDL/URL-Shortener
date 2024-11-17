import { useState } from 'react'
import { PiEyeBold, PiEyeClosedBold  } from "react-icons/pi";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
// import Cookies from 'js-cookie'
import './Signup.css'    

function Login(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState:{errors,isSubmitting}, 
  } = useForm()

  const [visible, setvisible] = useState(false);
  const [servererror, setservererror] = useState('')

  const navigate = useNavigate()

  const handleEye = () =>{
    setvisible(!visible);
  }

  const delay = (time)=>{
    return new Promise((resolve,reject)=>{
      setTimeout(() => {
        resolve()
      }, time*1000);
    })
  }

  const onSubmit = async(data) => {
    // await delay(4);
    const res = await fetch("http://localhost:1927/user/login",{
      method : "POST",
      body : JSON.stringify(data),
      headers : {
        "Content-Type" : "application/json",
      },
      credentials: 'include'
    })
    const d = await res.json()
    if(d.success){
      // Cookies.set(d.uidName,d.cookie,{expires:1})
      // navigate("/home",{state : {uuid : d.uidName}})
      navigate("/userpage")
      return
    }
    else{
      setservererror(d.message)
    }
  }

  return (
    <>
    <Navbar btnval1 = {props.btnval1} btnval2 = {props.btnval2} />
   <div className="maindivforlogin">
      <h2>Login!</h2>
      <div className="container">
        {isSubmitting && <div>Loading...</div>}
        <form className='form-box' action="" onSubmit={handleSubmit(onSubmit)}>
          <input {...register("email",{required:true,
            })} type="text"  placeholder='Enter Email'/>
          <div className="password-block">
            <input type={visible?"text":"password"}
            {...register("password",{
              required:true,
            })} placeholder='Enter Password'/>
            <span onClick={handleEye}>
              {visible? <PiEyeBold />: <PiEyeClosedBold />}
            </span>
          </div>
          <button disabled={isSubmitting} type="submit">Login</button>
        </form>
        <div className="errors">
          {servererror.length > 0 && <p>Error : {servererror}</p>}
        </div>
        <div className="acc">
          <p>Don't have an account?&nbsp;<strong><a href='/signup'>Sign up</a></strong></p>
        </div>
      </div>
   </div>
   </>
  )
}

export default Login
