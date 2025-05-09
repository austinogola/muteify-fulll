import { useState, useEffect } from 'react';
import fullLogo from '../images/FullLogo.png'
import mountain from '../images/mount.png'
import person from '../images/person.png'


const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 768;

  const styles = {
    container: {
      width: '100%',
      maxWidth: '1600px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      overflow: 'hidden',
      position: 'relative',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '15px' : '20px 40px',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    },
    logo: {
      height: isMobile ? '30px' : '40px',
      display: 'flex',
      alignItems: 'center',
    },
    logoIcon: {
      color: '#FF6B00',
      marginRight: '5px',
      fontSize: isMobile ? '24px' : '30px',
      fontWeight: 'bold',
    },
    logoText: {
      fontSize: isMobile ? '20px' : '24px',
      fontWeight: 'bold',
      color: '#000',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      backgroundColor: '#FF6B00',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: isMobile ? '8px 15px' : '12px 25px',
      fontSize: isMobile ? '14px' : '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    hero: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
      minHeight: '100vh',
      position: 'relative',
    },
    imageContainer: {
      width: isMobile ? '100%' : '100%',
      position: 'relative',
      border:'1px solid red'
    },
    personImage: {
      width: '90%',
      maxHeight: isMobile ? '400px' : 'auto',
      objectFit: 'cover',
      zIndex: 3,
    },
    terrainOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 1,
    },
    contentContainer: {
      width: isMobile ? '90%' : '50%',
      padding: isMobile ? '20px' : '40px',
      marginTop: isMobile ? '20px' : 0,
      zIndex: 5,
      position:'absolute',
      right:'0px'
    },
    heading: {
      fontSize: isMobile ? '28px' : '42px',
      fontWeight: 'bold',
      lineHeight: 1.2,
      marginBottom: '20px',
    },
    orangeText: {
      color: '#FF6B00',
    },
    subheading: {
      fontSize: isMobile ? '16px' : '18px',
      lineHeight: 1.5,
      marginBottom: '40px',
      color: '#333',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>)))</span>
          <span style={styles.logoText}>muteify</span>
        </div>
        <div style={styles.buttonContainer}>
          <button style={styles.button}>Get Started for Free</button>
        </div>
      </header>

      <main style={styles.hero}>
        <div style={styles.imageContainer}>
          <img 
            src={person}
            alt="Person watching video" 
            style={styles.personImage}
          />
          <img 
            src={mountain} 
            alt="Terrain background" 
            style={styles.terrainOverlay}
          />
        </div>
        
        <div style={styles.contentContainer}>
          <h1 style={styles.heading}>
            Watch Videos Without Shackles Of Music, Mute Music in <span style={styles.orangeText}>Real-Time</span>
          </h1>
          <p style={styles.subheading}>
            Real-time muting of instrumental music in videos, ensuring a halal and enriching experience.
          </p>
        </div>

      </main>
    </div>
  );
};

export default Home;