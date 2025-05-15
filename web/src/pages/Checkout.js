
import {useEffect ,useState} from 'react'
import Cookies from 'js-cookie';
import { useNavigate, useSearchParams } from "react-router-dom";


const Checkout=()=>{
    let mm_token = Cookies.get('mm_token')
    let redirect = '/checkout'

    if(mm_token){
        
    }
    return(
        <div>
            <h1>Redirecting you to your checkout...</h1>
        </div>
    )
}


export  default Checkout
