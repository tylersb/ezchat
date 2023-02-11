import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  auth,
  signInWithGoogle,
  logInWithEmailAndPassword,
  logInAnonymously
} from '../../firebase'
import { Typography, TextField, Button, Box } from '@mui/material'

const validate = (email, password) => {
  return {
    email: email.length === 0,
    password: password.length === 0
  }
}

export default function Login() {
  const [user, loading] = useAuthState(auth)
  const [form, setForm] = useState({
    email: '',
    password: '',
    touched: {
      email: false,
      password: false
    }
  })

  const handleBlur = (field) => (evt) => {
    setForm({
      ...form,
      touched: { ...form.touched, [field]: true }
    })
  }

  const errors = validate(form.email, form.password)
  const isDisabled = Object.keys(errors).some((x) => errors[x])

  const shouldMarkError = (field) => {
    const hasError = errors[field]
    const shouldShow = form.touched[field]

    return hasError ? shouldShow : false
  }

  const handleLogin = (e) => {
    if (isDisabled) return
    e.preventDefault()
    logInWithEmailAndPassword(form.email, form.password)
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return
    }
    if (user) navigate('/')
  }, [user, loading, navigate])

  return (
    <>
      <Typography variant="h4" component="h1" align="center">
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          onBlur={handleBlur('email')}
          error={shouldMarkError('email')}
          autoComplete="username"
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          onBlur={handleBlur('password')}
          error={shouldMarkError('password')}
          autoComplete="current-password"
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ marginBottom: '8px' }}
          disabled={isDisabled}
        >
          Login
        </Button>
        <Button
          variant="contained"
          onClick={signInWithGoogle}
          fullWidth
          sx={{ marginBottom: '8px' }}
        >
          Login with Google
        </Button>
        <Button variant="contained" onClick={logInAnonymously} fullWidth>
          Login Anonymously
        </Button>
      </form>
    </>
  )
}
