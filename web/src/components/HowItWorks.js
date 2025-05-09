import React from "react";
import "./HowItWorks.css";
import fullLogo from '../images/FullLogo.png'
import mountain from '../images/mount.png'
import person from '../images/person.png'

const steps = [
  { number: 1, title: 'Add the extension to your browser with a single click' },
  { number: 2, title: 'Muteify automatically detects and mutes background music, leaving only speech and relevant sounds' },
  { number: 3, title: 'Enjoy the content you love' }
];


// import WaitPage from "../components/WaitPage";
export default function HowItWorks() {
  return (
    <section className="HowItWorks" id='HowItWorks'>
      
      <div className="worksText">
            <div className="worksTextWrapper">
                <h1>How It Works</h1>
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis cursus venenatis. </p>
                <p>
                Vivamus nec nisi sit amet leo laoreet viverra. 
                </p> */}
            </div>

          
            
        </div>

        <div className="steps">
        {steps.map((step, index) => (
          <div className="step" key={index}>
            <div className="circle">{step.number}</div>
            <p className="step-title">{step.title}</p>
            <p className="step-number">0{step.number}</p>
            {/* {index < steps.length - 1 && <div className="arrow">→</div>} */}
          </div>
        ))}
      </div>
      
    </section>
  
  );
}
