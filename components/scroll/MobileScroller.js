import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setCurrentView, showFooter, canScroll, doAnimation, setFallbackView, setTransDir, getVPDims, lockOrientation } from '../../lib/redux/actions'
import { binder } from '../../lib/_utils'
import View from '../_splash/mobile/View'

class MobileScroller extends Component {
  constructor (props) {
    super(props)
    binder(this, ['getBaseData', 'handleScroll'])
  }

  componentDidMount () {
    const init = () => {
      if (typeof window !== 'undefined') {
        window.addEventListener('scroll', this.handleScroll)
        window.addEventListener('orientationchange', () => {
          this.props.onGetVPDims()
        })
      }
    }
    init()
  }

  handleScroll () {

  }

  getBaseData () {
    const { dims: { width }, onGetVPDims } = this.props
    if (width === null) { onGetVPDims() }
    // if (screenLocked === false && onLockOrientation() !== false) { onLockOrientation() }
  }

  render () {
    return (
      <section>
        <View />
        { this.props.children }
      </section>
    )
  }
}

MobileScroller.propTypes = {

}

function mapStateToProps (state) {
  const { canScroll, currentView, footerShown, animateIn, dims, screenLocked } = state.splash
  return {
    canScroll,
    currentView,
    footerShown,
    animateIn,
    dims,
    screenLocked
  }
}

function mapDispatchToProps (dispatch) {
  return {
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
