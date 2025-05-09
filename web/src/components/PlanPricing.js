import React from "react";
import "./PlanPricing.css";
import fullLogo from '../images/FullLogo.png'
import mountain from '../images/mount.png'
import person from '../images/person.png'

// import WaitPage from "../components/WaitPage";

const features = [
    "Lorem ipsum dolor",
    "Lorem ipsum dolor",
    "Lorem ipsum dolor",
    "Lorem ipsum dolor",
    "Lorem ipsum dolor",
    "Lorem ipsum dolor",
  ];
  
export default function PlanPricing() {
  return (
    <section className="PlanPricing" id='PlanPricing'>
      
      <div className="planText">
            <div className="planTextWrapper">
                <h1>Plan & Pricing</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis cursus venenatis. </p>
                <p>
                Vivamus nec nisi sit amet leo laoreet viverra. 
                </p>
            </div>
            
        </div>


        <div className="pricing-section">
      <div className="pricing-header">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Vivamus nec nisi sit amet leo laoreet viverra.</p>
      </div>
      <div className="pricing-cards">
        {/* Basic */}
        <div className="card basic">
          <h2>Basic</h2>
          <p className="price">
            <span className="old-price">$1 Trial</span>
            <span className="small-text">7 days</span>
          </p>
          <button className="btn orange" style={{marginBottom:'10px'}}>Get Started</button>
          <h4>Whats Included:</h4>
          <ul style={{textAlign:'center'}}>
            {features.map((f, i) => (
              <li key={i}>✔ {f}</li>
            ))}
          </ul>
        </div>

        {/* Deluxe */}
        <div className="card deluxe">
          <div className="badge">Most Popular</div>
          <h2>Deluxe</h2>
          <p className="price">
            <span className="big-price">$299</span>
            <span className="small-text">/Month</span>
          </p>
          <button className="btn white" style={{marginBottom:'10px'}}>Get Started</button>
          <h4>Whats Include:</h4>
          <ul style={{textAlign:'center'}}>
            {features.map((f, i) => (
              <li key={i}>✔ {f}</li>
            ))}
          </ul>
        </div>

        {/* Platinum */}
        <div className="card platinum">
          <h2>Platinum</h2>
          <p className="price">
            <span className="big-price">$299</span>
            <span className="small-text">/Month</span>
          </p>
          <button className="btn orange" style={{marginBottom:'10px'}}>Get Started</button>
          <h4>Whats Included:</h4>
          <ul style={{textAlign:'center'}}>
            {features.map((f, i) => (
              <li key={i}>✔ {f}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>

        
      
    </section>
  
  );
}
