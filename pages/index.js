import React, { Component } from 'react'
import AppProvider from '../lib/redux/AppProvider'
import App from '../components/App'
import View from '../components/_splash/View'
import TextBlock from '../components/_splash/TextBlock'
import ImageBG from '../components/_splash/ImageBG'
import Logo from '../components/_splash/Logo'

export default class Home extends Component {
  render () {
    return (
      <AppProvider>
        <App title='Home'>
          <style jsx>{``}</style>
        </App>
      </AppProvider>
    )
  }
}
