import { useState } from 'react';
import './WaitList.css';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await fetch('https://muteify-auth-server-production.up.railway.app/submit-email', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      setSubmitted(true);
      setEmail('');
    } catch (error) {
      alert('Something went wrong.');
      console.error('Error submitting to Google Sheets:', error);
    }
  };

  return (
    <section className="waitlist-container">
      <div className="waitlist-content">
        <h2>Join the Waitlist</h2>
        <p>Be the first to get access when we launch. No spam — just good news.</p>

        {!submitted ? (
          <form className="waitlist-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Notify Me</button>
          </form>
        ) : (
          <div className="waitlist-success">
            🎉 Thank you! You’ve been added to the waitlist.
          </div>
        )}
      </div>
    </section>
  );
}
