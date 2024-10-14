import React, { useState } from 'react'
import '../App.css';
import facebookSvg from "../assets/socials/facebook.svg";
import instagramSvg from "../assets/socials/instagram.svg";
import twitterSvg from "../assets/socials/twitter.svg";
import snapchatSvg from "../assets/socials/snapchat.svg";
import whatsappSvg from "../assets/socials/whatsapp.svg";
import copyLinkSvg from "../assets/hero/copy-link.svg";
import HeaderComponent from '../components/Header'
import MessageList from '../components/MessageList';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';

export default function HomePage() {

  // STATE
  const [user, loading, error] : [any, boolean, any]  = useAuthState(auth);
  const [isCopied, setisCopied] = useState<boolean>(false)
  const [sendMessageURL, setsendMessageURL] = useState(String(window.location.origin+"/send/"+user?.uid))

  // Copy code to Clipboard
  const copyToClipoard = () => {
    if(!user) return //Return if there is no logged in user
    navigator.clipboard
      .writeText(sendMessageURL)
      .then(() => {
        setisCopied(true);
        setTimeout(function () {
          setisCopied(false);
        }, 3000);

      })
      .catch((err) => {
        // console.log(err.message);
      });

    }

  return (
    <main className='main'>
      {/* Header component  */}
      <HeaderComponent/>

      {/* Hero section  */}
      <section className='hero-section'>
        <div className='hero-images-list flex place-content-center'>
          <img alt="truetalk" src={require("../assets/hero/one.png")} />
          <img alt="truetalk" src={require("../assets/hero/two.png")} />
          <img alt="truetalk" src={require("../assets/hero/three.png")} />
          <img alt="truetalk" src={require("../assets/hero/four.png")} />
        </div>

        <p className='mt-3'>Receive messages from people who care about you</p>

        <div className='hero-social-icons flex place-content-center mt-2'>
          <img alt="truetalk" src={facebookSvg} />
          <img alt="truetalk" src={instagramSvg} />
          <img alt="truetalk" src={twitterSvg} className='twitterSvg' />
          <img alt="truetalk" src={snapchatSvg} />
          <img alt="truetalk" src={whatsappSvg} />
        </div>

        <center>
          <button onClick={()=> copyToClipoard()} className={`${isCopied ? 'bg-green-500' : 'bg-default'} btn flex place-content-center mt-2 text-white px-7 py-2 rounded-full text-sm drop-shadow transition duration-0 hover:duration-150`}>
            <img alt="truetalk" src={copyLinkSvg} className='mt-1'/> &nbsp;&nbsp;{ isCopied ? 'Copied !!!' : 'Copy link'}
          </button>
        </center>
      </section>

      <section className='message-section mt-7 mb-20 px-4'>
        <MessageList/>
      </section>


    </main>
  )
}
