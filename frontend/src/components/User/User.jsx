import React, { useContext, useState, useEffect } from 'react'
import { PlatformContext } from '../Global Data/PlatformContext'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./User.css";

function User() {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(PlatformContext);
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [pdfs, setPdfs] = useState([]);

    function Logout(){
        setUserData(null);
        setName(null);
        setId(null);
        setPassword(null);

        document.getElementById("profile").style.display="none";
        document.getElementById("login-signup").style.display="flex";
        navigate("/");  
    }

    function SaveDetails(){
        if(userData[0]!=undefined){
            localStorage.setItem("name",userData[0].name);
            localStorage.setItem("id",userData[0].id);
            localStorage.setItem("password",userData[0].password);
        }

       setName(localStorage.getItem("name"));
       setId(localStorage.getItem("id"));
       setPassword(localStorage.getItem("password"));
    }

    // Access and Download PDFs from backend
    useEffect(() => {
        document.getElementById("login-signup").style.display="none";
        document.getElementById("profile").style.display="flex";

        SaveDetails()

        axios.get('http://localhost:5000/download')
            .then(response => {
                console.log(response.data);
                setPdfs(response.data);
            })
            .catch(error => {
                console.error('Error fetching the PDF list', error);
            });
    }, []);


    return (
        <>
          <h2 className='main-text'>User Details</h2>
            {name && id && password ? (<div>
                    <div id='userDataList'>
                        <p>Name :- {name}</p>
                        <p>Email :- {id}</p>
                        <p>Password :- {password}</p>
                    </div>
            

                <div className='resume-board'>
                    <h3>Resume</h3>
                    {pdfs.map((pdf, index) => (
                        <p key={index}>
                            <a id='resume' href={`http://localhost:5000/download/${pdf}`} download>{pdf}</a>
                        </p>
                    ))}
                </div>
                <p className='para'>
                    You can apply to your dream jobs, we also suggest type jobs that directly matches your profile.
                    you can directly approach companies and reqruiters once all your details verified.
                    <br>
                    </br>
                    You can contact us if have any queries regardin your profile or anything regarding companies 
                    and recruiters. Our team works 24/7 to deliver you the best service posible.
                </p>
                <button id='logout' onClick={()=>Logout()}>Logout</button>
            </div>) : (
                <div>
                    <p>Loading Data......</p>
                </div>
            )}
        </>
    )
}

export default User