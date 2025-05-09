import React from "react";
import "./Home.css";
import fullLogo from '../images/FullLogo.png'
export default function Home() {
  return (
    <div className="landing-container">
      <header className="header">
        {/* <div className="logo">muteify</div> */}
        <img src={fullLogo}/>
        <button className="cta-button main" style={{color:'black'}}>Get Started for Free</button>
      </header>

      {/* <main className="main-content">
        <div className="text-content">
          <h1>
            Watch Videos Without Shackles Of Music, <br /> Mute Music in{" "}
            <span className="highlight">Real-Time</span>
          </h1>
          
        </div>

        <div className="image-placeholder">
         
        </div>
      </main> */}
    </div>
  );
}
