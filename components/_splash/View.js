// import Animate from 'react-move/Animate'
// import NodeGroup from 'react-move/NodeGroup'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { doAnimation } from '../../lib/redux/actions'
import { Transition } from 'react-transition-group'
// import TransitionSled from './TransitionSled'
import raf from 'raf'
import ImageBG from './ImageBG'
import Logo from './Logo'
import TextBlock from './TextBlock'
import { binder } from '../../lib/_utils'

class View extends Component {
  constructor (props) {
    super(props)
    binder(this, ['useRAFRedux'])
  }
  componentDidMount () {
    // this.useRAFRedux()
    if (!this.props.animateIn) {
      this.props.onDoAnimation(true)
    }
  }
  componentDidUpdate () {
    // this.useRAFRedux()
    if (!this.props.animateIn) {
      this.props.onDoAnimation(true)
    }
  }
  useRAFRedux () { 
    raf(() => this.props.onDoAnimation(true))
  }
  render () {
    const { currentView, animateIn } = this.props
    return (
      <div className='view'>
        <div className='inner-view'>
          <div className='logo-wrapper'>
            <Logo isFirstView={currentView.isFirstView}/>
          </div>

          <ImageBG animateIn={animateIn} view={currentView} />


          <div className='fallback-img' />

          <div className='txt-wrapper'>
            <TextBlock animateIn={animateIn} body={currentView.bodyCopy} header={currentView.headerCopy} />
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
            top: 2%;
            width: 100%;
          }
          .img-wrapper {
            position: absolute;
            width: 100%;
            height: 100%;
            transform: translate3d(0,0,0);
            {/* opacity: 0; */}

          }
          .fallback-img {
            background-image: url('${this.props.fallbackImage}');
            background-size: cover;
            width: 100%;
            height: 100%;

          }
          .txt-wrapper {
            position: absolute;
            top: 0;
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
  const { animateIn, currentView, fallbackImage } = state.splash
  return {
    animateIn,
    currentView,
    fallbackImage
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onDoAnimation: bool => dispatch(doAnimation(bool)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
