import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import { DividerPink } from '../assets/SVGassets'

class FirstViewText extends Component {
  constructor (props) {
    super(props)
    this.state = { heightVal: '500px' }
  }
  render () {
    const { duration, body, header, animateIn, fallback, width, isIE } = this.props
    const regVal = 100
    const lg = width > 500
    const baseStyle = {
      position: 'absolute',
      zIndex: 10,
      height: '100%',
      flexDirection: 'column',
      display: 'flex',
      flexGrow: 1,
      opacity: 1,
      color: '#1F5877',
      width: lg ? '96%' : '100%',
      left: lg ? '2%' : 0,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: lg ? 'center' : 'flex-start'
    }
    const defaultStyle = {
      transition: `opacity ${duration}ms ease-in, transform ${duration}ms ease-in`
    }
    const transitionStyles = {
      entering: {
        opacity: 0,
        transform: `translate3d(0,-${regVal}px,0)`
      },
      entered: {
        opacity: 1,
        transform: `translate3d(0,0,0)`
      }
    }
    const tranStyle3 = { // having these multiple tiered styling blocks allows cascading animation of different elements
      entering: {
        transform: `translate3d(0,-${regVal / 2}px,0)`
      }
    }
    const tranStyle4 = {
      entering: {
        transform: `translate3d(0,-${regVal / 3}px,0)`
      }
    }
    return (
      width !== null
      ? <Transition appear in={animateIn} timeout={duration}>
        { state => (
          <div className='text-block v-font' style={{ ...baseStyle }}>
            <h1 className='v-font' style={{ ...defaultStyle, ...transitionStyles[state] }}>{ header }</h1>
            <div className='divider' style={{ ...defaultStyle, ...transitionStyles[state], ...tranStyle3[state] }}>
              <DividerPink />
            </div>
            <h3 className='v-font light' style={{ ...defaultStyle, ...transitionStyles[state], ...tranStyle4[state] }}>{ body }</h3>
            <style jsx>{`
              .text-block h1 {
                text-transform: uppercase;
                font-size: ${width < 500 || isIE ? '2.5em' : '4em'};
                margin:0;
                margin-top: ${lg ? 0 : '3vh'};
              }
              .text-block h3, .text-block h1 {
                z-index: 10;
              }
              .text-block h1:last-of-type {
                padding-bottom: .25em;
              }
              .divider {
                height: 17px;
              }
              .text-block h3 {
                width: ${width < 500 ? '100%' : '75%'};
                font-size: 1.25em;
                line-height: 1.25em;
                font-weight: ${!fallback ? 500 : 'normal'};
                letter-spacing: ${!fallback ? '.05em' : 0}
              }
            `}</style>
          </div>
        )}
      </Transition>
      : null
    )
  }
}

FirstViewText.propTypes = {
  duration: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  animateIn: PropTypes.bool.isRequired,
  fallback: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  isIE: PropTypes.bool.isRequired
}

export default FirstViewText
