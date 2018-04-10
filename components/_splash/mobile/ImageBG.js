import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'
import { canScroll } from '../../../lib/redux/actions'

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
    const { animateIn, duration, image, alt, isFirstView } = this.props
    const sfx = '-half.jpg'
    const defaultStyle = {
      opacity: 0,
      backgroundImage: `url('${image + sfx}')`,
      backgroundSize: isFirstView ? 'cover' : 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: isFirstView ? 'left' : 'center',
      width: '100%',
      position: 'static',
      height: '100%'
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
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    onCanScroll: bool => dispatch(canScroll(bool))
  }
}

ImageBG.propTypes = {
  animateIn: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onCanScroll: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageBG)
