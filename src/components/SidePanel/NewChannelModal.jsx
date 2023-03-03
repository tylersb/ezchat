import { useState } from 'react'
import {
  Button,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Divider
} from '@mui/material'
import { Add } from '@mui/icons-material'
import { addNewGroup, joinChannel } from '../../firebase'
import { useTheme } from '@mui/material/styles'

export default function NewChannelModal({ userData }) {
  const [open, setOpen] = useState(false)
  const [channel, setChannel] = useState({
    name: '',
    description: ''
  })
  const [channelId, setChannelId] = useState('')

  const theme = useTheme()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    addNewGroup([userData?.uid], userData.uid, 'channel', channel)
    setChannel({ name: '', description: '' })
    setOpen(false)
  }

  const handleJoin = () => {
    joinChannel(channelId, userData?.uid)
    setChannelId('')
    setOpen(false)
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
        <DialogTitle>Join a Channel or Create a New One</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a Channel ID then click Join to join an existing
            channel
          </DialogContentText>
          <Stack direction="row">
            <TextField
              autoFocus
              margin="dense"
              id="channelId"
              label="Channel ID"
              type="text"
              fullWidth
              autoComplete="off"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
            />
            <Button onClick={handleJoin}>Join</Button>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <DialogContentText>
            If you'd like to create a brand new channel instead of joining an
            existing one, please enter the details below then click Create
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
            value={channel.description}
            onChange={(e) =>
              setChannel({ ...channel, description: e.target.value })
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
