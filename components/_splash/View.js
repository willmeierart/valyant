import React, { Component } from 'react'
import { connect } from 'react-redux'
import { doAnimation } from '../../lib/redux/actions'
// import TransitionSled from './TransitionSled'
// import raf from 'raf'
import ImageBG from './ImageBG'
import Logo from './Logo'
import TextBlock from './TextBlock'
import SideTag from '../layout/SideTag'
import Footer from '../layout/Footer'
import { binder } from '../../lib/_utils'

class View extends Component {
  constructor (props) {
    super(props)
    binder(this, ['doAnimationCheck'])
  }
  componentDidMount () { this.doAnimationCheck() }
  componentDidUpdate () { this.doAnimationCheck() }

  doAnimationCheck () { 
    // raf(() => this.props.onDoAnimation(true))
    if (!this.props.animateIn) { this.props.onDoAnimation(true) }
  }

  render () {
    const { currentView, animateIn, footerShown, fallbackImage } = this.props
    console.log(currentView.imageUrl)
    
    return (
      <div className='view'>
        <div className='inner-view'>

          <div className='logo-wrapper'>
            <Logo isFirstView={currentView.isFirstView} />
          </div>

          <ImageBG animateIn={animateIn} image={currentView.imageUrl} duration={200} />
          <div className='fallback-img' />

          <div className='txt-wrapper'>
            <TextBlock animateIn={animateIn} body={currentView.bodyCopy} header={currentView.headerCopy} duration={200} />
          </div>

          <SideTag show={!currentView.isFirstView} duration={200} />

          <Footer show={footerShown} duration={200} />

        </div>
        <style jsx>{`
          .view {
            width: 96%;
            height: 96%;
            padding: 2%;
            overflow: hidden;
            position: absolute;
          }
          .inner-view {
            width: 100%;
            height: 100%;
            position: relative;
          }
          .logo-wrapper {
            position:absolute;
            z-index: 10;
            top: 2%;
            width: 100%;
          }
          .fallback-img {
            background-image: url('${fallbackImage}');
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
          .side-tag {
            position: absolute;
            left: -1vw;
            top: 35vh;
            height: 30vh;
            width: 5vw;
            z-index: 30;
            background-color: #4597BB;            
          }
        `}</style>
      </div>
    )
  }
}
function mapStateToProps (state) {
  const { animateIn, currentView, fallbackImage, footerShown } = state.splash
  return {
    animateIn,
    currentView,
    fallbackImage,
    footerShown
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onDoAnimation: bool => dispatch(doAnimation(bool)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
