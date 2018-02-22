import React, { Component } from 'react'
import { connect } from 'react-redux'
import View from '../_splash/View'
import viewState from '../../lib/data/viewState'
import { setCurrentView, showFooter, canScroll, checkIfMobile, doAnimation, setFallbackImage } from '../../lib/redux/actions'
import { binder } from '../../lib/_utils'

class ScrollController extends Component {
  constructor (props) {
    super(props)
    this.state = { touchStartY: null }
    binder(this, ['checkIfMobile', 'changeView', 'handleTouchStart', 'handleScroll'])
  }

  componentDidMount () {
    this.checkIfMobile()
    setTimeout(() => { this.props.onCanScroll(true) }, 1000)
  }

  checkIfMobile () {
    if (this.props.isMobile === null) {
      this.props.onCheckIfMobile()
    }
  }

  changeView (e) {
    const { touchStartY } = this.state
    const { footerShown, onShowFooter, onSetCurrentView, currentView, isMobile, animateIn } = this.props
    const currentIndex = viewState.indexOf(currentView)

    this.props.onSetFallbackImage(currentView.imageUrl)

    if (isMobile && touchStartY !== null) {
      const { clientY } = e.touches[0]
      if (clientY > touchStartY) {
        if (!currentView.isLastView) {
          this.props.onDoAnimation(false)
          onSetCurrentView(viewState[currentIndex + 1])
        } else {
          if (!footerShown) {
            onShowFooter(true)
          }
        }
      } else if (clientY < touchStartY) {
        if (!currentView.isFirstView) {
          if (currentView.isLastView && footerShown) {
            onShowFooter(false)
          } else {
            this.props.onDoAnimation(false)
            onSetCurrentView(viewState[currentIndex - 1])
          }
        }
      }
    } else {
      if (e.deltaY > 0) {
        if (!currentView.isLastView) {
          this.props.onDoAnimation(false)
          onSetCurrentView(viewState[currentIndex + 1])
        } else {
          if (!footerShown) {
            onShowFooter(true)
          }
        }
      } else if (e.deltaY < 0) {
        if (!currentView.isFirstView) {
          if (currentView.isLastView && footerShown) {
            onShowFooter(false)
          } else {
            this.props.onDoAnimation(false)
            onSetCurrentView(viewState[currentIndex - 1])
          }
        }
      }
    }
    this.props.onCanScroll(false)
  }

  handleTouchStart (e) {
    const { isMobile } = this.props
    if (isMobile) {
      this.setState({ touchStartY: e.touches[0].clientY })
    }
  }

  handleScroll (e) {
    e.preventDefault()
    if (this.props.canScroll) {
      this.changeView(e)
      setTimeout(() => { this.props.onCanScroll(true) }, 1000)
    }
  }

  render () {
    return (
      <div className='scroll-controller' onWheel={this.handleScroll} onTouchMove={this.handleScroll} onTouchStart={this.handleTouchStart}>
        <View />
        { this.props.children }
        <style jsx>{`
          .scroll-controller {
            width: 96vw;
            height: calc(100vh - 4vw);
            overflow: hidden;
            box-sizing: border-box;
            position: relative;
          }
        `}</style>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { isMobile, canScroll, currentView, footerShown, animateIn } = state.splash
  return {
    isMobile,
    canScroll,
    currentView,
    footerShown,
    animateIn
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onCheckIfMobile: () => dispatch(checkIfMobile()),
    onSetCurrentView: view => dispatch(setCurrentView(view)),
    onShowFooter: bool => dispatch(showFooter(bool)),
    onCanScroll: bool => dispatch(canScroll(bool)),
    onDoAnimation: bool => dispatch(doAnimation(bool)),
    onSetFallbackImage: img => dispatch(setFallbackImage(img))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrollController)

// export default ScrollController
