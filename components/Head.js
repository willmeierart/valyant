// literally HTML head - all SEO stuff, etc.
import Head from 'next/head'
import globalStyles from '../styles/index.scss'

const initialProps = {
  title: 'Valyant AI',
  initialScale: '1.0'
}

export default (props = initialProps, { children }) => {
  const { title, initialScale } = props
  return <Head>
    <title key='title'>{`Valyant AI - ${title}`}</title>
    <meta key='charset' charSet='utf-8' />
    <meta key='viewport' name='viewport' content={`initial-scale=${initialScale || initialProps.initialScale}, width=device-width, shrink-to-fit=no`} />
    <meta key='meta-title' name='title' content='Valyant AI' />
    <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
    <link rel='icon' type='image/png' sizes='32x32' href='/static/favicons/favicon-32x32.png' />
    <link rel='icon' type='image/png' sizes='96x96' href='/static/favicons/favicon-96x96.png' />
    <link rel='icon' type='image/png' sizes='16x16' href='/static/favicons/favicon-16x16.png' />
    {/* <script src='https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js' /> */}
    { children }
    {/* <script async src='https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-X' /> */}
  </Head>
}
