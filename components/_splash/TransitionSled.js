import React, { Component } from 'react'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { TransitionMotion, spring, presets } from 'react-motion'
import { binder } from '../../lib/_utils'

export default class TransitionSled extends Component {
  constructor (props) {
    super(props)
    binder(this, ['willEnter'])
  }

  componentDidMount () {
    // const { lockScrollOMatic, completePageTransition } = this.props
    // setTimeout(() => { completePageTransition(true) }, 500)
    // setTimeout(() => { lockScrollOMatic(false) }, 1000)
    this.props.readyTimeout()
  }

  willEnter () {
    return {
      translate: this.props.width
      // opacity: 0
    }
  }

  render () {
    const { k, children, width, ready } = this.props
    return (
      <TransitionMotion
        willEnter={this.willEnter}
        styles={width ? [{ key: `${k}`, style: { translate: spring(0, { stiffness: 60, damping: 15 }) }, width: '100%', height: '100%' }] : []}>
        { interpolated =>
          <div style={{ width: '100%', height: '100%' }}>
            { interpolated.map(config =>
              <div key={config.key} config={config} style={{
                transform: `translate3d(${config.style.translate}px,0,0)`,
                // opacity: config.style.opacity,
                willChange: 'transform',
                overflow: 'hidden',
                width: '100%',
                height: '100%'
              }} className='transition-sled'>
                { ready && children }
              </div>
            ) }
          </div>
        }
      </TransitionMotion>
    )
  }
}
