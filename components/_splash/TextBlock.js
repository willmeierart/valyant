import React, { Component } from 'react'
import { Transition } from 'react-transition-group'

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
    const { duration } = this.props
    const defaultStyle = {
      opacity: 0,
      transform: `translate3d(0,${heightVal},0)`
    }
    const transitionStyles = {
      entering: {
        opacity: 0,
        transform: `translate3d(0,${heightVal},0)`
      },
      // entering: { transform: `translateX(${el === 'txt' ? 100 : -100})` },
      entered: {
        opacity: 1,
        transform: 'translate3d(0,0,0)',
        transition: `opacity ${duration}ms ease-in, transform ${2 * duration}ms ease-out`
      }
    }
    return (
      <Transition exit={false} in={this.props.animateIn} timeout={duration}>
        { state => (
          <div ref={ref => { this.textBlock = ref }} className='text-block' style={{ ...defaultStyle, ...transitionStyles[state] }}>
            <h1>{ this.props.header }</h1>
            <h3>{ this.props.body }</h3>
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
