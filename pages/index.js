import React, { Component } from 'react'
import App from '../components/App'
import { binder } from '../lib/_utils'
// import { AzLogo01 } from '../components/assets/ZeroLogos'

import ScrollController from '../components/scroll/ScrollController'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showFooter: false
    }
    binder(this, ['showFooter'])
  }
  
  showFooter (bool) {
    console.log('show footer')
    this.setState({ showFooter: bool })
  }

  render () {
    return (
      <App footerShown={this.state.showFooter} title='Home'>
        <main>
          <ScrollController footerShown={this.state.showFooter} showFooter={this.showFooter} />
          {/* <AzLogo01 /> */}
          { this.props.children }
        </main>
        <style jsx>{`

        `}</style>
      </App>
    )
  }
}
