import React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <div className='Navbody'>
       <Link id='main-logo' to="/"><h1 id='logo'>YourHR</h1></Link>
        <Link id='login-signup' to="/login"><p id='login-signup-text'>Login/Signup</p></Link>
        <Link id='profile' to="/user"><p id='profile-text'>Profile</p></Link>
    </div>
  )
}

export default Navbar