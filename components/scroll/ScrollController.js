import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import once from 'lodash.once'
import View from '../_splash/View'
import viewState from '../../lib/data/viewState'
import { setCurrentView, showFooter, canScroll, doAnimation, setFallbackView, setTransDir, getVPDims, checkIfIE } from '../../lib/redux/actions'
import { binder } from '../../lib/_utils'

class ScrollController extends Component {
  constructor (props) {
    super(props)
    this.state = { isIE: false }
    binder(this, ['getBaseData', 'changeView', 'handleScroll', 'handleKeyDown'])
  }

  componentDidMount () {
    const init = () => {
      this.props.onCheckIfIE()
      if (this.props.isIE !== null) {
        const keydownTarget = this.props.isIE ? document : window
        keydownTarget.addEventListener('keydown', this.handleKeyDown)
        keydownTarget.addEventListener('resize', this.props.onGetVPDims)
        this.getBaseData()
      } else {
        this.props.onCheckIfIE()
        setTimeout(() => { init() }, 200)
      }
    }
    init()
    window.addEventListener('orientationchange', () => {
      this.props.onGetVPDims()
    })
  }

  componentWillUnmount () {
    const keydownTarget = this.props.isIE ? document : window
    keydownTarget.removeEventListener('keydown', this.handleKeyDown)
  }

  getBaseData () {
    const { dims: { width }, onGetVPDims } = this.props
    if (width === null) { onGetVPDims() }
  }

  changeView (e) {
    const { footerShown, onShowFooter, onSetCurrentView, onDoAnimation, onSetTransDir, currentView, onSetFallbackView } = this.props
    const currentIndex = viewState.indexOf(currentView)

    onSetFallbackView(currentView)

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
    this.props.onCanScroll(false)
  }

  handleScroll (event) {
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
    return (
      <div className='scroll-controller' onKeyDown={(e) => e.stopPropagation()} onWheel={once(this.handleScroll)} >
        <View />
        { this.props.children }
        <style jsx>{`
          .scroll-controller {
            width: 100%;
            height: 100vh;
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
  const { canScroll, currentView, footerShown, dims, isIE } = state.splash
  return {
    canScroll,
    currentView,
    footerShown,
    dims,
    isIE
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onCheckIfIE: () => dispatch(checkIfIE()),
    onSetCurrentView: view => dispatch(setCurrentView(view)),
    onShowFooter: bool => dispatch(showFooter(bool)),
    onCanScroll: bool => dispatch(canScroll(bool)),
    onDoAnimation: bool => dispatch(doAnimation(bool)),
    onSetFallbackView: view => dispatch(setFallbackView(view)),
    onSetTransDir: dir => dispatch(setTransDir(dir)),
    onGetVPDims: () => dispatch(getVPDims())
  }
}

ScrollController.propTypes = {
  isIE: PropTypes.bool.isRequired,
  currentView: PropTypes.object.isRequired,
  canScroll: PropTypes.bool.isRequired,
  footerShown: PropTypes.bool.isRequired,
  animateIn: PropTypes.bool.isRequired,
  dims: PropTypes.object.isRequired,
  onSetCurrentView: PropTypes.func.isRequired,
  onShowFooter: PropTypes.func.isRequired,
  onCanScroll: PropTypes.func.isRequired,
  onDoAnimation: PropTypes.func.isRequired,
  onSetFallbackView: PropTypes.func.isRequired,
  onSetTransDir: PropTypes.func.isRequired,
  onGetVPDims: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrollController)
