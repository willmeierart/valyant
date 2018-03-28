import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import once from 'lodash.once'
import View from '../_splash/View'
import viewState from '../../lib/data/viewState'
import { setCurrentView, showFooter, canScroll, checkIfMobile, doAnimation, setFallbackView, setTransDir, getVPDims, checkIfIE, lockOrientation } from '../../lib/redux/actions'
import { binder } from '../../lib/_utils'
import ViewMobile from '../_splash/ViewMobile'

class MobileScroller extends Component {
  constructor (props) {
    super(props)
    binder(this, ['getBaseData'])
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

  getBaseData () {
    const { isMobile, onCheckIfMobile, dims: { width }, onGetVPDims } = this.props
    if (isMobile === null) { onCheckIfMobile() }
    if (width === null) { onGetVPDims() }
    // if (screenLocked === false && onLockOrientation() !== false) { onLockOrientation() }
  }

  render () {
    return (
      <div className='outer-wrapper'>
        <ViewMobile />
        { this.props.children }
        <style jsx>{`
          .outer-wrapper{}
        `}</style>
      </div>
    )
  }
}

MobileScroller.propTypes = {

}

function mapStateToProps (state) {
  const { isMobile, canScroll, currentView, footerShown, animateIn, dims, isIE, screenLocked } = state.splash
  return {
    isMobile,
    canScroll,
    currentView,
    footerShown,
    animateIn,
    dims,
    isIE,
    screenLocked
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onCheckIfMobile: () => dispatch(checkIfMobile()),
    onCheckIfIE: () => dispatch(checkIfIE()),
    onSetCurrentView: view => dispatch(setCurrentView(view)),
    onShowFooter: bool => dispatch(showFooter(bool)),
    onCanScroll: bool => dispatch(canScroll(bool)),
    onDoAnimation: bool => dispatch(doAnimation(bool)),
    onSetFallbackView: view => dispatch(setFallbackView(view)),
    onSetTransDir: dir => dispatch(setTransDir(dir)),
    onGetVPDims: () => dispatch(getVPDims()),
    onLockOrientation: () => dispatch(lockOrientation())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileScroller)
