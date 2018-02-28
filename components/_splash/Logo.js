import React, { Component } from 'react'
import { Transition } from 'react-transition-group'
import { LogoFull, LogoMono } from '../assets/SVGassets'

export default class Logo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      logoIn: false
    }
  }
  componentDidMount () {
    setTimeout(() => { this.setState({ logoIn: true }) }, 200)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps != this.props) {
      // console.log(nextProps, this.props);
      if (nextProps.isFirstView === undefined) {
        // this.setState({ logoIn: false })
        setTimeout(() => { this.setState({ logoIn: false }) }, 200) 
        // console.log('not first view');
      } else {
        setTimeout(() => { this.setState({ logoIn: true }) }, 200)
        // console.log('first view')      
      }
    }
  }
  delayExit () {
    setTimeout(() => {}, this.props.duration)
  }
  render () {
    const { isFirstView, duration } = this.props

    const uploadDir = 'https://s3.us-east-2.amazonaws.com/valyant/splash/'

    const defaultStyle = {
      transform: 'translate3d(0,0,0)',
      transition: `transform ${duration}ms ease-out`
    }
    const transitionStyles = {
      entering: { transform: 'translate3d(0,0,0)' },
      entered: { transform: 'translate3d(0,calc(20vh),0)' },
      exiting: { transform: 'translate3d(0,0,0)' }
    }
    const terms = !this.state.logoIn ? isFirstView : this.state.logoIn
    return (
      <div className='logo'>
        { terms
          ? <Transition onExit={this.delayExit.bind(this)} onExiting={this.delayExit.bind(this)} in={this.props.firstLogo} timeout={200}>
            {state => (
              <div className='full-name' style={{ ...defaultStyle, ...transitionStyles[state] }}>
                <LogoFull />
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
            {/* margin-top: 20vh; */}
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

  // return (
  //   <Transition in={isFirstView} timeout={duration}>
  //     {state => (
  //       <div className='side-tag' style={{ ...defaultStyle, ...transitionStyles[state] }}>
  //         <style jsx>{`
  //           .side-tag {
  //             position: absolute;
  //             left: -1vw;
  //             top: 35vh;
  //             height: 30vh;
  //             width: 5vw;
  //             z-index: 30;
  //             background-color: #4597BB;            
  //           }
  //         `}</style>
  //       </div>
  //     )}
  //   </Transition>
