import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/Header'
import userSVG from "../assets/user.svg"
import firebase from '../utils/firebase';
import {auth} from '../utils/firebase'
import useUser from '../hooks/UseUserHook';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useParams } from 'react-router-dom';
import IUser from '../interface/user.interface';
import { isValidMessageText } from '../utils/stringvalidator';
import {v4 as uuidv4} from 'uuid';
import {
  doc,
  onSnapshot,
  setDoc,
  collection,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';
import IMessageBody from '../interface/message.interface';

export default function SendMessagePage() {

  // Get url parameter
  const { id } : any = useParams()


  //Data
  const colletionRef = collection(firebase, 'messages');
  const [user, loading, error] : [any, boolean, any]  = useAuthState(auth);
  const [maxLength, setmaxLength] = useState<number>(140)
  const [messageBody, setmessageBody] = useState<string>("")
  const [messageSentSuccess, setmessageSentSuccess] = useState<boolean>(false)
  const [isError, setisError] = useState<boolean>(false)

  // Hooks
  const { getUserById, recieverUserDetails } = useUser(user)


  // The send messge function
  const SendMessage = async() =>{

    let newMessage : IMessageBody = {
        messageBody: messageBody,
        receiver : recieverUserDetails.id,
        createdAt : serverTimestamp(),
        messageId : uuidv4(),
    };

    try {
        const messageRef = doc(colletionRef, newMessage.messageId);
        await setDoc(messageRef, newMessage);
        } catch (error) {
          setisError(true)
    }

    setmessageBody("")
    setmessageSentSuccess(true)


  }

  useEffect(() => {

    //Get the reciever user details
    getUserById(id)

  }, []);

  return (
    <main className='main'>
      {/* Header component  */}
      <HeaderComponent/>
      <div className='p-3'>

        {
          !messageSentSuccess?

          // The text box
          <div>

            {isError && <p className='text-red-500 text-center mt-2 text-sm'>Error occured while sending message.</p>}

            <div className='message-card shadow-md border mt-5 py-6 px-4'>
              <div className='profile-card flex'>
                  <img alt="truetalk" src={recieverUserDetails.profile_image} className='rounded-full h-8 w-8'/>
                  <div className='text-xs ml-3 text-gray-500'>
                      <p className='font-bold text-md text-gray-800'>{recieverUserDetails.fullname}</p>
                      <p className='mt-1'>Tell me what’s on your mind.</p>
                  </div>
              </div>

              <div className='message-body mt-5 font-bold text-gray-700'>
                <textarea
                  onChange={e => setmessageBody(e.target.value)}
                  onClick={() => setisError(false)}
                  className='w-full border rounded p-3
                  focus:outline-none focus:border-default
                  focus:ring-default
                  focus:ring-1
                  focus:border-100
                  transition duration-0 hover:duration-150' maxLength={maxLength} rows={4} autoFocus
                  placeholder={`Write a message to ${recieverUserDetails.fullname}...`}></textarea>
                <p className='text-xs text-gray-500 mt-4 float-right'>{messageBody.length} / {maxLength}</p>
              </div>
              <img alt="truetalk" src={require("../assets/header.png")} width={60} className='mt-8 opacity-50' />
            </div>

            <center>
                <button
                className='btn flex place-content-center mt-10 bg-default text-white px-20 py-2 rounded-full font-bold drop-shadow'
                disabled={!recieverUserDetails?.id || !isValidMessageText(messageBody, maxLength)}
                onClick={()=> SendMessage() }
                >
                  Send message
                </button>
            </center>
          </div>

          :

          // Display success message
          <div className='mt-20'>
            <center>
              <h2 className='text-lg mb-3 text-green-700'>Message sent successfully!!!</h2>
              <p className='font-bold text-gray-500'>Get your own link and receive messages from your friends!</p>
              <Link to="/login">
                <button className='btn flex place-content-center mt-7 bg-default text-white px-20 py-2 rounded-full font-bold drop-shadow'>
                  Get your link
                </button>
              </Link>
            </center>
          </div>

        }

      </div>

    </main>
  )
}
