import React, { useEffect, useRef, useState } from 'react'
import {auth, signInWithMicrosoftPopup } from '../utils/micosoft'
import { createSearchParams, redirect, useNavigate } from 'react-router-dom';
import microsoftBtnSvg from "../assets/socials/microsoft.svg"

export default function MicrosoftLoginPage() {
    // Use navigate
    const navigate = useNavigate();

    // Data
    const [token, settoken] = useState();
    const [fullname, setfullname] = useState("")

        // Login user
    const logMicrosoftUser = async () => {
        try{
        let response : any = await signInWithMicrosoftPopup();
          settoken(response?.idToken)
        }
        catch{
        }
    }



  return (
    <div className='center-page'>
      <center>
          <button onClick={logMicrosoftUser} className='btn flex place-content-center mt-7 border py-2 px-4 rounded-full font-bold'>
              <img alt="truetalk" src={microsoftBtnSvg} width={32}/>
              <span className='ml-5 mt-1 mr-5'>Login with Microsoft</span>
          </button>

          <br></br>
          Token:
          <p className='p-10 max-w-screen-md text-balance'>{token}</p>


      </center>
    </div>
  )
}
