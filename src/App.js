import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Auth from './components/Auth/Auth'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useState, useEffect, useMemo } from 'react'
import { ColorModeContext } from './components/contexts/ColorModeContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useState()

  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light')
  }, [prefersDarkMode])

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
  )

  const lightTheme = createTheme({
    palette: {
      mode: 'light'
    },
    typography: {
      fontFamily: 'Roboto',
      button: {
        textTransform: 'none'
      }
    }
  })

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    },
    typography: {
      fontFamily: 'Roboto',
      button: {
        textTransform: 'none'
      }
    }
  })

  const theme = mode === 'light' ? lightTheme : darkTheme

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/*" element={<Dashboard />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
