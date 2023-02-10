// import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Reset from './components/Auth/Reset'
import Dashboard from './components/Dashboard'
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
