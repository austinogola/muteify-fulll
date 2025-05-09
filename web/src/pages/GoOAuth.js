

import {useEffect ,useState} from 'react'
import Cookies from 'js-cookie';
import { useNavigate, useSearchParams } from "react-router-dom";


const GoOAuth=()=>{

    
     const navigate = useNavigate();

     const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);


    const makeReq=(obj)=>{
        let url=`http://127.0.0.1:5000/auth/google`
        fetch(url,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(obj)
        }).then(async res=>{
            let response=await res.json()
            if(res.status===200){
                if(response.error){
                    setError(response.error)
                }else{
                    const mm_token = response.token;
                    const date = new Date();
                    date.setTime(
                        date.getTime() + 21 * 24 * 60 * 60 * 1000
                    );
                    Cookies.set('mm_token', mm_token, { expires: 21 });
                    navigate(`/success`);
                }
               
            }else{
                setLoading(false)
                setError(response.error)
            }
        })
        .catch(err=>{
            console.log(err)
            setLoading(false)
        })
    }
    let sers=new URL(window.location.href)
    const params = Object.fromEntries(sers.searchParams.entries());
    const code=sers.searchParams.get('code')
    const scope=sers.searchParams.get('scope')
    // const permission=sers.searchParams.get('permission')
    console.log(code)
    console.log(scope)
    // console.log(permission);
    const origin = sers.origin

    
    // for (const key in params) {
    //     console.log(`${key}: ${params[key]}`);
    //   }

    useEffect(()=>{
        if(code && scope){
            makeReq({code,scope,origin})
        }
    },[code,scope])
    return(
        <div>
            <div justifyContent='center' alignItems='center' h='500px'>

                   {loading?<h1>Getting...</h1>:
                   <div>
                        <p fontWeight='500' textAlign='center'>Failed to authorize Google client. Please try again</p>
                        <a textDecoration='none' textAlign='center' href='/login'>back to login</a>
                    </div>}
            </div>

        </div>
    )
}


export default GoOAuth