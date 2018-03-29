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
          <meta name='google-site-verification' content='SstcJEgyuadqOh5iE_vCZRPSOeIqBVdMhDPvmH9Hjos' />
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
            height: 100vh;
            width: 100vw;
            box-sizing: border-box;
          }
        `}</style>
      </html>
    )
  }
}
