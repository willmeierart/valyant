import Head from './Head'
import ScrollController from '../components/scroll/ScrollController'

const App = ({ title }) => (
  <div style={{ overflow: 'hidden', position: 'fixed', width: '100%', height: '100%' }}>
    <Head title={title} />
    <main>
      <ScrollController />
    </main>
  </div>
)

export default App
