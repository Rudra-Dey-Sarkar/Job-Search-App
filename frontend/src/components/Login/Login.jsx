import React, { useState, useContext } from 'react'
import { PlatformContext } from '../Global Data/PlatformContext';
import "./Login.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const {userData, setUserData} = useContext(PlatformContext);

 const Submit = (event) => {
    event.preventDefault();
    axios.post("https://job-search-app-backend.vercel.app/getdata", {
      id:id,
      password:password
    }).then((res) => {
      if(res.data!="User Does Not Exist" && res.data!="Faild To Find User"){
          console.log(res.data);
          setUserData(res.data);
         
            navigate('/user');
        }else{
          alert(res.data);
        }
    }).catch((err) => {
        console.log("Data not sent to DB due to :-", err);
    });
  }
  return (
    <div>
      <div className='allText'>
        <h2>Login To Explore New Jobs </h2>
        <p>You can start exploring new jobs after you login with your correct Email ID and Password.<br></br>You edit and view your profile once you successfully Login to your profile</p>
      </div>
      <form className="login" onSubmit={Submit}>
        <label htmlFor="email">Enter Email ID :-</label>
        <input type='email' className='inputs' placeholder='example@gmail.com' name='email' onChange={(e) => { setId(e.target.value) }}></input>

        <label htmlFor="pwd">Enter Password :-</label>
        <input type='password' className='inputs' placeholder='@Example123' name='pwd' onChange={(e) => { setPassword(e.target.value) }}></input>

        <button className='login-btn' type="submit">Login</button>

        <p className='signuplinkFullText'>Don't Have an Account ? &nbsp;<Link id='signuplink' to="/signup">Register</Link></p>
      </form>
    </div>
  )
}

export default Login