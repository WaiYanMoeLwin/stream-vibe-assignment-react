import { ScrollRestoration } from 'react-router-dom'
import './App.css'
import { AppRouters } from './routers'

function App() {

  return (
    <AppRouters>
      <ScrollRestoration />
    </AppRouters>
  )
}

export default App
