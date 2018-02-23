import AppProvider from '../lib/redux/AppProvider'
import App from '../components/App'

const Home = () => (
  <AppProvider>
    <App title="Home" />
  </AppProvider>
)

export default Home
