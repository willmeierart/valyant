import React, { Component } from 'react'
import { Transition } from 'react-transition-group'

class ImageBG extends Component {
  render () {
    const { animateIn, duration, color, image } = this.props
    const defaultStyle = {
      opacity: 0,
      backgroundImage: `url('${image}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
      // background: color
    }
    const transitionStyles = {
      entering: { opacity: 0 },
      entered: { opacity: 1, transition: `opacity ${duration}ms ease-in` }
    }
    return (
      <Transition in={animateIn} timeout={duration}>
        { state => (
          <div className='img-wrapper' style={{ ...defaultStyle, ...transitionStyles[state] }}>
            <div className='inner-wrapper' style={{ ...defaultStyle.backgroundPosition }} />
            <style jsx>{`
              .inner-wrapper {
                background-size: cover;
                background-position: center;
                width: 100%;
                height: 100%;
              }
              h1 {
                position: absolute;
                top: 20vh;
                right: 20vw;
                color: black;
              }
              .img-wrapper {
                position: absolute;
                width: 100%;
                height: 100%;
                {/* opacity:0;  */}
              }
            `}</style>
          </div>
        )}
      </Transition>
    )
  }
}

export default ImageBG
