import { useState } from 'react'
import { PiEyeBold, PiEyeClosedBold  } from "react-icons/pi";
import { useForm } from 'react-hook-form';
import './Signup.css'    
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import { API_URL } from '../API/apiendpoint';



function Signup(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState:{errors,isSubmitting}, 
  } = useForm()

  const navigate = useNavigate()

  const [visible, setvisible] = useState(false);

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
    const res = await fetch(`${API_URL}/user/signup`,{
      method : "POST",
      body : JSON.stringify(data),
      headers : {
        "Content-Type" : "application/json",
      },
      credentials: 'include'
    })
    const d = await res.json()
    if(d.success){
      navigate("/login")
      return
    }
    else{
      alert("Couldn't store data in database...")
      navigate("/signup")
      return
    }
  }

  return (
    <>
   <Navbar btnval1 = {props.btnval1} btnval2 = {props.btnval2} />
   <div className='maindivforlogin'>
      <h2>Signup!</h2>
      <div className="container">
        {isSubmitting && <div>Loading...</div>}
        <form className='form-box' action="" onSubmit={handleSubmit(onSubmit)}>
          <input {...register("username",{required:true,
            minLength:{value : 3,message : "Min Length of Username must be 3"},
            maxLength:{value : 15,message : "Max Length of Username must be 15"},
            pattern : {value : /^[A-za-z\s]+$/ , message : "Username must only include alphabets and space-in-between"}})} type="text"  placeholder='Enter Username'/>
            <input {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })} type="text"  placeholder='Enter Email'/>
          <div className="password-block">
            <input type={visible?"text":"password"}
            {...register("password",{
              required:true,
              pattern : {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long"
              }
            })} placeholder='Enter Password'/>
            <span onClick={handleEye}>
              {visible? <PiEyeBold />: <PiEyeClosedBold />}
            </span>
          </div>
          <button disabled={isSubmitting} type="submit">Signup</button>
        </form>
        <div className="errors">
          <p>{errors.username && errors.username.message}</p>
          <p>{errors.email && errors.email.message}</p>
          <p>{errors.password && errors.password.message}</p> 
        </div>
      </div>
   </div>
   </>
  )
}

export default Signup
