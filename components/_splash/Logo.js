import React from 'react'
import { LogoFull, LogoMono } from '../assets/SVGassets'

export default ({ isFirstView }) => {
  const uploadDir = 'https://s3.us-east-2.amazonaws.com/valyant/splash/'
  return (
    <div className='logo'>
      { isFirstView
        ? <div className='full-name'> <LogoFull /> </div>
        : <div className='v'> <LogoMono /> </div>
      }
      <style jsx>{`
        .logo {
          display: flex;
          justify-content: center;
          color: white;
        }
        .logo div {
          font-family: sans-serif;
          font-size: 5em;
        }
        .v {
          border: 5px solid white;
          border-radius: 500px;
          width: 1em;
          height: 1em;
          text-align: center;
        }
      `}</style>
    </div>
  )
}
