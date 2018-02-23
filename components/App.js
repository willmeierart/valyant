import Head from './Head'
import ScrollController from '../components/scroll/ScrollController'

const App = ({ title }) => (
  <div>
    <Head title={title} />
    <main>
      <ScrollController />
    </main>
  </div>
)

export default App
