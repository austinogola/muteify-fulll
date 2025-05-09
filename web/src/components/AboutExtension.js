import React from "react";
import "./AboutExtension.css";
import orangeBlur from '../images/orangeBlur.png'
import extensionPopup from '../images/extensionPopup.png'
import person from '../images/person.png'
import mic from '../images/mic.png'
import guitar from '../images/guitar.png'
import music from '../images/music.png'
import users from '../images/users.png'
// import WaitPage from "../components/WaitPage";

function SmallTip ({txt,top,right,left,bottom,src,imgWidth,id}){
    return(
        <span style={{display:'flex',position:'absolute',
        borderRadius:'5px',alignItems:'center',padding:'10px',paddingRight:'10px',paddingLeft:'10px',
            boxShadow:'0 4px 12px rgba(0, 0, 0, 0.1)',backgroundColor:'white'}} id={id}>
                    <span style={{width:'2rem',marginRight:'5px',
                    display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <img style={{width:imgWidth,objectFit:'contain'}} src={src} />
                    </span>
                    <p style={{fontSize:"0.9rem"}}>{txt}</p>
            </span>
    )
}
export default function AboutExtension() {
  return (
    <section className="AboutExtension" id='AboutExtension'>

        <div className="aboutText">
            <div className="aboutTextWrapper">
                <h1>AI Powered Extension</h1>
                <p>Mutify is a one of a kind extension that allows you to enjoy videos without the distraction of haram sound elemants. Whether you're watching YouTube, a social media video, or an online course, our AI technology detects and mutes background music in real time while preserving essential sounds like speech and effects allowing you to have a clean experience from music </p>
            </div>
            
        </div>

        <div className="allImagesParent">

        </div>


        <div className="imagesgrandParent" style={{display:'none'}}>
             <div className="imagesParent">
                    <div className="oneImageWrapper" id='blur'>
                             <img src={orangeBlur}/>
                    </div>

                    <div className="oneImageWrapper" id='ext'>
                             <img src={extensionPopup} />
                             
                    </div>

                    <div className="oneImageWrapper" id='steps'>
                                <div className="stepsDiv">
                                    <SmallTip src={music} txt='100% Real Time Music Blocker' left='10%' top='2%' imgWidth='75%' id='tip1'  />
                                    <SmallTip src={users} txt='2k Users' right='15%' top='5%' imgWidth='160%'  id='tip2'/>
                                    <SmallTip src={guitar} txt='Block All Instrumentals' left='60px' top='45%' imgWidth='80%' id='tip3'/>
                                    <SmallTip src={mic} txt='Only Allow Vocals' right='160px' bottom='22%' imgWidth='50%' id='tip4'/>
                                </div>
                    </div>
            </div>
        </div>

        
       

       

      
    </section>
  
  );
}
