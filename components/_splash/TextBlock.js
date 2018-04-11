import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import { DividerPink } from '../assets/SVGassets'

class TextBlock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      heightVal: '500px',
      abbrevBody: null,
      innerHeight: null
    }
    this.setSideTagHeight = this.setSideTagHeight.bind(this)
  }
  componentDidMount () {
    if (typeof window !== 'undefined') {
      this.setState(
        {
          heightVal: `${Math.floor(Math.abs(window.innerHeight) / 2.5)}px`,
          innerHeight: window.innerHeight
        }, this.setSideTagHeight()
      )
    }
  }
  componentDidUpdate (prevProps) {
    if (this.props.body !== prevProps.body) {
      this.setSideTagHeight()
    }
  }
  setSideTagHeight () {
    const { fallback } = this.props
    let currentHeight = null
    let fallbackHeight = null
    if (!fallback) {
      const h1Height = 1.2 * this.h1.clientHeight
      const dividerHeight = this.divider.clientHeight
      const h3Height = this.h3.clientHeight
      const compositeHeight = h1Height + dividerHeight + h3Height
      currentHeight = compositeHeight
      console.log(currentHeight)
      this.props.onSetSideTagCurrentHeight(currentHeight)
    }
    if (fallback) {
      const h1Height = 1.2 * this.fallbackH1.clientHeight
      const dividerHeight = this.fallbackDivider.clientHeight
      const h3Height = this.fallbackH3.clientHeight
      const compositeHeight = h1Height + dividerHeight + h3Height
      fallbackHeight = compositeHeight
      console.log(fallbackHeight)
      this.props.onSetSideTagFallbackHeight(fallbackHeight)
    }
  }
  render () {
    const { heightVal } = this.state
    const { duration, dir, body, header, animateIn, isFirstView, fallback, width, isIE } = this.props
    const regVal = dir === '>>' ? heightVal : '-' + heightVal
    const fallbackVal = dir === '>>' ? '-' + heightVal : heightVal
    const defaultStyle = {
      position: 'absolute',
      zIndex: 10,
      flexDirection: 'column',
      display: 'flex',
      flexGrow: 1,
      opacity: fallback ? 1 : 0,
      transform: `translate3d(0,${fallback ? 0 : regVal},0)`,
      color: '#1F5877',
      width: isFirstView && !fallback ? '100vw' : '40vw',
      height: '100%',
      textAlign: isFirstView && !fallback ? 'center' : 'left',
      alignItems: isFirstView && !fallback ? 'center' : 'left',
      left: isFirstView && !fallback ? 0 : '5vw',
      justifyContent: isFirstView && !fallback ? 'center' : 'flex-start'
    }
    const transitionStyles = {
      entering: {
        opacity: fallback ? 1 : 0,
        transform: `translate3d(0,${fallback ? 0 : regVal},0)`
      },
      entered: {
        opacity: fallback ? 0 : 1,
        transform: `translate3d(0,${fallback ? fallbackVal : 0},0)`,
        transition: `opacity ${duration}ms ease-in, transform ${duration}ms cubic-bezier(0.075, 0.82, 0.165, 1)`
      }
    }
    return (
      <Transition in={animateIn} timeout={duration}>
        { state => (
          <div className='text-block v-font' style={{ ...defaultStyle, ...transitionStyles[state] }}>
            <h1 ref={h1 => { fallback ? this.fallbackH1 = h1 : this.h1 = h1 }} className='v-font'>{ header }</h1>
            <div ref={divider => { fallback ? this.fallbackDivider = divider : this.divider = divider }} className='divider'>
              <DividerPink />
            </div>
            <h3 ref={h3 => { fallback ? this.fallbackH3 = h3 : this.h3 = h3 }} className='v-font light'>{ body }</h3>
            <style jsx>{`
              .text-block h1 {
                text-transform: uppercase;
                font-size: ${width < 500 || isIE ? '3em' : '4em'};
                flex-wrap: ${isIE && 'nowrap'};
                white-space: ${isIE && 'nowrap'};
                margin:0;
              }
              .text-block .header-2 {
                font-size: .8em;
                letter-spacing: .25em;
                padding-top: .5em;
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
                width: 75%;
                font-size: 1.25em;
                line-height: 1.25em;
                font-weight: ${isFirstView && !fallback ? 500 : 'normal'};
                letter-spacing: ${isFirstView && !fallback ? '.05em' : 0}
              }
            `}</style>
          </div>
        )}
      </Transition>
    )
  }
}

TextBlock.propTypes = {
  body: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  dir: PropTypes.string.isRequired,
  animateIn: PropTypes.bool.isRequired,
  isFirstView: PropTypes.bool,
  fallback: PropTypes.bool,
  width: PropTypes.number.isRequired,
  isIE: PropTypes.bool.isRequired
}

export default TextBlock
