import { useState } from 'react'
import {
  Button,
  Dialog,
  TextField,
  DialogContent,
  DialogTitle
} from '@mui/material'

export default function PassReset({ sendPasswordReset }) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    sendPasswordReset(email)
  }

  return (
    <>
      <Button onClick={handleClickOpen}>Lost Password?</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">
          Enter your email address to reset your password
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleConfirm}>
            <TextField
              id="email"
              label="Email Address"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 1, mt: 1 }}
              autoComplete="email"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 1 }}
            >
              Reset Password
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
