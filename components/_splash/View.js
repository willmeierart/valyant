import React, { Component } from 'react'
import { connect } from 'react-redux'
import { doAnimation } from '../../lib/redux/actions'
// import TransitionSled from './TransitionSled'
import raf from 'raf'
import ImageBG from './ImageBG'
import Logo from './Logo'
import TextBlock from './TextBlock'
import TextBlockOut from './TextBlockOut'
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
    console.log(this.props.animateIn);
    if (this.props.animateIn === false) {
      // raf(() => this.props.onDoAnimation(true))
      
      this.props.onDoAnimation(true)
    }
  }

  render () {
    const { currentView: { imageUrl, isFirstView, bodyCopy, headerCopy, color }, fallbackView, animateIn, footerShown, transDir } = this.props
    console.log(imageUrl)
    
    return (
      <div className='view'>
        <div className='inner-view'>

          <div className='logo-wrapper'>
            <Logo isFirstView={isFirstView} />
          </div>

          <ImageBG color={color} animateIn={animateIn} image={imageUrl} duration={200} />
          <div className='fallback-img' />

          <div className='txt-wrapper'>
            <TextBlock dir={transDir} animateIn={animateIn} body={bodyCopy} header={headerCopy} duration={200} />
            <TextBlockOut dir={transDir} animateIn={animateIn} body={fallbackView.bodyCopy} header={fallbackView.headerCopy} duration={100} />
          </div>

          <SideTag show={!isFirstView} duration={200} />

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
            {/* position: absolute; */}
            {/* top: 0; left: 0; */}
            background-image: url('${fallbackView.imageUrl}');
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
  const { animateIn, currentView, fallbackView, footerShown, transDir } = state.splash
  return {
    animateIn,
    currentView,
    fallbackView,
    footerShown,
    transDir
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onDoAnimation: bool => dispatch(doAnimation(bool)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
