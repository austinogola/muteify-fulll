import './Hero.css';
import person from '../images/personMain.png'
import mountain from '../images/mountFull.png'


const Hero = () => {
  return (
    <section className='Hero'>
        <div className='heroWrapper'>
            <div className='heroText'>
            <h1>
              Watch Videos Without  <br /> Shackles Of Music, Mute  <br /> Music in{" "}
              <span className="highlight">Real-Time</span>
            </h1>
            </div>

            <div className='imageWrapper'>
                    <div className='imageParent'>

                        <div className='oneImageHolder' id='user'>
                            <div className='userImageWrapper'>
                                        <img
                                    src={person}
                                    alt="Man watching video"
                                    className="hero-main-image"
                                    />
                            </div>
                            
                        </div>

                        <div className='oneImageHolder' id='mountain'>
                        <img
                        src={mountain}
                        alt="Man watching video"
                        className="hero-main-image"
                        />
                    </div>
            
                    </div>

            </div>

            {/* <div className='heroImages'>
                <div className='heroImagesWrapper'>
                    

                    
                </div>
                
                    
            </div> */}
        </div>
    </section>
    // <section className="hero">
    //   <div className="hero-text">
        // <h1>
        //   Watch Videos Without <br />
        //   Shackles Of Music, Mute Music in <span className="highlight">Real-Time</span>
        // </h1>
    //   </div>
    //   <div className="hero-image">
        // <img
        //   src={person}
        //   alt="Man watching video"
        //   className="hero-main-image"
        // />
    //   </div>
    // </section>
  );
};

export default Hero;
