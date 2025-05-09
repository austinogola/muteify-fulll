import React from "react";
import "./HowToUse.css";
import fullLogo from '../images/FullLogo.png'
import mountain from '../images/mount.png'
import person from '../images/person.png'

// import WaitPage from "../components/WaitPage";
export default function HowToUse() {
  return (
    <section className="HowToUse" id='HowToUse'>
      
      <div className="useText">
            <div className="useTextWrapper">
                <h1>How To Use</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis cursus venenatis. </p>
                <p>
                Vivamus nec nisi sit amet leo laoreet viverra. Sed quam risus, lobortis id lorem in, porta suscipit magna. 
                </p>
            </div>
            
        </div>

        <div className="vidParent">
            <video controls></video>
        </div>
      
    </section>
  
  );
}
