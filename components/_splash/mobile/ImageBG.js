import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'
import { doAnimation, canScroll, showFooter } from '../../../lib/redux/actions'

class ImageBG extends Component {
  componentWillUpdate (nextProps) {
    if (this.props.image !== nextProps.image) {
      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer)
        this.scrollTimer = null
      }
      this.props.onCanScroll(false) // lock up scrolling momentarily
      this.scrollTimer = setTimeout(() => {
        this.props.onCanScroll(true)
        clearTimeout(this.scrollTimer)
      }, 1600) // this is the ABSOLUTE minimum interval for scrolling where you can't accidentally trigger a double route change
    }
  }
  render () {
    const { animateIn, duration, image, alt } = this.props
    const sfx = '-do.jpg'
    const defaultStyle = {
      opacity: 0,
      backgroundImage: `url('${image + sfx}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      position: 'static',
      height: '100vh'
    }
    const transitionStyles = {
      entering: { opacity: 0 },
      entered: { opacity: 1, transition: `opacity ${duration}ms ease-in` }
    }
    return (
      <Transition in={animateIn} timeout={duration}>
        { state => (
          <div className='img-wrapper' alt={alt} style={{ ...defaultStyle, ...transitionStyles[state] }}>
            <div className='inner-wrapper' style={{ ...defaultStyle.backgroundPosition }} />
            <style jsx>{`
              .inner-wrapper {
                background-size: cover;
                background-position: center;
                width: 100%;
                height: 100%;
                z-index: 6;
              }
              .img-wrapper {
                right: 0;
                z-index: 2;
              }
            `}</style>
          </div>
        )}
      </Transition>
    )
  }
}

function mapStateToProps (state) {
  return { footerShown: state.splash.footerShown }
}

function mapDispatchToProps (dispatch) {
  return {
    onDoAnimation: bool => dispatch(doAnimation(bool)),
    onCanScroll: bool => dispatch(canScroll(bool)),
    onShowFooter: bool => dispatch(showFooter(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageBG)
