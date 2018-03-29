import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { binder } from '../lib/_utils'

export default class CustomDocument extends Document {
  constructor (props) {
    super(props)
    binder(this, ['preventScrollNav'])
  }
  preventScrollNav (e) {
    if (!this.state.isMobile) {
      e.preventDefault()
      e.stopPropagation()
    }
  }
  componentDidMount () {
    const init = () => {
      if (typeof window !== 'undefined') {
        if (typeof window.orientation !== 'undefined') {
          this.setState({ isMobile: true })
        } else {
          window.addEventListener('scroll', (e) => { this.preventScrollNav(e) })
          window.addEventListener('touchmove', (e) => { this.preventScrollNav(e) })
          window.addEventListener('touchstart', (e) => { this.preventScrollNav(e) })
          window.addEventListener('touchend', (e) => { this.preventScrollNav(e) })
        }
      } else {
        setTimeout(() => { init() }, 200)
      }
    }
    init()
  }
  render () {
    return (
      <html lang='en-US'
        onWheel={(e) => { this.preventScrollNav(e) }}
        onTouchStart={(e) => { this.preventScrollNav(e) }}
        onTouchMove={(e) => { this.preventScrollNav(e) }}>
        <Head>
          <meta name='google-site-verification' content='CCxXT2IRKni8brrPNrEbzFu7ChmofvsFYjPZZiXNtt0' />
        </Head>
        <body className='v-font base' onTouchStart={(e) => { this.preventScrollNav(e) }}
          onTouchMove={(e) => { this.preventScrollNav(e) }}
          onWheel={(e) => { this.preventScrollNav(e) }}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
