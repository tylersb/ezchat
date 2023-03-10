import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  auth,
  signInWithGoogle,
  logInAnonymously,
  signInWithGithub,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset
} from '../../firebase'
import { useEffect } from 'react'
import { SvgIcon } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'
import EmailAuth from './EmailAuth'
import PassReset from './PassReset'

export default function Auth() {
  const [user, loading] = useAuthState(auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return
    }
    if (user) navigate('/')
  }, [user, loading, navigate])

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid item>
        <Paper
          elevation={3}
          sx={{
            padding: '16px',
            textAlign: 'center'
          }}
        >
          <Box>
            <Box sx={{ width: '100%', maxWidth: '450px' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <EmailAuth
                    type={'login'}
                    handleSubmit={logInWithEmailAndPassword}
                  >
                    <MarkEmailReadIcon />
                    Login /w Email
                  </EmailAuth>
                </Grid>
                <Grid item xs={6}>
                  <EmailAuth
                    type={'register'}
                    handleSubmit={registerWithEmailAndPassword}
                  >
                    <MailOutlineIcon />
                    Register /w Email
                  </EmailAuth>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                onClick={signInWithGoogle}
                fullWidth
                sx={{
                  marginBottom: '8px',
                  backgroundColor: 'white',
                  color: '#757575'
                }}
              >
                <SvgIcon>
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </SvgIcon>
                Login/Register with Google
              </Button>
              <Button
                variant="contained"
                onClick={signInWithGithub}
                fullWidth
                sx={{
                  marginBottom: '8px',
                  backgroundColor: '#333333',
                  color: '#ffffff'
                }}
              >
                <SvgIcon>
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </SvgIcon>
                Login/Register with Github
              </Button>
              <Button
                variant="contained"
                onClick={logInAnonymously}
                fullWidth
                sx={{
                  marginBottom: '8px',
                  backgroundColor: '#f4b400',
                  color: '#ffffff'
                }}
              >
                <PersonOutlineIcon />
                Continue as Guest
              </Button>
            </Box>
            <PassReset sendPasswordReset={sendPasswordReset} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}
