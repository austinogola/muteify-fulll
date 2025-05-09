import React from "react";
import "./AboutExtension.css";
import orangeBlur from '../images/orangeBlur.png'
import extensionPopup from '../images/extensionPopup.png'
import person from '../images/person.png'
import mic from '../images/mic.png'
import guitar from '../images/guitar.png'
import music from '../images/music.png'
import users from '../images/users.png'
// import WaitPage from "../components/WaitPage";

function SmallTip ({txt,top,right,left,bottom,src,imgWidth,id}){
    return(
        <span style={{display:'flex',position:'absolute',
        borderRadius:'5px',alignItems:'center',padding:'10px',paddingRight:'10px',paddingLeft:'10px',
            boxShadow:'0 4px 12px rgba(0, 0, 0, 0.1)',backgroundColor:'white'}} id={id}>
                    <span style={{width:'2rem',marginRight:'5px',
                    display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <img style={{width:imgWidth,objectFit:'contain'}} src={src} />
                    </span>
                    <p style={{fontSize:"0.9rem"}}>{txt}</p>
            </span>
    )
}
export default function AboutExtension() {
  return (
    <section className="AboutExtension" id='AboutExtension'>

        <div className="aboutText">
            <div className="aboutTextWrapper">
                <h1>About Extension</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis cursus venenatis. </p>
                <p>
                Vivamus nec nisi sit amet leo laoreet viverra. Sed quam risus, lobortis id lorem in, porta suscipit magna. 
                </p>
            </div>
            
        </div>


        <div className="imagesgrandParent">
             <div className="imagesParent">
                    <div className="oneImageWrapper" id='blur'>
                             <img src={orangeBlur}/>
                    </div>

                    <div className="oneImageWrapper" id='ext'>
                             <img src={extensionPopup} />
                             
                    </div>

                    <div className="oneImageWrapper" id='steps'>
                                <div className="stepsDiv">
                                    <SmallTip src={music} txt='100% Real Time Music Blocker' left='10%' top='2%' imgWidth='75%' id='tip1'  />
                                    <SmallTip src={users} txt='2k Users' right='15%' top='5%' imgWidth='160%'  id='tip2'/>
                                    <SmallTip src={guitar} txt='Block All Instrumentals' left='60px' top='45%' imgWidth='80%' id='tip3'/>
                                    <SmallTip src={mic} txt='Only Allow Vocals' right='160px' bottom='22%' imgWidth='50%' id='tip4'/>
                                </div>
                    </div>
            </div>
        </div>

        

        <div className="imageContent">
            <div className="imageContentWrapper">


                <div className="imageParent" id='forOrangeBlur'>
                        <img src={orangeBlur}/>
                </div>

                <div className="imageParent" id='forExtensionPopup'>
                        <img src={extensionPopup}/>
                </div>

               

           

                {/* <div className="imageParent" id='forTips' >
                  
                    <div style={{position:'relative',height:'100%',width:'100%'}}>
                        

                        <SmallTip src={mic} txt='2k Users' right='15%' top='5%' imgWidth='60%'  id='tip2'/>

                      

                        
                    </div>
                    
                    
                </div>  */}

            </div>
        </div>

       

      
    </section>
  
  );
}
