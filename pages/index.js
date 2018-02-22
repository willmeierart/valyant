import React, { Component } from 'react'
import AppProvider from '../lib/redux/AppProvider'
import App from '../components/App'
import View from '../components/_splash/View'
import TransitionSled from '../components/_splash/TransitionSled'
import TextBlock from '../components/_splash/TextBlock'
import ImageBG from '../components/_splash/ImageBG'
import { binder } from '../lib/_utils'
import viewState from '../lib/data/viewState'

// import { AzLogo01 } from '../components/assets/ZeroLogos'

import ScrollController from '../components/scroll/ScrollController'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showFooter: false,
      currentView: viewState[0]
    }
    binder(this, ['showFooter', 'setCurrentView'])
  }

  showFooter (bool) {
    console.log('show footer')
    this.setState({ showFooter: bool })
  }

  setCurrentView (view) { this.setState({ currentView: view }) }

  render () {
    console.log('high lvl rerender');
    return (
      <AppProvider>
        <App footerShown={this.state.showFooter} title="Home">
          <main>
            <ScrollController setCurrentView={this.setCurrentView} currentView={this.state.currentView} footerShown={this.state.showFooter} showFooter={this.showFooter}>
              <div className='sample'></div>
              {/* <View index={viewState.indexOf(this.state.currentView)} view={this.state.currentView}></View> */}

            </ScrollController>
            {/* <AzLogo01 /> */}
          </main>
          <style jsx>{``}</style>
        </App>
      </AppProvider>
    )
  }
}
