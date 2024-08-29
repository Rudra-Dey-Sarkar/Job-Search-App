import React, { useEffect, useState } from 'react';
import "./Signup.css";
import { Link } from 'react-router-dom';
import axios from "axios";

function SignUp() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  //this function collects the all details of user and also stores the PDF file to the backend
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    //creating a form 
    const formData = new FormData();

    // Add signup details to FormData
    formData.append('name', name);
    formData.append('id', id);
    formData.append('password', password);

    // Add the PDF file to FormData
    const fileInput = document.getElementById('file');
    if (fileInput.files.length > 0) {
      formData.append('user_file', fileInput.files[0]);
    }

    // upload the pdf file to the backend storage
    try {
      const uploadResponse = await fetch('https://job-search-app-backend.vercel.app/upload', {
        method: 'POST',
        body: formData,
      });

      //storing the pdf name in result
      const result = await uploadResponse.text();

      console.log(name, id, password, result);

      // sending all the user data to the function to store in the database
      await UploadDatatoDB(name, id, password, result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  //Upload datas to the Database
  function UploadDatatoDB(name, id, password, pdf) {
    axios.post("https://job-search-app-backend.vercel.app/store", {
      name:name,
      id:id,
      password:password,  
      pdf: pdf,

    }).then((res) => {
        alert(res.data);
    }).catch((err) => {
        console.log("Data not sent to DB due to :-", err);
    });
  }

  return (
    <div>
      <div className='allText'>
        <h2>Signup To Explore New Jobs</h2>
        <p>You can start exploring new jobs after you Signup and create a new account.<br />You can edit and view your profile once you successfully Signup and Login to your profile</p>
      </div>
      <form className="login" onSubmit={handleFormSubmit} encType="multipart/form-data">
        <label htmlFor="name">Enter Full Name:</label>
        <input type='name' className='inputs' placeholder='John Doe' name='name' onChange={(e) => { setName(e.target.value) }} />


        <label htmlFor="email">Enter Email ID:</label>
        <input type='email' className='inputs' placeholder='example@gmail.com' name='email' onChange={(e) => { setId(e.target.value) }} />

        <label htmlFor="pwd">Enter Password:</label>
        <input type='password' className='inputs' placeholder='@Example123' name='pwd' onChange={(e) => { setPassword(e.target.value) }} />

       <div className='resumeBox'>
        <p className='resumeLabel'>Upload Resume :-</p>
        <input id='file' type="file" name="user_file" />
       </div>

        <button className='signup-btn' type="submit">Signup</button>
        <p className='signuplinkFullText'>Already Have an Account? &nbsp;<Link id='login' to="/login">Login</Link></p>
      </form>
    </div>
  );
}

export default SignUp;
