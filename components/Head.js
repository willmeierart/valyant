// literally HTML head - all SEO stuff, etc.
import Head from 'next/head'
// import globalStyles from '../styles/index.scss'

const initialProps = {
  title: 'Valyant AI',
  initialScale: '1.0'
}

export default (props = initialProps, { children }) => {
  const { title, initialScale } = props
  return <Head>
      <title key="title">{`Valyant AI - ${title}`}</title>
      <meta key="charset" charSet="utf-8" />
      <meta key="viewport" name="viewport" content={`initial-scale=${initialScale || initialProps.initialScale}, width=device-width, shrink-to-fit=no`} />
      <meta key="meta-title" name="title" content="Valyant AI" />
      {/* <style dangerouslySetInnerHTML={{ __html: globalStyles }} /> */}
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/static/favicons/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      {/* <script src='https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js' /> */}
      {children}
      {/* <script async src='https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-X' /> */}
      <style dangerouslySetInnerHTML={{ __html: `
      @font-face {
        font-family: 'ConduitITCStd';
        src: url('/static/fonts/ConduitITCStd-ExtraBold.eot');
        src: url('/static/fonts/ConduitITCStd-ExtraBold.woff2') format('woff2'), url('/static/fonts/ConduitITCStd-ExtraBold.woff') format('woff'), url('/static/fonts/ConduitITCStd-ExtraBold.ttf') format('truetype');
        font-weight: 800;
        font-style: normal;
      }
      @font-face {
        font-family: 'ConduitITCStd';
        src: url('/static/fonts/ConduitITCStd-Black.eot');
        src: url('/static/fonts/ConduitITCStd-Black.woff2') format('woff2'), url('/static/fonts/ConduitITCStd-Black.woff') format('woff'), url('/static/fonts/ConduitITCStd-Black.ttf') format('truetype');
        font-weight: 900;
        font-style: normal;
      }
      @font-face {
        font-family: 'ConduitITCStd';
        src: url('/static/fonts/ConduitITCStd-Light.eot');
        src: url('/static/fonts/ConduitITCStd-Light.woff2') format('woff2'), url('/static/fonts/ConduitITCStd-Light.woff') format('woff'), url('/static/fonts/ConduitITCStd-Light.ttf') format('truetype');
        font-weight: 300;
        font-style: normal;
      }
      @font-face {
        font-family: 'ConduitITCStd';
        src: url('/static/fonts/ConduitITCStd-Medium.eot');
        src: url('/static/fonts/ConduitITCStd-Medium.woff2') format('woff2'), url('/static/fonts/ConduitITCStd-Medium.woff') format('woff'), url('/static/fonts/ConduitITCStd-Medium.ttf') format('truetype');
        font-weight: 500;
        font-style: normal;
      } 
      @font-face {
        font-family: 'ConduitITCStd';
        src: url('/static/fonts/ConduitITCStd-Regular.eot');
        src: url('/static/fonts/ConduitITCStd-Regular.woff2') format('woff2'), url('/static/fonts/ConduitITCStd-Regular.woff') format('woff'), url('/static/fonts/ConduitITCStd-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      .v-font {
        font-family: 'ConduitITCStd', Helvetica;
      }
      .extra-bold {
        font-weight: 800;
      }
      .black {
        font-weight: 900;
      }
      .light {
        font-weight: 300;
      }
      .medium {
        font-weight: 500;
      }
      .base {
        font-weight: normal;
      }
    ` }} />
    </Head>
}
