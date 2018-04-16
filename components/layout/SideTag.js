import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'

class SideTag extends Component {
  render () {
    const { show, duration, width, currentHeight, fallbackHeight } = this.props
    const defaultStyle = {
      opacity: 0,
      transform: 'translate3d(-5vw,0,0)',
      transition: `
        opacity ${duration}ms ease-in,
        transform ${duration}ms ease-in,
        height ${duration}ms ease-in ${1.5 * duration}ms
      `,
      top: width > 500 ? '35vh' : '20vh',
      height: fallbackHeight || currentHeight
    }
    const transitionStyles = {
      entering: { opacity: 0, transform: 'translate3d(-5vw,0,0)' },
      entered: { opacity: 1, transform: 'translate3d(0,0,0)' }
    }
    return (
      <Transition in={show} timeout={duration}>
        {state => (
          <div className='side-tag' style={{ ...defaultStyle, ...transitionStyles[state] }}>
            <style jsx>{`
              .side-tag {
                position: absolute;
                left: -1vw;
                top: ${width > 500 ? '35vh' : '20vh'};
                height: ${1.5 * currentHeight};
                width: 5vw;
                z-index: 30;
                background-color: #4597BB;            
              }
            `}</style>
          </div>
        )}
      </Transition>
    )
  }
}

SideTag.propTypes = {
  show: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  width: PropTypes.number
}

export default SideTag
