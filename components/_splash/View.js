// import Animate from 'react-move/Animate'
// import NodeGroup from 'react-move/NodeGroup'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { doAnimation } from '../../lib/redux/actions'
import { Transition } from 'react-transition-group'
import TransitionSled from './TransitionSled'
import raf from 'raf'
import ImageBG from './ImageBG'
import Logo from './Logo'
import TextBlock from './TextBlock'
import { binder } from '../../lib/_utils'

class View extends Component {
  constructor (props) {
    super(props)
    this.state = { inProp: false }
    binder(this, ['useRAFRedux'])
  }

  componentDidMount () {
    this.useRAFRedux()
  }

  componentDidUpdate () {
    this.useRAFRedux()
  }

  useRAFRedux () { raf(() => raf(() => setTimeout(() => { this.props.onDoAnimation(true) }))) }

  render () {
    // const { imageUrl, copyStyles, headerCopy, bodyCopy, isFirstView, index } = this.props.view
    console.log('view rerender')
    // const { inProp } = this.state
    // const inProp = setTimeout(() => { return true }, 50)
    const defaultStyle = {
      transition: 'transform 800ms ease-in-out',
      transform: `translateX(-100)`
    }
    const transitionStyles = {
      entering: { transform: `translateX(-100)` },
      // entering: { transform: `translateX(${el === 'txt' ? 100 : -100})` },
      entered: { transform: `translateX(0)` }
    }
    // console.log(inProp);
    // console.log(bodyCopy);
    return (
      <div className='view'>
        <div className='inner-view'>
          <div className='logo-wrapper'>
            <Logo />
          </div>
          <Transition in={this.props.animateIn} timeout={200}>
            { state => (
              <div className='img-wrapper' style={{ ...defaultStyle, ...transitionStyles[state] }}>
                { state }
                <ImageBG />
              </div>
            )}
          </Transition>

          <div className='txt-wrapper'>
            <TextBlock />
          </div>
        </div>
        <style jsx>{`
          .view {
            width: 96%;
            height: 96%;
            overflow: hidden;
            position: absolute;
          }
          .inner-view {
            width: 100%;
            height: 100%;
            position: relative;
            {/* top: -21px!important; */}
          }
          .logo-wrapper {
            position:absolute;
            z-index: 10;
            width: 100%;
          }
          .img-wrapper {
            position: absolute;
            width: 100%;
            height: 100%;
            transform: translate3d(0,0,0)
          }
          .txt-wrapper {
            display: absolute;
            z-index: 10;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    )
  }
}
function mapStateToProps (state) {
  const { animateIn } = state.splash
  return {
    animateIn
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onDoAnimation: bool => dispatch(doAnimation(bool)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
