import React from 'react';
import "./Homepage.css";
import ImageSlider from '../ImageSlider/ImageSlider';
import { SignUpLogo, UploadLogo, LoginLogo } from '../Pictures/Picture';
function Homepage() {
  function ViewMore(){
    document.getElementById('mainParagraph1').style.display="none";
    document.getElementById("mainParagraph2").style.display="inline";
  }

  function ViewLess(){
    document.getElementById("mainParagraph2").style.display="none";
    document.getElementById('mainParagraph1').style.display="inline";
  }
  return (
    <div className='mainBody'>
      <div className='mainTexts'>
        <div className='textSet1'>
        <h1>More About YourHR</h1>
        <p id='mainParagraph1'> Welcome to YourHR, your trusted partner in navigating the job market.
          Our mission is to empower job seekers to discover opportunities that align
          with their unique qualifications and preferences<p onClick={()=>ViewMore()} id='mainTextButton1'>View More...</p></p>

        <p id='mainParagraph2'> Welcome to YourHR, your trusted partner in navigating the job market.
          Our mission is to empower job seekers to discover opportunities that align
          with their unique qualifications and preferences. Whether you're starting
          your career, looking for a change, or aiming to advance, YourHR is designed
          to help you find the ideal role that suits your skills, experience, and
          ambitions. We simplify the job search process by matching you with
          positions that fit your profile, ensuring that you spend less time
          searching and more time pursuing your career goals. Start your journey
          with YourHR and take the next step toward your dream job today.<p onClick={()=>ViewLess()} id='mainTextButton2'>View Less...</p></p>
        </div>
  
          <div className='textSet2'>
          <h2>Start Your Career With These Simple Steps:-</h2>
          <p className="GuideText">1. Sign Up  &nbsp;<SignUpLogo className="logos" /></p>
          <p className="GuideText">2. Upload Your Resume  &nbsp;<UploadLogo className="logos" /></p>
          <p className="GuideText">3. Login And Find Best Jobs  &nbsp;<LoginLogo className="logos" /></p>
          </div>
      </div>
      <div className='ImageSlider'>
        <ImageSlider />
      </div>
    </div>
  )
}

export default Homepage