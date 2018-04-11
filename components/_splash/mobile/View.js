import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import { connect } from 'react-redux'
import { doAnimation, canScroll } from '../../../lib/redux/actions'
import ImageBG from './ImageBG'
import Logo from './Logo'
import TextBlock from './TextBlock'
import FirstViewText from './FirstViewText'
import SideTag from '../../layout/SideTag'
import Footer from '../../layout/Footer'
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

  renderImgTxtSets () {
    const { animateIn, isFirstView, isIE, dims: { width, height }, transDir, mobileSideways } = this.props
    const heightVal = `${height * 1.5}px`
    return viewState.map((view, i) => {
      const { alt, imageUrl, headerCopy, bodyCopy } = view
      return (
        <div key={i} className='wrapper'>
          <LazyLoad height={heightVal} once>
            <div className='text'>
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
                  body={bodyCopy}
                  header={headerCopy} />
              }
            </div>
            <div className='img-wrapper'>
              <ImageBG isFirstView={i === 0} alt={alt} animateIn={animateIn} image={imageUrl} duration={200} />
              { i === 0 && <div className='fadeout' /> }
            </div>
          </LazyLoad>
          <style jsx>{`
            .wrapper {
              position: relative;
              height: ${i === 0 ? '100vh' : '150vh'};
              display: flex;
              flex-grow: 1;
              flex-direction: column;
              justify-content: space-around;
            }
            .img-wrapper {
              position: ${i === 0 ? 'absolute' : 'static'};
              height: ${i === 0 ? '100%' : '50%'};
              width: 100%;
              {/* display: flex; */}
              {/* align-items: center; */}
            }
            .fadeout {
              background: linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1));
              position: absolute;
              width: 100%;
              height: 50%;
              bottom: 0;
            }
            .text {
              top: 0;
              height: 50%;
              display: flex;
              align-items: center;
              {/* margin: 10vh 0; */}
            }
          `}</style>
        </div>
      )
    })
  }

  render () {
    const { dims: { width, height }, currentView: { isFirstView }, mobileSideways } = this.props
    const smallLogo = width < 500
    return (
      <div className='view'>
        <div className='inner-view'>

          <div className='logo-wrapper'>
            <Logo small={smallLogo} width={width} height={height} isFirstView={isFirstView} firstLogo={this.state.firstViewRender} duration={200} mobileSideways={mobileSideways} />
          </div>

          <div className='main-wrapper'>{ this.renderImgTxtSets() }</div>

          <Footer isMobile small={smallLogo} width={width} duration={200} mobileSideways={mobileSideways} />
        </div>
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
  const { animateIn, currentView, fallbackView, footerShown, transDir, dims, mobileSideways } = state.splash
  return {
    animateIn,
    currentView,
    fallbackView,
    footerShown,
    transDir,
    dims,
    mobileSideways
  }
}

function mapDispatchToProps (dispatch) {
  return {}
}

View.propTypes = {
  animateIn: PropTypes.bool.isRequired,
  currentView: PropTypes.object.isRequired,
  isFirstView: PropTypes.bool,
  dims: PropTypes.object.isRequired,
  transDir: PropTypes.string.isRequired,
  mobileSideways: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
