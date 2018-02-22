// main wrapper component - layout, universal styles, etc.
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Head from './Head'
import Header from './layout/Header'
import Footer from './layout/Footer'
import ScrollController from '../components/scroll/ScrollController'
import { binder } from '../lib/_utils'
import viewState from '../lib/data/viewState'

// import globalStyles from '../../styles/index.scss'

class App extends Component {
  render () {
    const { title, footerShown, children } = this.props
    console.log('app rerender')
    return (
      <div>
        <Head title={title} />
        <main>
          <ScrollController />
          {/* <AzLogo01 /> */}
        </main>
        { footerShown && <Footer /> }
      </div>
    )
  }
} 

function mapStateToProps (state) {
  const { footerShown } = state.splash
  return {
    footerShown
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
