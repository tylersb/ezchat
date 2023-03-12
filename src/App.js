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
import { auth, db } from './firebase'
import { query, collection, where } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'

function App() {
  const [userData, userDataLoading] = useCollectionData(
    query(
      collection(db, 'users'),
      where('uid', '==', auth?.currentUser?.uid || null)
    ),
    {
      idField: 'uid'
    }
  )

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useState()

  useEffect(() => {
    if (userData?.[0]?.theme) {
      setMode(userData?.[0]?.theme)
    } else {
      setMode(prefersDarkMode ? 'dark' : 'light')
    }
  }, [prefersDarkMode, userData])

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
            <Route
              path="/"
              element={
                <Dashboard
                  userData={userData}
                  userDataLoading={userDataLoading}
                />
              }
            />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/*"
              element={
                <Dashboard
                  userData={userData}
                  userDataLoading={userDataLoading}
                />
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
