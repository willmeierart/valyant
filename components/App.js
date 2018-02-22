import { connect } from 'react-redux'
import Head from './Head'
import Footer from './layout/Footer'
import ScrollController from '../components/scroll/ScrollController'

const App = props => (
  <div>
    <Head title={props.title} />
    <main>
      <ScrollController />
      {/* <AzLogo01 /> */}
    </main>
    { props.footerShown && <Footer /> }
  </div>
)

function mapStateToProps (state) { return { footerShown: state.splash.footerShown } }

export default connect(mapStateToProps, null)(App)
