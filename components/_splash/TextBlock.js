import React, { Component } from 'react'
import { TransitionMotion, spring, presets } from 'react-motion'
// import PropTypes from 'prop-types'
// import { CSSTransition } from 'react-transition-group'


class TextBlock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inProp: false
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({ inProp: true })
    }, 100)
  }

  render () {
    const { inProp } = this.state
    console.log(inProp);
    // const defaultStyle = {
    //   transition: 'transform 800ms ease-in-out',
    //   transform: `translateX(-100)`
    // }
    // const transitionStyles = {
    //   entering: { transform: `translateX(-100)` },
    //   // entering: { transform: `translateX(${el === 'txt' ? 100 : -100})` },
    //   entered: { transform: `translateX(0)` }
    // }
    return (
      // <CSSTransition classNames='slide-in' timeout={100} {...this.props}>
      <div className='text-block'>
        <h1>{ this.props.header }</h1>
        <h3>{ this.props.body }</h3>
        <style jsx>{`
          .text-block {
            height:100vh;
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
            text-align: center;
          }
        `}</style>
      </div>
      // </CSSTransition>
    )
  }
}

TextBlock.propTypes = {

}

export default TextBlock


{
  /* <div className='text-block'>
        <h1>{ this.props.header }</h1>
        <h3>{ this.props.body }</h3>
        <style jsx>{`
          .text-block {
            height:100vh;
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
            text-align: center;
          }
        `}</style>
      </div> */
}