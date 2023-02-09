import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Auth/Login'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
