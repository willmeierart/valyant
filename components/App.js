import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkIfMobile, getVPDims } from '../lib/redux/actions'
import Head from './Head'
import ScrollController from '../components/scroll/ScrollController'
import MobileScroller from '../components/scroll/MobileScroller'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { orientation: null, mobileVersion: false }
  }

  componentDidMount () {
    const init = () => {
      const { onGetVPDims, onCheckIfMobile, isMobile } = this.props
      onGetVPDims() // set global js sizing of vp
      onCheckIfMobile()
      this.setState({ mobileVersion: isMobile || window.innerWidth < 700 })
      if (typeof window !== 'undefined') { // something done throughout app, if window undefined (bc serverside rendered at first) then keep trying til it's not...
        window.addEventListener('resize', async () => {
          this.setState({ mobileVersion: isMobile || window.innerWidth < 700 })
          console.log(this.state.mobileVersion)
        })
        if (typeof window.orientation !== 'undefined') {
          if (this.state.orientation === null) {
            this.setState({ orientation: window.orientation }) // if we're on mobile, keep track of orientation
          }
          window.addEventListener('orientationchange', () => {
            this.setState({ orientation: window.orientation })
          })
        }
      } else { setTimeout(() => { init() }, 500) }
    }
    init()
  }

  render () {
    const { title, isMobile } = this.props
    const { orientation, mobileVersion } = this.state
    return (
      <div style={{
        overflow: !mobileVersion ? 'hidden' : 'auto',
        position: !mobileVersion ? 'fixed' : 'static',
        width: '100%',
        height: !mobileVersion ? '100vh' : 'auto' }}>
        <Head title={title} />
        <main>
          { mobileVersion
            ? <MobileScroller mobileSideways={orientation !== 0 && orientation !== null} />
            : <ScrollController />
          }
        </main>
        <style jsx global>{`
          body {
            height: ${mobileVersion ? 'auto' : '100vh'};
            overflow: ${mobileVersion ? 'auto' : 'hidden'};
          }
          main {
            height: 100vh;
          }
        `}</style>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isMobile: state.splash.isMobile,
    dims: state.splash.dims
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onCheckIfMobile: () => dispatch(checkIfMobile()),
    onGetVPDims: () => dispatch(getVPDims())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
