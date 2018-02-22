import React, { Component } from 'react'
import { connect } from 'react-redux'
import View from '../_splash/View'
import viewState from '../../lib/data/viewState'
import { binder } from '../../lib/_utils'

class ScrollController extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isMobile: false,
      touchStartY: null,
      canScroll: false
    }
    binder(this, ['checkIfMobile', 'changeView', 'handleTouchStart', 'handleScroll'])
  }

  componentDidMount () {
    console.log('mounted');
    this.checkIfMobile()
    setTimeout(() => { this.setState({ canScroll: true }) }, 1000)
  }

  // shouldComponentUpdate () { return false }

  checkIfMobile () { this.setState({ isMobile: window !== undefined && window.orientation !== undefined }) }

  changeView (e) {
    const { isMobile, touchStartY } = this.state
    const { footerShown, showFooter, setCurrentView, currentView } = this.props
    const currentIndex = viewState.indexOf(currentView)
    if (isMobile && touchStartY !== null) {
      const { clientY } = e.touches[0]
      // if (currentView)
      if (clientY > touchStartY) {
        if (!currentView.isLastView) {
          // this.setState({ currentView: viewState[currentIndex + 1] })
          setCurrentView(viewState[currentIndex + 1])
        } else {
          if (!footerShown) {
            showFooter(true)
          }
        }
      } else if (clientY < touchStartY) {
        if (!currentView.isFirstView) {
          if (currentView.isLastView && footerShown) {
            showFooter(false)
          } else {
            // this.setState({ currentView: viewState[currentIndex - 1] })
            setCurrentView(viewState[currentIndex - 1])

          }
        }
      }
    } else {
      if (e.deltaY > 0) {
        if (!currentView.isLastView) {
          // this.setState({ currentView: viewState[currentIndex + 1] })
          setCurrentView(viewState[currentIndex + 1])
        } else {
          if (!footerShown) {
            showFooter(true)
          }
        }
      } else if (e.deltaY < 0) {
        if (!currentView.isFirstView) {
          if (currentView.isLastView && footerShown) {
            showFooter(false)
          } else {
            // this.setState({ currentView: viewState[currentIndex - 1] })
            setCurrentView(viewState[currentIndex - 1])
          }
        }
      }
    }
    this.setState({ canScroll: false })
  }

  handleTouchStart (e) {
    const { isMobile } = this.state
    if (isMobile) {
      this.setState({ touchStartY: e.touches[0].clientY })
    }
  }

  handleScroll (e) {
    e.preventDefault()
    if (this.state.canScroll){
      this.changeView(e)
      setTimeout(() => { this.setState({ canScroll: true }) }, 1000)
    }
  }

  render () {
    console.log(this.props.children)
    return (
      <div className='scroll-controller' onWheel={this.handleScroll} onTouchMove={this.handleScroll} onTouchStart={this.handleTouchStart}>
        <View index={viewState.indexOf(this.props.currentView)} view={this.props.currentView}>{ this.props.children }</View>
        {/* { this.props.children } */}
        <style jsx>{`
          .scroll-controller {
            width: 100vw;
            height: 100vh;
            overflow: hidden;
          }
        `}</style>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isMobile: state.splash.isMobile
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // getNewOriginPos: (transRoute, transDir, widthHeight) => dispatch(getNewOriginPos(transRoute, transDir, widthHeight))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrollController)

// export default ScrollController
