import { useState } from 'react'
import { Button, Dialog, TextField, Box, DialogTitle } from '@mui/material'
import { Add } from '@mui/icons-material'

export default function NewDirectMessageModal({ addNewDirectMessage }) {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(null)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    addNewDirectMessage(user)
    setOpen(false)
  }

  return (
    <>
      <Button
        onClick={handleClickOpen}
        style={{ background: 'transparent', color: 'white' }}
        floated="right"
      >
        <Add />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">Enter an email address to send a direct message</DialogTitle>

          <TextField
            id="user"
            label="User"
            variant="outlined"
            fullWidth
            required
            value={user}
            onChange={(e) => setUser(e.target.value)}
            sx={{ mb: 1, mt: 1 }}
            autoComplete="user"
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
          >
            Add User
          </Button>
      </Dialog>
    </>
  )
}
