import React, { Component } from 'react'
import LazyLoad from 'react-lazyload'
import { connect } from 'react-redux'
import { doAnimation, canScroll } from '../../../lib/redux/actions'
import ImageBG from './ImageBG'
import Logo from './Logo'
import TextBlock from './TextBlock'
import FirstViewText from './FirstViewText'
import SideTag from '../../layout/SideTag'
import Footer from '../../layout/Footer'
import ScrollLure from '.././ScrollLure'
import { binder } from '../../../lib/_utils'
import viewState from '../../../lib/data/viewState'

class View extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstViewRender: true
    }
    binder(this, ['renderImgTxtSets'])
  }
  componentDidMount () {
    console.log(viewState)
  }
  componentDidUpdate (prevprops, prevstate) {}

  renderImgTxtSets () {
    const { animateIn, isFirstView, isIE, dims: { width, height }, transDir, mobileSideways } = this.props
    const heightVal = `${height * 1.5}px`
    return viewState.map((view, i) => {
      const { alt, imageUrl, headerCopy, bodyCopy } = view
      return (
        <div key={i} className='wrapper'>
          <LazyLoad height={heightVal} once>
            { i === 0
              ? <FirstViewText
                width={width}
                dir={transDir}
                animateIn={animateIn}
                body={viewState[0].bodyCopy}
                header={viewState[0].headerCopy}
                header2={viewState[0].subHeaderCopy}
                duration={200}
                isFirstView={isFirstView}
                isIE={isIE}
                mobileSideways={mobileSideways} />
              : <TextBlock
                isIE={isIE}
                height={height / 2}
                width={width}
                dir={transDir}
                animateIn={animateIn}
                body={bodyCopy}
                header={headerCopy}
                duration={300}
                isFirstView={isFirstView}
                mobileSideways={mobileSideways} />
            }
            <ImageBG isFirstView={isFirstView} alt={alt} animateIn={animateIn} image={imageUrl} duration={200} />
          </LazyLoad>
          <style jsx>{`
            .wrapper {
              height: ${heightVal};
            }
          `}</style>
        </div>
      )
    })
  }

  render () {
    const { dims: { width, height }, currentView: { isFirstView }, footerShown, mobileSideways } = this.props
    const smallLogo = width < 500
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
  const { animateIn, currentView, fallbackView, footerShown, transDir, dims, isIE, mobileSideways } = state.splash
  return {
    animateIn,
    currentView,
    fallbackView,
    footerShown,
    transDir,
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

export default connect(mapStateToProps, mapDispatchToProps)(View)