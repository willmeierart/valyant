import React, { Component } from 'react'
import { Transition } from 'react-transition-group'
import { binder } from '../../lib/_utils'

class TextBlock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      heightVal: '100px'
    }
  }
  componentDidMount () {
    if (typeof window !== 'undefined') {
      this.setState({ heightVal: `${Math.floor(Math.abs(window.screenY) / 2)}px` })
    }
  }
  render () {
    const { heightVal } = this.state
    const { duration, dir, body, header, animateIn } = this.props
    const defaultStyle = {
      opacity: 1,
      transform: `translate3d(0,0,0)`
    }
    const transitionStyles = {
      entering: {
        opacity: 1,
        transform: `translate3d(0,0,0)`
      },
      entered: {
        opacity: 0,
        transform: `translate3d(0,${dir === '>>' ? '-' + heightVal : heightVal},0)`,
        transition: `opacity ${duration}ms ease-in, transform ${duration}ms ease-in`
      }
    }
    return (
      <Transition in={animateIn} timeout={duration}>
        { state => (
          <div className='text-block' style={{ ...defaultStyle, ...transitionStyles[state] }}>
            <h1>{ header }</h1>
            <h3>{ body }</h3>
            <style jsx>{`
              .text-block {
                height:100vh;
                width: 50vw;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: white;
                z-index: 10;
              } 
              .text-block h3, .text-block h1 {
                z-index: 10;
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
