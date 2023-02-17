import { useState, useRef } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import {
  TextField,
  IconButton,
  InputAdornment,
  Stack,
  Box,
  Menu
} from '@mui/material'

import SendSharpIcon from '@mui/icons-material/SendSharp'

import { toast } from 'react-toastify'
import GifBoxIcon from '@mui/icons-material/GifBox'
import GifPicker from 'gif-picker-react'
import FileUploadDialog from './FileUploadDialog'
import AddCircleIcon from '@mui/icons-material/AddCircle'

export default function MessageForm({ userData, activeGroupId }) {
  // State
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  const open = Boolean(anchorEl)

  // Refs

  // Handle clicks/actions
  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleMessageSend = async (e) => {
    e.preventDefault()
    if (!message.trim()) return
    setLoading(true)
    try {
      await addDoc(collection(db, 'messages'), {
        groupId: activeGroupId,
        content: message,
        type: 'text',
        createdAt: serverTimestamp(),
        uid: userData.uid
      })
      setMessage('')
      setLoading(false)
    } catch (err) {
      console.error(err)
      toast.error('Error sending message', {
        position: 'top-center'
      })
      setLoading(false)
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSendGif = async (gif) => {
    try {
      await addDoc(collection(db, 'messages'), {
        groupId: activeGroupId,
        content: gif,
        type: 'gif',
        createdAt: serverTimestamp(),
        uid: userData.uid
      })
      setAnchorEl(null)
    } catch (err) {
      console.error(err)
      toast.error('Error sending gif', {
        position: 'top-center'
      })
    }
  }

  return (
    <Box>
      <form onSubmit={handleMessageSend}>
        <TextField
          label="Message"
          variant="filled"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          sx={{ p: 0, m: 0, display: 'block' }}
          fullWidth
          autoFocus
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleOpenDialog}>
                  <AddCircleIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <>
                <InputAdornment position="end">
                  <IconButton onClick={handleClick}>
                    <GifBoxIcon />
                  </IconButton>
                </InputAdornment>
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    disabled={loading || !message.trim()}
                  >
                    <SendSharpIcon />
                  </IconButton>
                </InputAdornment>
              </>
            )
          }}
        />
      </form>
      <Stack spacing={2} direction="row">
        <FileUploadDialog
          userData={userData}
          activeGroupId={activeGroupId}
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
        />
        <Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
              sx: { p: 0 }
            }}
          >
            <GifPicker
              tenorApiKey={process.env.REACT_APP_TENOR_API_KEY}
              onGifClick={handleSendGif}
            />
          </Menu>
        </Box>
      </Stack>
    </Box>
  )
}
