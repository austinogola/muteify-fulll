import React,{useState} from "react";
import "./WaitPage.css";


export default function WaitPage() {
    return (
        <section className="">
                 <div class="container22">
                    <img src="logo.png" alt="Muteify Logo" class="logo22" />
                    <h2>Join the Waitlist</h2>
                    <p class="subtext22">We're not open to everyone yet — drop your email and we'll notify you when it's your turn.</p>

                    <form class="waitlist-form22">
                    <input type="email" placeholder="Enter your email" required />
                    <button type="submit">Join Waitlist</button>
                    </form>

                    <p class="terms22">
                    By submitting, you agree to our
                    <a href="#" class="link22">Terms and Condition</a> and
                    <a href="#" class="link22">Privacy Policy</a>
                    </p>
                </div>
        </section>
    )
}