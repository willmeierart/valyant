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

class ViewMobile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstViewRender: true
    }
    binder(this, ['doAnimationCheck', 'renderImgTxtSets'])
  }
  componentDidMount () {
    // this.doAnimationCheck()
    console.log(viewState)
  }
  componentDidUpdate (prevprops, prevstate) {
    // this.doAnimationCheck()
    // if (!this.props.currentView.isFirstView) {
    //   setTimeout(() => { this.setState({ firstViewRender: false }) }, 200)
    // } else {
    //   setTimeout(() => { this.setState({ firstViewRender: true }) }, 200)
    // }
  }

  doAnimationCheck () {
    if (this.props.animateIn === false) {
      this.props.onDoAnimation(true)
    }
  }

  renderImgTxtSets () {
    const { isMobile, animateIn, isFirstView, isIE, dims: { width, height }, transDir, bodyCopy, headerCopy, mobileSideways } = this.props
    return viewState.map((view, i) => {
      const { alt, imageUrl } = view
      return (
        <div key={i} className='wrapper'>
          <ImageBG isFirstView={isFirstView} isMobile={isMobile} alt={alt} animateIn={animateIn} image={imageUrl} duration={200} />
          <TextBlock
            isIE={isIE}
            height={height}
            width={width}
            dir={transDir}
            animateIn={animateIn}
            body={bodyCopy}
            header={headerCopy}
            duration={300}
            isFirstView={isFirstView}
            isMobile={isMobile}
            mobileSideways={mobileSideways} />
          <style jsx>{`
            .wrapper {
              height: 200vh;
            }
          `}</style>
        </div>
      )
    })
  }

  render () {
    const {
      dims: { width, height },
      currentView: { imageUrl, isFirstView, bodyCopy, headerCopy, alt },
      fallbackView,
      animateIn,
      footerShown,
      transDir,
      isMobile,
      isIE,
      mobileSideways
    } = this.props

    const heightVal = isMobile ? `${height}px` : '100vh'
    const smallLogo = width < 500 // && isMobile
    const sfx = isMobile ? '-do.jpg' : '.jpg'
    return (
      <div className='view'>
        <div className='inner-view'>

          <div className='logo-wrapper'>
            <Logo small={smallLogo} width={width} height={height} isFirstView={isFirstView} firstLogo={this.state.firstViewRender} duration={200} mobileSideways={mobileSideways} />
          </div>

          <div className='main-wrapper'>{ this.renderImgTxtSets() }</div>

          <SideTag width={width} show={!isFirstView} duration={200} />
          <Footer small={smallLogo} width={width} show={footerShown} duration={200} mobileSideways={mobileSideways} />
        </div>
        { (isFirstView && width > 500 && !mobileSideways) && <ScrollLure duration={200} /> }
        <style jsx>{`
          .view {
            width: 96%;
            {/* height: calc(${heightVal} - 4vw); */}
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
        `}</style>
      </div>
    )
  }
}
function mapStateToProps (state) {
  const { animateIn, currentView, fallbackView, footerShown, transDir, dims, isMobile, isIE, mobileSideways } = state.splash
  return {
    animateIn,
    currentView,
    fallbackView,
    footerShown,
    transDir,
    isMobile,
    dims,
    isIE,
    mobileSideways
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onDoAnimation: bool => dispatch(doAnimation(bool)),
    onCanScroll: bool => dispatch(canScroll(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMobile)
