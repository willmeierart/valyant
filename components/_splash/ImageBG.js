import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'

class ImageBG extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const duration = 1000
    const defaultStyle = {
      opacity: 0
    }
    const transitionStyles = {
      
      entering: { opacity: 0 },
      // entering: { transform: `translateX(${el === 'txt' ? 100 : -100})` },
      entered: { opacity: 1, transition: `opacity ${duration}ms ease-in` }
    }
    return (
      <Transition exit={false} in={this.props.animateIn} timeout={duration}>
        { state => (
          <div className='img-wrapper' style={{ ...defaultStyle, ...transitionStyles[state] }}>
            { state }
            <div className='inner-wrapper' />
            <style jsx>{`
              .inner-wrapper {
                background-image: url('${this.props.view.imageUrl}');
                background-size: cover;
                width: 100%;
                height: 100%;
              }
              .img-wrapper {
                position: absolute;
                width: 100%;
                height: 100%;
                opacity:0;
                {/* opacity: 0; */}

              }
            `}</style>
          </div>
        )}
      </Transition>
    )
  }
}

function mapStateToProps (state) {
  const { currentView } = state.splash
  return {
    currentView
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageBG)


// export default ImageBG
