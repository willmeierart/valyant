import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getVPDims } from '../../lib/redux/actions'
import { binder } from '../../lib/_utils'
import View from '../_splash/mobile/View'

class MobileScroller extends Component {
  constructor (props) {
    super(props)
    binder(this, ['getBaseData'])
  }

  componentDidMount () {
    const init = () => {
      if (typeof window !== 'undefined') {
        window.addEventListener('orientationchange', () => {
          this.props.onGetVPDims()
        })
      }
    }
    init()
  }

  getBaseData () {
    const { dims: { width }, onGetVPDims } = this.props
    if (width === null) { onGetVPDims() }
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
  dims: PropTypes.object.isRequired,
  onGetVPDims: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  const { dims } = state.splash
  return {
    dims
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onGetVPDims: () => dispatch(getVPDims())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileScroller)
