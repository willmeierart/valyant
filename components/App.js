// main wrapper component - layout, universal styles, etc.
import React, { Component } from 'react'
import Link from 'next/link'
import Head from './Head'
import Header from './layout/Header'
import Footer from './layout/Footer'

// import globalStyles from '../../styles/index.scss'

export default class App extends Component {
  render () {
    const { title, children, footerShown } = this.props
    console.log('app rerender');
    return (
      <div>
        <Head title={title} />
        {/* <Header /> */}
        { children }
        { footerShown && <Footer /> }
        <style jsx global>{``}</style>
        {/* <style dangerouslySetInnerHTML={{ __html: globalStyles }} /> */}
      </div>
    )
  }
} 
