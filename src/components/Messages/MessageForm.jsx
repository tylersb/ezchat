import { useState, useRef } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import { TextField, IconButton, InputAdornment } from '@mui/material'
import { storage } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import UploadSharpIcon from '@mui/icons-material/UploadSharp'
import SendSharpIcon from '@mui/icons-material/SendSharp'
import { v4 as uuidv4 } from 'uuid'

export default function MessageForm({ userData, activeGroupId }) {
  // State
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)

  // Refs
  const fileInputRef = useRef()

  // Handle clicks/actions
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async (e) => {
    try {
      e.preventDefault()
      if (!file) return
      const storageRef = ref(storage, `images/${uuidv4()}-${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setProgress(progress)
        },
        (error) => {
          console.error(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL)
            addDoc(collection(db, 'messages'), {
              groupId: activeGroupId,
              content: downloadURL,
              createdAt: serverTimestamp(),
              uid: userData.uid
            })
          })
        }
      )
      setFile(null)
      fileInputRef.current.value = ''
    } catch (err) {
      console.error(err)
    }
  }

  const handleMessageSend = async (e) => {
    e.preventDefault()
    if (!message.trim()) return
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
    <>
      <form onSubmit={handleMessageSend}>
        <TextField
          label="Message"
          variant="filled"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className={loading ? 'loading' : ''}
          display="inline"
          fullWidth
          disabled={loading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  type="submit"
                  disabled={loading || !message.trim()}
                  display="inline"
                  sx={{ ml: 1 }}
                >
                  <SendSharpIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </form>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <IconButton type="submit" display="inline" sx={{ ml: 1 }}>
          <UploadSharpIcon />
        </IconButton>
      </form>
    </>
  )
}
