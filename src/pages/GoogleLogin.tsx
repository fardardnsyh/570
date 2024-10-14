import React, { useEffect, useRef, useState } from 'react'
import {auth, signInWithGooglePopup } from '../utils/firebase'
import { createSearchParams, redirect, useNavigate } from 'react-router-dom';
import googleBtnSvg from "../assets/socials/google.svg";

export default function GoogleLoginPage() {
    // Use navigate
    const navigate = useNavigate();

    // Data
    const [email, setemail] = useState();
    const [token, settoken] = useState();
    const [fullname, setfullname] = useState("")

        // Login user
    const logGoogleUser = async () => {
        try{
        let response : any = await signInWithGooglePopup();
            settoken(response.user.accessToken)
            setemail(response.user.email)
            setfullname(response.user.displayName)
        }
        catch{
        }
    }

  //   Redirect the user if logged in
  useEffect(() => {
    if(email){
      const queryParameters = new URLSearchParams(window.location.search)
      const redirectUrl = queryParameters.get("redirectUrl")
      // window.location.href = `${redirectUrl}?email=${email}&fullname=${fullname}`;
    }
      // eslint-disable-next-line
  }, [email]);


  return (
    <div className='center-page'>
      <center>
          <button onClick={logGoogleUser} className='btn flex place-content-center mt-7 bg-default text-white py-2 px-2 rounded-full font-bold drop-shadow'>
              <img alt="truetalk" src={googleBtnSvg} width={32}/>
              <span className='ml-5 mt-1 mr-5'>Accept and continue</span>
          </button>
        <br></br>
          Token:
          <p className='p-10 max-w-screen-md text-balance'>{token}</p>
      </center>
    </div>
  )
}
