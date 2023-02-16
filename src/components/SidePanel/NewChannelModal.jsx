import { useState } from 'react'
import {
  Button,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { Add } from '@mui/icons-material'

export default function NewChannelModal({ addNewChannel }) {
  const [open, setOpen] = useState(false)
  const [channel, setChannel] = useState({
    name: '',
    details: ''
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    addNewChannel(channel)
    setChannel({ name: '', details: '' })
    setOpen(false)
  }

  return (
    <>
      <Button
        onClick={handleClickOpen}
        sx={{ background: 'transparent', color: 'white' }}
        floated="right"
      >
        <Add />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new channel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name and description for the new channel
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Channel Name"
            type="text"
            fullWidth
            value={channel.name}
            onChange={(e) => setChannel({ ...channel, name: e.target.value })}
            autoComplete="off"
          />
          <TextField
            margin="dense"
            id="name"
            label="Channel Description"
            type="text"
            fullWidth
            value={channel.details}
            onChange={(e) =>
              setChannel({ ...channel, details: e.target.value })
            }
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
