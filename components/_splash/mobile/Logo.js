import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import { LogoFull, LogoMono } from '../../assets/SVGassets'

export default class Logo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      logoIn: false
    }
  }
  componentDidMount () {
    setTimeout(() => { this.setState({ logoIn: true }) })
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props) {
      if (nextProps.isFirstView === undefined) {
        setTimeout(() => { this.setState({ logoIn: false }) }, 200) // conditional rendering timeout so animations can occur regardless of mounting state
      } else {
        setTimeout(() => { this.setState({ logoIn: true }) }, 200)
      }
    }
  }
  delayExit () {
    setTimeout(() => {}, this.props.duration)
  }
  render () {
    const { isFirstView, duration, width, height, small, mobileSideways } = this.props

    // const uploadDir = 'https://s3.us-east-2.amazonaws.com/valyant/splash/'

    const defaultStyle = {
      opacity: 0,
      transform: 'translate3d(0,0,0)',
      transition: `all ${duration}ms ease-out`
    }
    const transitionStyles = {
      entering: {
        transform: 'translate3d(0,0,0)',
        opacity: 0
      },
      entered: {
        transform: `translate3d(0,${width > 700 && !mobileSideways ? height > width ? 'calc(15vh)' : 'calc(10vh)' : 0},0)`,
        opacity: 1
      },
      exiting: {
        transform: 'translate3d(0,0,0)',
        opacity: 0
      }
    }
    const terms = !this.state.logoIn ? isFirstView : this.state.logoIn
    const w = small || mobileSideways ? 226 : 339 // pass size props down to svg
    const h = small || mobileSideways ? 78 : 108
    return (
      <div className='logo'>
        { terms
          ? <Transition onExit={this.delayExit.bind(this)} onExiting={this.delayExit.bind(this)} in={this.props.firstLogo} timeout={200}>
            {state => (
              <div className='full-name' style={{ ...defaultStyle, ...transitionStyles[state] }}>
                <LogoFull w={w} h={h} />
              </div>
            )}
          </Transition>
          : <div className='v'> <LogoMono /> </div>
        }
        <style jsx>{`
          .logo {
            display: flex;
            justify-content: center;
            color: white;
          }
          .full-name {
            width: ${w};
            height: ${h};
          }
          .logo div {
            font-family: sans-serif;
            font-size: 5em;
          }
        `}</style>
      </div>
    )
  }
}

Logo.propTypes = {
  isFirstView: PropTypes.bool,
  duration: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  small: PropTypes.bool.isRequired,
  mobileSideways: PropTypes.bool.isRequired
}
