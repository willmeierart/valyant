import React, { Component } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash.debounce'
import delay from 'lodash.delay'
import throttle from 'lodash.throttle'
import once from 'lodash.once'
import View from '../_splash/View'
import viewState from '../../lib/data/viewState'
import { setCurrentView, showFooter, canScroll, checkIfMobile, doAnimation, setFallbackView, setTransDir } from '../../lib/redux/actions'
import { binder } from '../../lib/_utils'


class ScrollController extends Component {
  constructor (props) {
    super(props)
    this.state = { touchStartY: null, viewImg: '', scrollTimer: null, footer: false }
    binder(this, ['checkIfMobile', 'changeView', 'handleTouchStart', 'handleScroll'])
  }

  componentDidMount () {
    this.checkIfMobile()
    setTimeout(() => { this.props.onCanScroll(true) }, 900)
  }

  // componentWillReceiveProps (nextProps) {
  //   this.props.onCanScroll(false)
  //   if (nextProps.currentView.imageUrl !== this.state.viewImg || nextProps.footerShown !== this.state.footer) {
  //     console.log('component will receive props')
  //     setTimeout(() => { this.props.onCanScroll(true) }, 1000)
  //     this.setState({
  //       viewImg: nextProps.currentView.imageUrl,
  //       footer: nextProps.footerShown
  //     })
  //   }
  // }


  checkIfMobile () {
    if (this.props.isMobile === null) {
      this.props.onCheckIfMobile()
    }
  }

  changeView (e) {
    const { touchStartY } = this.state
    const { footerShown, onShowFooter, onSetCurrentView, onDoAnimation, onSetTransDir, currentView, isMobile } = this.props
    const currentIndex = viewState.indexOf(currentView)

    // this.props.onCanScroll(false)    

    this.props.onSetFallbackView(currentView)
    // this.props.onCanScroll(false)
    
    if (isMobile && touchStartY !== null) {
      const { clientY } = e.touches[0]
      if (clientY > touchStartY) {
        onSetTransDir('>>')
        if (!currentView.isLastView) {
          onDoAnimation(false)
          onSetCurrentView(viewState[currentIndex + 1])
          // this.props.onCanScroll(false) 
        } else {
          if (!footerShown) {
            onShowFooter(true)
          }
        }
      } else if (clientY < touchStartY) {
        onSetTransDir('<<')
        if (!currentView.isFirstView) {
          if (currentView.isLastView && footerShown) {
            onShowFooter(false)
          } else {
            onDoAnimation(false)
            onSetCurrentView(viewState[currentIndex - 1])
            // this.props.onCanScroll(false)            
          }
        }
      }
    } else {
      if (e.deltaY > 0) {
        onSetTransDir('>>')
        if (!currentView.isLastView) {
          onDoAnimation(false)
          onSetCurrentView(viewState[currentIndex + 1])
          // this.props.onCanScroll(false)          
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
            // this.props.onCanScroll(false)
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
      console.log('firing')
      
      // this.props.onCanScroll(true)
      setTimeout(() => {
        this.props.onCanScroll(false)
      }, 900)
    }
  }

  render () {
    return (
      <div className='scroll-controller'
        onWheel={once(this.handleScroll)}
        onTouchMove={once(this.handleScroll)} 
        onTouchStart={this.handleTouchStart}>
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
    onSetFallbackView: view => dispatch(setFallbackView(view)),
    onSetTransDir: dir => dispatch(setTransDir(dir))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrollController)

// export default ScrollController
