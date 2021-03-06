import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import { LineDot } from '../assets/SVGassets'

class ScrollLure extends Component {
  constructor (props) {
    super(props)
    this.state = { show: false }
  }
  componentDidMount () { setTimeout(() => { this.setState({ show: true }) }, 500) } // same kinda timeout thing as with logo: mount, then animate
  render () {
    const { duration } = this.props
    const defaultStyle = {
      transform: 'translateY(125px)'
    }
    const transitionStyles = {
      entering: { transform: 'translateY(125px)' },
      entered: { transform: 'translateY(0)', transition: `transform ${duration}ms ease-out` }
    }
    return (
      <Transition in={this.state.show} timeout={duration}>
        { state => (
          <div className='firstview-footer' style={{ ...defaultStyle, ...transitionStyles[state] }}>
            <div className='tag v-font medium'>GET TO KNOW US.</div>
            <div className='line-dot'>
              <LineDot />
            </div>
            <style jsx>{`
              .firstview-footer {
                position: fixed;
                bottom: 0;
                width: 96%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                z-index: 5;
              }
              .firstview-footer .tag {
                margin-bottom: 1em;
                color: #1F5877;
                font-size: 1.25em;
                letter-spacing: .125em;
              }
              .line-dot {
                z-index: 5;
                height:73px;
              }
            `}</style>
          </div>
        )}
      </Transition>
    )
  }
}

ScrollLure.propTypes = {
  duration: PropTypes.number.isRequired
}

export default ScrollLure
