import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound404() {
  return (
    <div className='splash-screen'>
      <center>
          <img alt="truetalk" width={100} src={require("../assets/header.png")} />
          <h1 className='mt-5 text-lg font -bold'>404 | Page not found</h1>
          <Link to={"/"} replace={true}>
            <button className='btn flex place-content-center mt-10 bg-default text-white px-20 py-2 rounded-full font-bold drop-shadow'>
                Go home
            </button>
          </Link>
        </center>
    </div>
  )
}
