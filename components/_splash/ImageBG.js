import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'
import { doAnimation, canScroll, showFooter } from '../../lib/redux/actions'

class ImageBG extends Component {
  componentWillUpdate (nextProps) {
    if (this.props.image !== nextProps.image) {
      // this.props.footerShown && this.props.howFooter(false)
      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer)
        this.scrollTimer = null
      }
      this.props.onCanScroll(false)
      this.scrollTimer = setTimeout(() => {
        this.props.onCanScroll(true)
        clearTimeout(this.scrollTimer)
      }, 1600)
    }
  }
  render () {
    const { animateIn, duration, image } = this.props
    const defaultStyle = {
      opacity: 0,
      backgroundImage: `url('${image}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
      // background: color
    }
    const transitionStyles = {
      entering: { opacity: 0 },
      entered: { opacity: 1, transition: `opacity ${duration}ms ease-in` }
    }
    return (
      <Transition in={animateIn} timeout={duration}>
        { state => (
          <div className='img-wrapper' style={{ ...defaultStyle, ...transitionStyles[state] }}>
            <div className='inner-wrapper' style={{ ...defaultStyle.backgroundPosition }} />
            <style jsx>{`
              .inner-wrapper {
                background-size: cover;
                background-position: center;
                width: 100%;
                height: 100%;
                z-index: 6;
              }
              h1 {
                position: absolute;
                top: 20vh;
                right: 20vw;
                color: black;
              }
              .img-wrapper {
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 2;
                {/* opacity:0;  */}
              }
            `}</style>
          </div>
        )}
      </Transition>
    )
  }
}

function mapStateToProps (state) {
  // const { animateIn, currentView, fallbackView, footerShown, transDir } = state.splash
  return {
    footerShown: state.splash.footerShown
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onDoAnimation: bool => dispatch(doAnimation(bool)),
    onCanScroll: bool => dispatch(canScroll(bool)),
    onShowFooter: bool => dispatch(showFooter(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageBG)
