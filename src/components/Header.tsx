import React, { useEffect, useState } from 'react'
import {auth, logoutUser} from '../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import useUser from '../hooks/UseUserHook';

export default function HeaderComponent() {
  // Use navigate
  const navigate = useNavigate();


  // data
  const [user, loading, error] : [any, boolean, any]  = useAuthState(auth);
  const [showDropdown, setshowDropdown] = useState<boolean>(false)
  // Hooks
  const { findUserById : getOrCreateUser} = useUser(user)

  // Logout user
  const logOutUser = async () => {
    let response = await logoutUser()
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    if(user){
      getOrCreateUser(user)
    }
      // eslint-disable-next-line
  }, [user]);

  return (
    <header className='pb-10'>
      <Link to={'/'}>
        <img alt="truetalk" className='float-left' src={require("../assets/header.png")} />
      </Link>
        {user ?
          <div className="header-dropdown m4-5 hover">
            <img alt="truetalk" onClick={()=> setshowDropdown(!showDropdown)} className='float-left profile-header-img rounded-full' src={user?.photoURL}/>

            { showDropdown &&
               <div className="dropdown-content mt-8" onClick={logOutUser}>
               <p className='text-red-500 text-sm'>Logout</p>
             </div>
            }

          </div>
          :
          <Link to={'/login'}><span className='text-sm text-default float-right'>Sign in</span></Link>
        }
    </header>
  )
}
