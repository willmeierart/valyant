import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'
import { canScroll, showFooter } from '../../lib/redux/actions'

class ImageBG extends Component {
  render () {
    const { animateIn, duration, image, alt, isFirstView, width } = this.props
    const sfx = width <= 500 ? '-half.jpg' : '.jpg'
    const defaultStyle = {
      opacity: 0,
      backgroundImage: `url('${image + sfx}')`,
      backgroundSize: isFirstView ? 'cover' : 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: isFirstView ? '100%' : '50%',
      position: 'absolute',
      height: '100%'
    }
    const transitionStyles = {
      entering: { opacity: 0 },
      entered: { opacity: 1, transition: `opacity ${3 * duration}ms ease-out` }
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
    onCanScroll: bool => dispatch(canScroll(bool)),
    onShowFooter: bool => dispatch(showFooter(bool))
  }
}

ImageBG.propTypes = {
  animateIn: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  footerShown: PropTypes.bool.isRequired,
  onCanScroll: PropTypes.func.isRequired,
  onShowFooter: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageBG)
