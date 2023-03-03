import { useState } from 'react'
import { Button, Dialog, TextField, DialogTitle } from '@mui/material'
import { Add } from '@mui/icons-material'
import { findUserByEmail } from '../../firebase'
import { toast } from 'react-toastify'
import { useTheme } from '@mui/material/styles'

export default function NewDirectMessageModal({ addNewDirectMessage }) {
  const [open, setOpen] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const theme = useTheme()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const foundUserId = await findUserByEmail(userEmail)
      if (!foundUserId) {
        return
      }
      addNewDirectMessage(foundUserId)
      setOpen(false)
      setUserEmail('')
    } catch (error) {
      console.error(error)
      toast.error('An error occured while looking that user up', {
        position: 'top-center'
      })
    }
  }

  return (
    <>
      <Button
        onClick={handleClickOpen}
        sx={{ background: 'transparent', color: 'white' }}
        floated="right"
      >
        <Add sx={theme.palette.mode === 'light' && { color: 'black' }} />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">
          Enter an email address to send a direct message
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <TextField
            id="user"
            label="User Email"
            variant="outlined"
            fullWidth
            required
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            sx={{ mb: 1, mt: 1 }}
            autoComplete="off"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
          >
            Start Direct Message
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
      </Dialog>
    </>
  )
}
