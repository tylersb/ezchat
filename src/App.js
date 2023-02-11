import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Reset from './components/Auth/Reset'
import Dashboard from './components/Dashboard'
import 'semantic-ui-less/semantic.less'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
