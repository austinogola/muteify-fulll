import React from "react";
// import "./Home.css";
import fullLogo from '../images/FullLogo.png'
import mountain from '../images/mount.png'
import person from '../images/person.png'

import AboutExtension from "../components/AboutExtension";
import Intro from "../components/Intro";
import HowItWorks from "../components/HowItWorks";
import HowToUse from "../components/HowToUse";
import PlanPricing from "../components/PlanPricing";
import UserReviews from "../components/UserReviews";
import LastSection from "../components/LastSection";
// import WaitPage from "../components/WaitPage";
export default function Home() {
  return (
    <section>
      <Intro/>
      <AboutExtension/>

      <HowItWorks/> 

      <HowToUse/>

       <PlanPricing/>

       <UserReviews/>
      
      <LastSection/> 

    </section>
  
  );
}
