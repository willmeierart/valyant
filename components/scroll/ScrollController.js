import React, { Component } from 'react'
import { connect } from 'react-redux'
import once from 'lodash.once'
import View from '../_splash/View'
import viewState from '../../lib/data/viewState'
import { setCurrentView, showFooter, canScroll, checkIfMobile, doAnimation, setFallbackView, setTransDir, getVPDims } from '../../lib/redux/actions'
import { binder } from '../../lib/_utils'

class ScrollController extends Component {
  constructor (props) {
    super(props)
    this.state = { touchStartY: null, scrollVal: null }
    binder(this, ['getBaseData', 'changeView', 'handleTouchStart', 'handleScroll', 'handleKeyDown'])
  }

  componentDidMount () {
    const isIE = window.navigator.userAgent.indexOf('indows') !== -1
    const keydownTarget = isIE ? document : window
    keydownTarget.addEventListener('keydown', this.handleKeyDown)
    keydownTarget.addEventListener('resize', this.props.onGetVPDims)
    this.getBaseData()
  }

  componentWillUnmount () {
    const isIE = window.navigator.userAgent.indexOf('indows') !== -1
    const keydownTarget = isIE ? document : window
    keydownTarget.removeEventListener('keydown', this.handleKeyDown)
  }

  getBaseData () {
    if (this.props.isMobile === null) { this.props.onCheckIfMobile() }
    if (this.props.dims.width === null) { this.props.onGetVPDims() }
  }

  changeView (e) {
    const { touchStartY, scrollVal } = this.state
    const { footerShown, onShowFooter, onSetCurrentView, onDoAnimation, onSetTransDir, currentView, isMobile, onSetFallbackView } = this.props
    const currentIndex = viewState.indexOf(currentView)

    onSetFallbackView(currentView)

    if (isMobile && touchStartY !== null) {
      const { clientY } = e.touches[0]
      if (scrollVal === null) {
        this.setState({ scrollVal: clientY })
      }
      if (clientY < touchStartY) {
        onSetTransDir('>>')
        if (!currentView.isLastView) {
          onDoAnimation(false)
          onSetCurrentView(viewState[currentIndex + 1])
        } else {
          if (!footerShown) {
            onShowFooter(true)
          }
        }
      } else if (clientY > touchStartY) {
        onSetTransDir('<<')
        if (!currentView.isFirstView) {
          if (currentView.isLastView && footerShown) {
            onShowFooter(false)
          } else {
            onDoAnimation(false)
            onSetCurrentView(viewState[currentIndex - 1])
          }
        }
      }
    } else {
      if (e.deltaY > 0) {
        onSetTransDir('>>')
        if (!currentView.isLastView) {
          onDoAnimation(false)
          onSetCurrentView(viewState[currentIndex + 1])
        } else {
          if (!footerShown) {
            onShowFooter(true)
          }
        }
      } else if (e.deltaY < 0) {
        onSetTransDir('<<')
        if (!currentView.isFirstView) {
          onDoAnimation(false)
          if (currentView.isLastView && footerShown) {
            onShowFooter(false)
          } else {
            onSetCurrentView(viewState[currentIndex - 1])
          }
        }
      }
    }
    this.props.onCanScroll(false)
  }

  handleTouchStart (e) {
    const { isMobile } = this.props
    if (isMobile) { this.setState({ touchStartY: e.touches[0].clientY }) }
  }

  handleScroll (event) {
    // console.log(event)
    event.preventDefault()
    const e = { ...event }
    if (this.props.canScroll) {
      this.changeView(e)
      this.props.onCanScroll(true)
    }
  }

  handleKeyDown (e) {
    if (this.props.canScroll) {
      const { footerShown, onShowFooter, onSetCurrentView, onDoAnimation, onSetTransDir, currentView, onSetFallbackView, onCanScroll } = this.props
      const currentIndex = viewState.indexOf(currentView)

      onCanScroll(false)
      onSetFallbackView(currentView)

      const forward = e.keyCode === 40 || e.keyCode === 39
      const back = e.keyCode === 38 || e.keyCode === 37

      if (forward) {
        onSetTransDir('>>')
        if (!currentView.isLastView) {
          onDoAnimation(false)
          onSetCurrentView(viewState[currentIndex + 1])
        } else {
          if (!footerShown) {
            onShowFooter(true)
            onCanScroll(true)
          }
        }
      } else if (back) {
        onSetTransDir('<<')
        if (!currentView.isFirstView) {
          onDoAnimation(false)
          if (currentView.isLastView && footerShown) {
            onShowFooter(false)
            onCanScroll(true)
          } else {
            onSetCurrentView(viewState[currentIndex - 1])
          }
        }
      }
    }
  }

  render () {
    const { isMobile, dims: { height } } = this.props
    return (
      <div className='scroll-controller' onKeyDown={(e) => e.stopPropagation()} onWheel={once(this.handleScroll)} onTouchMove={once(this.handleScroll)} onTouchStart={this.handleTouchStart}>
        <View />
        { this.props.children }
        <style jsx>{`
          .scroll-controller {
            width: 100%;
            height: ${isMobile ? height + 'px' : '100vh'};
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
          }
        `}</style>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { isMobile, canScroll, currentView, footerShown, animateIn, dims } = state.splash
  return {
    isMobile,
    canScroll,
    currentView,
    footerShown,
    animateIn,
    dims
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onCheckIfMobile: () => dispatch(checkIfMobile()),
    onSetCurrentView: view => dispatch(setCurrentView(view)),
    onShowFooter: bool => dispatch(showFooter(bool)),
    onCanScroll: bool => dispatch(canScroll(bool)),
    onDoAnimation: bool => dispatch(doAnimation(bool)),
    onSetFallbackView: view => dispatch(setFallbackView(view)),
    onSetTransDir: dir => dispatch(setTransDir(dir)),
    onGetVPDims: () => dispatch(getVPDims())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrollController)
