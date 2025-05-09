import React from "react";
import "./Intro.css";
import fullLogo from '../images/FullLogo.png'
import mountain from '../images/mount.png'
import person from '../images/person.png'

// import WaitPage from "../components/WaitPage";
export default function Intro() {
  return (
    <section className="container">
      <header className="header">
        <img src={fullLogo}/>
        <button className="cta-button main" style={{color:'black',fontSize:'20px'}}>Join WaitList</button>
      </header>

      <div className="content">
          <div className="text-content">
            <h1>
              Watch Videos Without  <br /> Shackles Of Music, Mute  <br /> Music in{" "}
              <span className="highlight">Real-Time</span>
            </h1>

            {/* <p className="subtext">
              Real-time muting of instrumental music in videos,
              <br />
              ensuring a halal and enriching experience.
            </p> */}
          </div>
      </div>

      {/* <div className="landingImages">
        <div className="landingImagesWrapper">
        
          <div className="viewerParent">
              <img src={person} loading="lazy"/>
          </div>

          <div className="rockParent">
                 <img src={mountain} loading="lazy"/>
              </div>
        </div>
        
              
      </div> */}

      
    </section>
  
  );
}

