import React from "react";
import "./Intro.css";
import fullLogo from '../images/FullLogo.png'
import mountain from '../images/mount.png'
import person from '../images/person.png'

import Navbar from "./Navbar";
import Hero from "./Hero";

// import WaitPage from "../components/WaitPage";
export default function Intro() {
  return (
    <section className="Intro">
      <Navbar/>
      <Hero/>
    </section>
  
  );
}

