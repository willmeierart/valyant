import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
            background-image: url('${this.props.url}');
            background-size: cover;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    )
  }
}

ImageBG.propTypes = {

}

export default ImageBG
