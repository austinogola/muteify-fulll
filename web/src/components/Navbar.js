import { useState } from "react";
import "./Navbar.css"; // External CSS file for styling
import fullLogo from '../images/FullLogo.png'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container" >
        <div className="logo">
          <img src={fullLogo} alt="Muteify Logo" />
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#">About Extension</a>
          <a href="#">Pricing</a>
          <a href="#">Support</a>
          <a href="/waitlist" className="get-extension">Join Waitlist →</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
