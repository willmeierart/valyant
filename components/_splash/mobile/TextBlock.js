import React, { Component } from 'react'
import { DividerWhite } from '../../assets/SVGassets'

class TextBlock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      heightVal: '500px'
    }
  }
  componentDidMount () {
    if (typeof window !== 'undefined') {
      this.setState({ heightVal: `${Math.floor(Math.abs(window.innerHeight) / 2.5)}px` })
    }
  }
  render () {
    const { body, header } = this.props
    return (
      <div className='text-block v-font'>
        <h1 className='v-font'>{ header }</h1>
        <div className='divider'>
          <DividerWhite />
        </div>
        <h3 className='v-font light'>{ body }</h3>
        <style jsx>{`
          .text-block {
            position: relative;
            z-index: 10;
            flex-direction: column;
            display: flex;
            flex-grow: 1;
            opacity: 1;
            color: #1F5877;
            width: 96vw;
            margin: 25vh 0;
            text-align: center;
            align-items: center;
            justify-content: center;
          }
          .text-block h1 {
            text-transform: uppercase;
            font-size: 4em;
            margin:0;
          }
          .text-block .header-2 {
            font-size: .8em;
            letter-spacing: .25em;
            padding-top: .5em;
          }
          .text-block h3, .text-block h1 {
            z-index: 10;
          }
          .text-block h1:last-of-type {
            padding-bottom: .25em;
          }
          .divider {
            height: 17px;
          }
          .text-block h3 {
            width: 80%;
            font-size: 1.25em;
            line-height: 1em;
            font-weight: normal;
            letter-spacing: 0;
          }
        `}</style>
      </div>
    )
  }
}

export default TextBlock
