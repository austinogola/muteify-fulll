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

                <p>Try the world’s first AI Powered technology for just £1 ( Limited Time Offer ).</p>
        <p>Get unlimited access to all Mutify features, with priority support and extended usage with the following plans</p>
            </div>
            
        </div>

        <div className="plans">
        <div className="plan basic">
          <h2>Basic</h2>
          <p className="price">
            <span className="currency">£</span>6.99<span className="monthly">/Month</span>
          </p>
          <div className="tryBtnParent">
              <button className="try-btn">Try For £1</button>
          </div>
          <div className="features">
            <p className="available"><span className='tick'>✔</span> 45 Minutes Of Usage / Day</p>
            <p className="available"><span className='tick'>✔</span> Email Support</p>
            <p className="unavailable"><span className='mark'>✖</span> Hitlist Tracking</p>
            <p className="unavailable"><span className='mark'>✖</span> Early Access To New Features</p>
          </div>
        </div>
        <div className="plan premium">
          <div className="badge">Most Popular</div>
          <h2>Premium</h2>
          <p className="price">
            <span className="currency">£</span>11.9<span className="monthly">/Month</span>
          </p>
          <div className="tryBtnParent">
              <button className="try-btn">Try For £1</button>
          </div>
          
          <div className="features">
            <p className="available"><span className='tick'>✔</span> Unlimited Usage / Day</p>
            <p className="available"><span className='tick'>✔</span> 50+ Hitlist Tracking</p>
            <p className="available"><span className='tick'>✔</span> Exclusive Community Access ( Lectures & Events )</p>
            <p className="available"><span className='tick'>✔</span> 24/7 Live Support</p>
            <p className="available"><span className='tick'>✔</span> Early Access To New Features</p>
          </div>
        </div>
      </div>


        {false?<div className="pricing-section">
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
    </div> :null}

        
      
    </section>
  
  );
}
