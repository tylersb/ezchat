import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import { Box, TextField, IconButton } from '@mui/material'
import { storage } from '../../firebase'
import { ref, uploadBytes } from 'firebase/storage'
import UploadSharpIcon from '@mui/icons-material/UploadSharp'
import SendSharpIcon from '@mui/icons-material/SendSharp'

export default function MessageForm({ userData, activeGroupId }) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    try {
      const storageRef = ref(storage, file.name)
      await uploadBytes(storageRef, file)
    } catch (err) {
      console.error(err)
    }
  }

  const sendMessage = async (e) => {
    if (!message.trim()) return
    e.preventDefault()
    setLoading(true)
    try {
      await addDoc(collection(db, 'messages'), {
        groupId: activeGroupId,
        content: message,
        createdAt: serverTimestamp(),
        uid: userData.uid
      })
      setMessage('')
      setLoading(false)
    } catch (err) {
      console.error(err)
      alert('An error occured while sending message')
      setLoading(false)
    }
  }

  return (
    <Box>
      <form onSubmit={sendMessage}>
        <TextField
          label="Message"
          variant="filled"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className={loading ? 'loading' : ''}
          fullWidth
          display="inline"
        />
        <IconButton
          color="primary"
          variant="contained"
          type="submit"
          disabled={loading || message.length < 1}
          display="inline"
        >
          <SendSharpIcon />
        </IconButton>
        {/* <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={loading || message.length < 1}
          display="inline"
        >
          Send
        </Button> */}
      </form>
    </Box>
  )
}
