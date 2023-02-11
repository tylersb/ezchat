import { useState } from 'react'
import {
  Button,
  Dialog,
  TextField,
  DialogContent,
  DialogTitle
} from '@mui/material'

const validate = (email, password, name) => {
  return {
    email: email?.length === 0,
    password: password?.length === 0,
    name: name?.length === 0
  }
}

export default function EmailAuth({ children, handleSubmit, type }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    touched: {
      name: false,
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

  const errors =
    type === 'register'
      ? validate(form.email, form.password, form.name)
      : validate(form.email, form.password)

  const isDisabled = Object.keys(errors).some((x) => errors[x])

  const shouldMarkError = (field) => {
    const hasError = errors[field]
    const shouldShow = form.touched[field]

    return hasError ? shouldShow : false
  }

  const register = () => {
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    if (!form.email || !form.password || !form.name) {
      alert('Please fill out all fields')
      return
    }
    if (form.password.length < 6) {
      alert('Password must be at least 6 characters')
      return
    }
    const { name, email, password } = form
    handleSubmit(name, email, password)
  }

  const login = () => {
    if (!form.email || !form.password) {
      alert('Please fill out all fields')
      return
    }
    const { email, password } = form
    handleSubmit(email, password)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setForm({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      touched: {
        name: false,
        email: false,
        password: false
      }
    })
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    type === 'register' ? register() : login()
  }

  return (
    <>
      <span onClick={handleClickOpen}>{children}</span>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">
          {type === 'register' ? 'Register' : 'Login'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleConfirm}>
            {type === 'register' && (
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                fullWidth
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onBlur={handleBlur('name')}
                error={shouldMarkError('name')}
                sx={{ mb: 1, mt: 1 }}
              />
            )}
            <TextField
              id="email"
              label="Email Address"
              variant="outlined"
              fullWidth
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onBlur={handleBlur('email')}
              error={shouldMarkError('email')}
              sx={{ mb: 1, mt: 1 }}
              autoComplete="email"
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              fullWidth
              required
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onBlur={handleBlur('password')}
              error={shouldMarkError('password')}
              sx={{ mb: 1, mt: 1 }}
              autoComplete="current-password"
            />
            {type === 'register' && (
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                required
                type="password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                onBlur={handleBlur('confirmPassword')}
                error={shouldMarkError('confirmPassword')}
                sx={{ mb: 1, mt: 1 }}
                autoComplete="current-password"
              />
            )}
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              disabled={isDisabled}
              sx={{ mt: 1 }}
            >
              {type === 'register' ? 'Register' : 'Login'}
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              color="error"
              fullWidth
              sx={{ mt: 1 }}
            >
              Cancel
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
