import React, { Component } from 'react'
import { connect } from 'react-redux'

class ImageBG extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='inner-wrapper'>
        <style jsx>{`
          .inner-wrapper {
            background-image: url('${this.props.currentView.imageUrl}');
            background-size: cover;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
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
