import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { binder } from '../lib/_utils'

export default class CustomDocument extends Document {
  constructor (props) {
    super(props)
    this.state = {
      height: null,
      isMobile: null
    }
    binder(this, ['preventScrollNav'])
  }
  preventScrollNav (e) {
    e.preventDefault()
    e.stopPropagation()
  }
  componentDidMount () {
    window.addEventListener('scroll', (e) => { this.preventScrollNav(e) })
    window.addEventListener('touchmove', (e) => { this.preventScrollNav(e) })
    window.addEventListener('touchstart', (e) => { this.preventScrollNav(e) })
    window.addEventListener('touchend', (e) => { this.preventScrollNav(e) })
    if (this.state.height === null) {
      if (window) {
        this.setState({
          height: window.innerHeight,
          isMobile: typeof window.orientation !== 'undefined'
        })
      } else {
        setTimeout(() => {
          this.setState({
            height: window.innerHeight,
            isMobile: typeof window.orientation !== 'undefined'
          })
        }, 500)
      }
    }
  }
  render () {
    return (
      <html lang='en-US'
        onWheel={(e) => { this.preventScrollNav(e) }}
        onTouchStart={(e) => { this.preventScrollNav(e) }}
        onTouchMove={(e) => { this.preventScrollNav(e) }}
        style={{ overflow: 'hidden' }}>
        <Head>
          <meta name='google-site-verification' content='CCxXT2IRKni8brrPNrEbzFu7ChmofvsFYjPZZiXNtt0' />
        </Head>
        <body className='v-font base' onTouchStart={(e) => { this.preventScrollNav(e) }}
          onTouchMove={(e) => { this.preventScrollNav(e) }}
          onWheel={(e) => { this.preventScrollNav(e) }}
          style={{
            overflow: 'hidden'
          }}>
          <Main />
          <NextScript />
        </body>
        <style jsx global>{`
          html, body {
            overflow: hidden!important;
            position: fixed!important;
          }
          body {
            {/* -webkit-overflow-scrolling: touch; */}
            {/* margin: 2vw; */}
            width: 100vw;
            height: ${this.state.isMobile ? this.state.height + 'px' : '100vh'};
            box-sizing: border-box;
          }
        `}</style>
      </html>
    )
  }
}
