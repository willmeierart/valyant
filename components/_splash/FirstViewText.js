import React, { Component } from 'react'
import { Transition } from 'react-transition-group'
import { DividerPink, DividerWhite } from '../assets/SVGassets'
import { binder } from '../../lib/_utils'

class FirstViewText extends Component {
  constructor (props) {
    super(props)
    this.state = {
      heightVal: '500px'
    }
  }
  componentDidMount () {
    if (typeof window !== 'undefined') {
      this.setState({ heightVal: `${Math.floor(Math.abs(window.innerHeight) / 2)}px` })
    }
  }
  render () {
    // console.log(this.props.animateIn);
    const { heightVal } = this.state
    const { duration, dir, body, header, animateIn, isFirstView, fallback, header2 } = this.props
    const regVal = 100
    // const regVal = dir === '>>' ? heightVal : '-' + heightVal
    const fallbackVal = dir === '>>' ? '-' + heightVal : heightVal
    // const firstViewStyles={}
    // console.log(animateIn, );
    const baseStyles = {

    }
    const baseStyle = {
      position: 'absolute',
      zIndex: 10,
      height: '100%',
      flexDirection: 'column',
      display: 'flex',
      flexGrow: 1,
      opacity: 1,
      color: '#1F5877',
      width: '100vw',
      textAlign: 'center',
      alignItems: 'center',
      left: 0,
      justifyContent: 'center',
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
    const tranStyle2 = {
      entering: {
        transform: `translate3d(0,-${regVal / 1.5}px,0)`
      }
    }
    const tranStyle3 = {
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
      <Transition appear in={animateIn} timeout={duration}>
        { state => (
          <div className='text-block v-font' style={{ ...baseStyle }}>
            <h1 className='v-font' style={{ ...defaultStyle, ...transitionStyles[state] }}>{ header }</h1>
            <h1><div className='v-font light header-2' style={{ ...defaultStyle, ...transitionStyles[state], ...tranStyle2[state] }}>{ header2 }</div></h1>
            <div className='divider' style={{ ...defaultStyle, ...transitionStyles[state], ...tranStyle3[state] }}>
              <DividerPink />
            </div>
            <h3 className='v-font light' style={{ ...defaultStyle, ...transitionStyles[state], ...tranStyle4[state] }}>{ body }</h3>
            <style jsx>{`
              .text-block h1 {
                text-transform: uppercase;
                font-size: 4em;
                {/* flex-wrap: nowrap;
                white-space:nowrap; */}
                width: 100%;
                margin:0;
                {/* line-height: 0;  */}
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
                font-weight: ${!fallback ? 500 : 'normal'};
                letter-spacing: ${!fallback ? '.05em' : 0}
              }
            `}</style>
          </div>
        )}
      </Transition>
    )
  }
}

export default FirstViewText
