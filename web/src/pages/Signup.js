import React,{ useState } from "react";
import "./Signup.css";
import Loading from "../components/Loading";
// import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams, } from "react-router-dom";
import Cookies from 'js-cookie';
import {GoogleButton} from 'react-oauth-ninja';


const googleClientId = process.env.REACT_APP_GOOGLE_ID

let SERVER_URL = process.env.REACT_APP_SERVER_URL

let WEB_URL = process.env.REACT_APP_WEB_URL

// let redirect_uri=`http://127.0.0.1:3000/oauth-google`

export default function Signup() {
    // const [cookies, setCookie] = useCookies(["mm_token"]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirect'); // Get ?redirect=/somepage
    const productName = searchParams.get('productName')

    console.log('redirectTo',redirectTo)
     console.log('productName',productName)



     let redirect_uri = ''

     if(redirectTo && redirectTo.length>1){
        localStorage.setItem('redirectAfterLogin', redirectTo);
        localStorage.setItem('productName', productName);
     }
     
     redirect_uri = `${WEB_URL}/oauth-google`;

  
    const handleSubmit = (e) => {
      e.preventDefault();
      setError("");
  
      if (!email || !password) {
        setError("Please fill in both fields.");
        return;
      }
  
      // Simulate signup logic
      console.log("Signing up with", email, password);

      let requestObj={
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,password})
      }

      setLoading(true)

      fetch(`${SERVER_URL}/signup`,requestObj)
      .then(res=>res.json())
      .then(response=>{
        // setLoading(false)
        if(response.error){
          setLoading(false)
            setError(response.error)
        }else{

            const mm_token = response.token;
            const date = new Date();
            date.setTime(
                date.getTime() + 21 * 24 * 60 * 60 * 1000
            );
            // setCookie("mm_token", mm_token, { path: "/", expires: date });
            Cookies.set('mm_token', mm_token, { expires: 21 });

          if(redirectTo && redirectTo=='/checkout'){
              fetch(`${SERVER_URL}/stripe/get-link`,{
                method:'POST',
                headers:{
                  "Content-Type":"application/json",
                  "Authorization":mm_token
                },
                body:JSON.stringify({productName})
              })
              .then(res=>res.json())
              .then(res=>{
                setLoading(false)
                let {payment_url}=res

                if(payment_url){
                  // navigate(payment_url)
                  window.location.href = payment_url
                }
                // console.log(res)
              })
          }else{
            navigate('/success')
          }

            // navigate(`/success`);

        }
        
      })
    };
  
    return (
      <div className="auth-page">
        <div className="auth-box">
          <div className="logo">muteify</div>
          <h2 className="auth-title">Sign Up</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="cta-button">Sign Up</button>
          </form>
          <div className="auth-divider">or</div>
          {/* <button className="google-button">Sign Up with Google</button> */}
          <div style={{display:"flex",justifyContent:'center',marginBottom:'10px'}}>
                <GoogleButton client_id={googleClientId}
              
              redirect_uri={redirect_uri}

              styles={{width:"100%",borderRadius:'5px'}}

              text={{
                value:'Continue with Google',

              }}/>  
          </div>
         

          <div className="footnote">
                <p>Already have an account? <a href=
                {`/login${redirectTo ? `?redirect=${(redirectTo)}` : ''}${productName?`&productName=${(productName)}` : ''}`}
                >Login</a> </p>
            </div>
        </div>
        {loading?<Loading/>:null}
      </div>
    );
  }