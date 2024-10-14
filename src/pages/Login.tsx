import React from 'react'
import {auth, signInWithGooglePopup } from '../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import googleBtnSvg from "../assets/socials/google.svg";
import { useNavigate } from 'react-router-dom';


export default function LoginPage() {
  // Use navigate
  const navigate = useNavigate();

  // data
  const [user, loading, error] : [any, boolean, any]  = useAuthState(auth);

  // Login user
  const logGoogleUser = async () => {
    try{
      let response = await signInWithGooglePopup();
        // console.log(response);

        // Redirect to home page
      navigate("/", { replace: true });
    }
    catch{
    }
  }

  return (
       <div className='center-page'>
        <center>
            <img alt="truetalk" width={100} src={require("../assets/header.png")} />

            <div className='hero-images-list flex place-content-center mt-7'>
              <img alt="truetalk" src={require("../assets/hero/one.png")} />
              <img alt="truetalk" src={require("../assets/hero/two.png")} />
              <img alt="truetalk" src={require("../assets/hero/three.png")} />
              <img alt="truetalk" src={require("../assets/hero/four.png")} />
            </div>

            <h1 className='mt-5 text-lg font -bold'>Get started on Truetalk.</h1>

            <button onClick={logGoogleUser} className='btn flex place-content-center mt-7 bg-default text-white py-2 px-2 rounded-full font-bold drop-shadow'>
                <img alt="truetalk" src={googleBtnSvg} width={32}/>
                <span className='ml-5 mt-1 mr-5'>Continue with Google</span>
            </button>
        </center>
      </div>
  )
}
