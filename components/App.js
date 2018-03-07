import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkIfMobile, getVPDims } from '../lib/redux/actions'
import Head from './Head'
import ScrollController from '../components/scroll/ScrollController'
import { LogoFull } from './assets/SVGassets'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { orientation: null }
  }

  componentDidMount () {
    const init = () => {
      this.props.onGetVPDims()
      this.props.onCheckIfMobile()
      if (typeof window !== 'undefined') {
        if (typeof window.orientation !== 'undefined') {
          if (this.state.orientation === null) {
            this.setState({ orientation: window.orientation })
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
    const { title, isMobile, dims: { width, height } } = this.props
    const { orientation } = this.state
    return (
      <div style={{ overflow: 'hidden', position: 'fixed', width: '100%', height: isMobile ? '98%' : '100%' }}>
        <Head title={title} />
        <main>
          {/* { !isMobile || (isMobile && orientation !== null && orientation === 0)
            ? <ScrollController />
            : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', overflow: 'hidden' }}>
                <LogoFull w={width} h={height} />
              </div>
          } */}
          <ScrollController mobileSideways={orientation !== 0 && orientation !== null} />
        </main>
        <style jsx global>{`
          body {
            {/* height: ${isMobile ? height + 'px' : '100vh'}; */}
            height: ${isMobile ? '100vh' : '100vh'};
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
// export default App
