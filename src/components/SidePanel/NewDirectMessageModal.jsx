import { useState } from 'react'
import { Button, Dialog, TextField, DialogTitle } from '@mui/material'
import { Add } from '@mui/icons-material'
import { db } from '../../firebase'
import { getDocs, where, query, collection } from 'firebase/firestore'
import { toast } from 'react-toastify'

export default function NewDirectMessageModal({ addNewDirectMessage }) {
  const [open, setOpen] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const userRef = query(
        collection(db, 'users'),
        where('email', '==', userEmail.toLowerCase().trim())
      )
      const userDoc = (await getDocs(userRef)).docs[0].data()
      if (!userDoc) {
        toast.error('No user found with that email', {
          position: 'top-center'
        })
        return
      }
      addNewDirectMessage(userDoc.uid)
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
        style={{ background: 'transparent', color: 'white' }}
        floated="right"
      >
        <Add />
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
