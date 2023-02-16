import { useState } from 'react'
import {
  Button,
  Dialog,
  TextField,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { toast } from 'react-toastify'

const validate = (email, password, name) => {
  return {
    email: email?.length === 0,
    password: password?.length === 0,
    name: name?.length === 0
  }
}

export default function EmailAuth({ children, handleSubmit, type }) {
  // States
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
  const [showPassword, setShowPassword] = useState(false)

  // Handle functions
  const handleBlur = (field) => (evt) => {
    setForm({
      ...form,
      touched: { ...form.touched, [field]: true }
    })
  }
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (e) => {
    e.preventDefault()
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

  const handleClickOpen = () => {
    setOpen(true)
  }

  // Validation
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

  // Submit functions
  const register = () => {
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match', {
        position: 'top-center'
      })
      return
    }
    if (!form.email || !form.password || !form.name) {
      toast.error('Please fill out all fields', {
        position: 'top-center'
      })
      return
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters', {
        position: 'top-center'
      })
      return
    }
    const { name, email, password } = form
    handleSubmit(name, email, password)
  }

  const login = () => {
    if (!form.email || !form.password) {
      toast.error('Please fill out all fields', {
        position: 'top-center'
      })
      return
    }
    const { email, password } = form
    handleSubmit(email, password)
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
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onBlur={handleBlur('password')}
              error={shouldMarkError('password')}
              sx={{ mb: 1, mt: 1 }}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {type === 'register' && (
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                required
                type={showPassword ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                onBlur={handleBlur('confirmPassword')}
                error={shouldMarkError('confirmPassword')}
                sx={{ mb: 1, mt: 1 }}
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
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
