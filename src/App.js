import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Reset from './components/Auth/Reset'
import Dashboard from './components/Dashboard'
import Auth from './components/Auth/Auth'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import CssBaseline from '@mui/material/CssBaseline'

function App() {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
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
