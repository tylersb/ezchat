import { useState, useRef } from 'react'
import { addNewMessage } from '../../firebase'
import { TextField, IconButton, InputAdornment, Box, Menu } from '@mui/material'
import SendSharpIcon from '@mui/icons-material/SendSharp'
import { toast } from 'react-toastify'
import GifBoxIcon from '@mui/icons-material/GifBox'
import GifPicker from 'gif-picker-react'
import FileUploadDialog from './FileUploadDialog'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import EmojiMenu from '../EmojiMenu'

export default function MessageForm({ userData, activeGroupId }) {
  // State
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [openGif, setOpenGif] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  // Refs
  const gifPickerRef = useRef(null)

  // Handlers
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
      await addNewMessage(message, activeGroupId, userData.uid, 'text')
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

  const handleOpenGif = () => {
    setOpenGif(true)
  }

  const handleCloseGif = () => {
    setOpenGif(false)
  }

  const handleSendGif = async (gif) => {
    try {
      await addNewMessage(gif, activeGroupId, userData.uid, 'gif')
      setOpenGif(false)
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
                <IconButton name="file" onClick={handleOpenDialog}>
                  <AddCircleIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <>
                <InputAdornment position="end">
                  <IconButton name="gif" onClick={handleOpenGif}>
                    <Box component="span" ref={gifPickerRef}>
                      <GifBoxIcon />
                    </Box>
                  </IconButton>
                </InputAdornment>
                <InputAdornment position="end">
                  <EmojiMenu message={message} setMessage={setMessage} />
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

      <FileUploadDialog
        userData={userData}
        activeGroupId={activeGroupId}
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
      />
      <Box>
        <Menu
          id="gif-picker"
          anchorEl={
            gifPickerRef.current ? gifPickerRef.current.parentElement : null
          }
          open={openGif}
          onClose={handleCloseGif}
          MenuListProps={{
            'aria-labelledby': 'gif-picker',
            sx: { p: 0 }
          }}
        >
          <GifPicker
            tenorApiKey={process.env.REACT_APP_TENOR_API_KEY}
            onGifClick={handleSendGif}
          />
        </Menu>
      </Box>
    </Box>
  )
}
