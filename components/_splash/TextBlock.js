import React, { Component } from 'react'
import { Transition } from 'react-transition-group'
import { DividerPink, DividerWhite } from '../assets/SVGassets'
import { binder } from '../../lib/_utils'

class TextBlock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      heightVal: '500px'
    }
  }
  componentDidMount () {
    if (typeof window !== 'undefined') {
      this.setState({ heightVal: `${Math.floor(Math.abs(window.innerHeight) / 2.5)}px` })
    }
  }
  render () {
    // const width = typeof window !== 'undefined' ? window.innerWidth : 900  
    const { heightVal } = this.state
    const { duration, dir, body, header, animateIn, isFirstView, fallback, width, height, isIE } = this.props
    const regVal = dir === '>>' ? heightVal : '-' + heightVal
    const fallbackVal = dir === '>>' ? '-' + heightVal : heightVal
    // const firstViewStyles={}
    const defaultStyle = {
      position: 'absolute',
      zIndex: 10,
      height: '100%',
      flexDirection: 'column',
      display: 'flex',
      flexGrow: 1,
      opacity: fallback ? 1 : 0,
      transform: `translate3d(0,${fallback ? 0 : regVal},0)`,
      color: 'white',
      width: isFirstView && !fallback ? '100vw' : width < 500 ? '90vw' : '50vw',
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
      // entering: { transform: `translateX(${el === 'txt' ? 100 : -100})` },
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
            <h1 className='v-font'>{ header }</h1>
            <div className='divider'>
              <DividerWhite />
            </div>
            <h3 className='v-font light'>{ body }</h3>
            <style jsx>{`
              .text-block {
                width: ${isFirstView || width < 500 ? '100%' : width < height ? '50%' : '75%'};
              }
              .text-block h1 {
                text-transform: uppercase;
                font-size: ${width < 500 ? '3em' : '4em'};
                {/* flex-wrap: nowrap;
                white-space:nowrap; */}
                margin:0;
                margin-bottom: ${isIE && width < 500 ? '1em' : 0}
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
                width: ${width > 500 && width < height ? '75%' : '100%'};
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

export default TextBlock
