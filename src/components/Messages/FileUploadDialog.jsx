import { useState, forwardRef, useRef } from 'react'
import { IconButton, Dialog, DialogTitle, Slide, DialogContent } from '@mui/material'
import { toast } from 'react-toastify'
import UploadSharpIcon from '@mui/icons-material/UploadSharp'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { storage, db } from '../../firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function FileUploadDialog({ userData, activeGroupId, openDialog, handleCloseDialog }) {
  // State
  const [file, setFile] = useState(null)

  // Refs
  const fileInputRef = useRef()
  const toastId = useRef(null)

  // Handle clicks/actions
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = (e) => {
    e.preventDefault()
    if (!file)
      return toast.error('Please select a file to upload', {
        position: 'top-center'
      })
    try {
      const storageRef = ref(storage, `images/${uuidv4()}-${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          if (toastId.current) {
            toast.update(toastId.current, {
              render: `Uploading... ${progress}%`,
              type: 'info',
              isLoading: true,
              progress
            })
          } else {
            toastId.current = toast.info(`Uploading... ${progress}%`, {
              position: 'top-center',
              autoClose: false,
              progress
            })
          }
        },
        (error) => {
          console.error(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            addDoc(collection(db, 'messages'), {
              groupId: activeGroupId,
              content: downloadURL,
              type: 'image',
              createdAt: serverTimestamp(),
              uid: userData.uid
            })
          })
          toast.update(toastId.current, {
            render: 'Upload complete',
            type: 'success',
            isLoading: false,
            progress: undefined
          })
          toastId.current = null
        }
      )
      setFile(null)
      fileInputRef.current.value = ''
      handleCloseDialog()
    } catch (err) {
      console.error(err)
      toast.error('Error uploading file', { position: 'top-center' })
    }
  }



  return (
    <>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="file-upload-dialog"
      >
        <DialogTitle>{'Choose a file to upload'}</DialogTitle>
        <DialogContent>
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
        </DialogContent>
      </Dialog>
    </>
  )
}
