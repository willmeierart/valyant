import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { doAnimation, canScroll, setSideTagHeight } from '../../lib/redux/actions'
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
  componentDidMount () {
    console.log(this.props)
    this.doAnimationCheck()
  }
  componentDidUpdate (prevprops, prevstate) {
    this.doAnimationCheck()
    if (!this.props.currentView.isFirstView) {
      setTimeout(() => { this.setState({ firstViewRender: false }) }, 200)
    } else {
      setTimeout(() => { this.setState({ firstViewRender: true }) }, 200)
    }
  }

  doAnimationCheck () {
    if (this.props.animateIn === false) {
      this.props.onDoAnimation(true)
    }
  }
  render () {
    const {
      dims: { width, height },
      currentView: { imageUrl, isFirstView, bodyCopy, headerCopy, alt },
      fallbackView,
      animateIn,
      footerShown,
      transDir,
      isIE
    } = this.props

    const sfx = width <= 500 ? '-half.jpg' : '.jpg'
    const heightVal = '100vh'
    const smallLogo = width < 500
    return (
      <div className='view'>
        <div className='inner-view'>

          <div className='logo-wrapper'>
            <Logo small={smallLogo} width={width} height={height} isFirstView={isFirstView} firstLogo={this.state.firstViewRender} duration={200} />
          </div>

          <ImageBG width={width} isFirstView={isFirstView} alt={alt} animateIn={animateIn} image={imageUrl} duration={200} />
          <div className='fallback-img' style={{ zIndex: 6, backgroundSize: isFirstView ? 'cover' : 'contain' }} />

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
                isFirstView={isFirstView}
                isIE={isIE} />
            </div>
            : <div className='txt-wrapper'>
              {/* maybe consider consolidating the following:  */}
              <TextBlock
                isIE={isIE}
                height={height}
                width={width / 2}
                dir={transDir}
                animateIn={animateIn}
                body={bodyCopy}
                header={headerCopy}
                duration={300}
                isFirstView={isFirstView} />
              <TextBlock
                isIE={isIE}
                height={height}
                width={width / 2}
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
          <Footer small={smallLogo} width={width} show={footerShown} duration={200} />
        </div>
        { (isFirstView && width > 500) && <ScrollLure duration={200} /> }
        <style jsx>{`
          .view {
            width: 96%;
            height: calc(${heightVal} - 4vw);
            padding: 2vw;
            position: absolute;
            height: 100vh;
          }
          .inner-view {
            width: 100%;
            height: 100vh;
            position: relative;
          }
          .logo-wrapper {
            position:absolute;
            z-index: 10;
            top: 2%;
            width: 100%;
          }
          .fallback-img {
            background-image: url('${fallbackView.imageUrl + sfx}');
            background-repeat: no-repeat;
            background-position: center;
            width: 50%;
            margin-left: 50%;
            height: 100%;
            z-index: 6;
            opacity: ${isFirstView || fallbackView.imageUrl.indexOf('01') !== -1 ? 0 : 1};
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
  const { animateIn, currentView, fallbackView, footerShown, transDir, dims, isIE } = state.splash
  return {
    animateIn,
    currentView,
    fallbackView,
    footerShown,
    transDir,
    dims,
    isIE
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onDoAnimation: bool => dispatch(doAnimation(bool)),
    onCanScroll: bool => dispatch(canScroll(bool)),
    onSetSideTagHeight: h => dispatch(setSideTagHeight(h))
  }
}

View.propTypes = {
  animateIn: PropTypes.bool.isRequired,
  currentView: PropTypes.object.isRequired,
  fallbackView: PropTypes.object,
  footerShown: PropTypes.bool.isRequired,
  isFirstView: PropTypes.bool,
  isIE: PropTypes.bool,
  dims: PropTypes.object.isRequired,
  transDir: PropTypes.string.isRequired,
  onSetSideTagHeight: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
