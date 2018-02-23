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
      this.setState({ heightVal: `${Math.floor(Math.abs(window.screenY) / 2)}px` })
    }
  }
  render () {
    const { heightVal } = this.state
    const { duration, dir, body, header, animateIn, isFirstView, fallback } = this.props
    const regVal = dir === '>>' ? heightVal : '-' + heightVal
    const fallbackVal = dir === '>>' ? '-' + heightVal : heightVal
    // const firstViewStyles={}
    const defaultStyle = {
      opacity: fallback ? 1 : 0,
      transform: `translate3d(0,${fallback ? 0 : regVal},0)`,
      color: isFirstView && !fallback ? '#1F5877' : 'white',
      width: isFirstView ? '100vw' : '50vw',
      textAlign: isFirstView ? 'center' : 'left',
      alignItems: isFirstView ? 'center' : 'left',
      left: isFirstView ? 0 : '5vw'
      // marginLeft: '5vw'
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
        transition: `opacity ${duration}ms ease-in, transform ${duration}ms ease-out`
      }
    }
    let splitHeader = ['', '']
    if (header !== undefined) {
      splitHeader = isFirstView && header ? header.split('? ') : [header, '']
    }
    return (
      <Transition in={animateIn} timeout={duration}>
        { state => (
          <div className='text-block v-font' style={{ ...defaultStyle, ...transitionStyles[state] }}>
            <h1 className='v-font'>{ isFirstView ? splitHeader[0] + '?' : splitHeader[0] }<div className='v-font light header-2'>{ splitHeader[1] }</div></h1>
            { isFirstView
              ? <DividerPink />
              : <DividerWhite />
            }
            <h3 className='v-font light'>{ body }</h3>
            <style jsx>{`
              .text-block {
                height:100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                z-index: 10;
                position: absolute;
              }
              .text-block h1 {
                text-transform: uppercase;
                font-size: 4em;
                flex-wrap: nowrap;
                white-space:nowrap;
                width: ${isFirstView ? '100%' : '50%'};
                {/* line-height: 0;  */}
              }
              .text-block .header-2 {
                font-size: .8em;
              }

              .text-block h3, .text-block h1 {
                z-index: 10;
                
              }
              .text-block h3 {
                width: 50%;
              }
            `}</style>
          </div>
        )}
      </Transition>
    )
  }
}

export default TextBlock
