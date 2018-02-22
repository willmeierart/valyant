import React, { Component } from 'react'
import AppProvider from '../lib/redux/AppProvider'
import App from '../components/App'
import Footer from '../components/layout/Footer'
import View from '../components/_splash/View'
import TransitionSled from '../components/_splash/TransitionSled'
import TextBlock from '../components/_splash/TextBlock'
import ImageBG from '../components/_splash/ImageBG'
import { binder } from '../lib/_utils'
import viewState from '../lib/data/viewState'

// import { AzLogo01 } from '../components/assets/ZeroLogos'

import ScrollController from '../components/scroll/ScrollController'

export default class Home extends Component {
  render () {
    console.log('index rerender')
    return (
      <AppProvider>
        <App title='Home'>
          <main>
            <ScrollController>
              {/* <div className='sample'></div> */}
              <View index={viewState.indexOf(this.state.currentView)} view={this.state.currentView}>
              </View>
              <Footer />
            </ScrollController>
            {/* <AzLogo01 /> */}
          </main>
          <style jsx>{``}</style>
        </App>
      </AppProvider>
    )
  }
}
