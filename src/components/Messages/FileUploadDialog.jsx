import { useState, forwardRef, useRef } from 'react'
import { IconButton, Dialog, DialogTitle, Slide, DialogContent } from '@mui/material'
import { toast } from 'react-toastify'
import UploadSharpIcon from '@mui/icons-material/UploadSharp'
import { uploadFile } from '../../firebase'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function FileUploadDialog({ userData, activeGroupId, openDialog, handleCloseDialog }) {
  // State
  const [file, setFile] = useState(null)

  // Refs
  const fileInputRef = useRef()
  
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
      uploadFile(file, activeGroupId, userData.uid)
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
