import React, { Component } from 'react'
import { connect } from 'react-redux'
import { doAnimation, canScroll } from '../../lib/redux/actions'
import ImageBG from './ImageBG'
import Logo from './Logo'
import TextBlock from './TextBlock'
import FirstViewText from './FirstViewText'
import SideTag from '../layout/SideTag'
import Footer from '../layout/Footer'
import ScrollLure from './ScrollLure'
import { binder } from '../../lib/_utils'
import viewState from '../../lib/data/viewState'

class View extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstViewRender: true
    }
    binder(this, ['doAnimationCheck'])
  }
  componentDidMount () { this.doAnimationCheck() }
  componentDidUpdate () {
    // console.log(this.props.isFirstView);
    this.doAnimationCheck()
    if (!this.props.currentView.isFirstView) {
      setTimeout(() => { this.setState({ firstViewRender: false }) }, 200)
    } else {
      setTimeout(() => { this.setState({ firstViewRender: true }) }, 200)
      // this.setState({ firstViewRender: true })
    }
  }

  doAnimationCheck () {
    if (this.props.animateIn === false) {
      this.props.onDoAnimation(true)
    }
  }

  render () {
    const { dims: { width, height }, currentView: { imageUrl, isFirstView, bodyCopy, headerCopy, color }, fallbackView, animateIn, footerShown, transDir } = this.props
    return (
      <div className='view'>
        <div className='inner-view'>

          <div className='logo-wrapper'>
            <Logo width={width} isFirstView={isFirstView} firstLogo={this.state.firstViewRender} duration={200} />
          </div>

          <ImageBG color={color} animateIn={animateIn} image={imageUrl} duration={200} />
          <div className='fallback-img' style={{ zIndex: 6 }} />

          { this.state.firstViewRender
            ? <div className='txt-wrapper'>
              <FirstViewText
                width={width}
                dir={transDir}
                animateIn={animateIn}
                body={viewState[0].bodyCopy} 
                header={viewState[0].headerCopy} 
                header2={viewState[0].subHeaderCopy} 
                duration={200}
                isFirstView={isFirstView} />
              {/* <FirstViewText fallback dir={transDir} animateIn={animateIn} body={fallbackView.bodyCopy} header={fallbackView.headerCopy} header2={fallbackView.subHeaderCopy} duration={200} /> */}
            </div>
            : <div className='txt-wrapper'>
              <TextBlock
                height={height}
                width={width}
                dir={transDir}
                animateIn={animateIn}
                body={bodyCopy}
                header={headerCopy}
                duration={300}
                isFirstView={isFirstView} />
              <TextBlock
                height={height}
                width={width}
                fallback
                dir={transDir}
                animateIn={animateIn}
                body={fallbackView.bodyCopy}
                header={fallbackView.headerCopy}
                duration={300}
                isFirstView={isFirstView} />
            </div>
          }
          
          <SideTag width={width} show={!isFirstView} duration={200} />
          <Footer width={width} show={footerShown} duration={200} />
        </div>
        { (isFirstView && width > 500) && <ScrollLure duration={200} /> }
        <style jsx>{`
          .view {
            width: 96%;
            height: calc(100vh - 4vw);
            padding: 2vw;
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
            background-image: url('${fallbackView.imageUrl}');
            background-size: cover;
            background-position: center;
            width: 100%;
            height: 100%;
            z-index: 6;
          }
          .txt-wrapper {
            position: absolute;
            top: ${width > 500 ? '35vh' : '20vh'};
            z-index: 10;
            width: 100%;
            height: ${width > 500 ? '30vh' : '45vh'};
          }
        `}</style>
      </div>
    )
  }
}
function mapStateToProps (state) {
  const { animateIn, currentView, fallbackView, footerShown, transDir, dims } = state.splash
  return {
    animateIn,
    currentView,
    fallbackView,
    footerShown,
    transDir,
    dims
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onDoAnimation: bool => dispatch(doAnimation(bool)),
    onCanScroll: bool => dispatch(canScroll(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
