import React from 'react'

export default ({ isFirstView }) => {
  return (
    <div className='logo'>
      { isFirstView
        ? <div className='full-name'> Valyant </div>
        : <div className='v'> V </div>
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
