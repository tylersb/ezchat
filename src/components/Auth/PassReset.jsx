// import { useEffect, useState } from 'react'
// import { useAuthState } from 'react-firebase-hooks/auth'
// import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import { auth, sendPasswordReset } from '../../firebase'

// export default function Reset() {
//   const [email, setEmail] = useState('')
//   const [user, loading] = useAuthState(auth)

//   const navigate = useNavigate()

//   useEffect(() => {
//     if (loading) return
//     if (user) navigate('/dashboard')
//   }, [user, loading, navigate])

//   const handleReset = (e) => {
//     e.preventDefault()
//     sendPasswordReset(email)
//   }

//   return (
//     <>

//     </>
//     // <Layout header="Reset your password">
//     //   <Segment>
//     //   <Form onSubmit={handleReset}>
//     //   <Form.Input
//     //     fluid
//     //     icon="user"
//     //     iconPosition="left"
//     //     placeholder="E-mail address"
//     //     className="auth-input-field"
//     //     value={email}
//     //     onChange={(e) => setEmail(e.target.value)}
//     //   />
//     //   <Form.Button
//     //     color="teal"
//     //     fluid
//     //     size="huge"
//     //   >
//     //     Send password reset email
//     //   </Form.Button>
//     //   </Form>
//     //   </Segment>
//     //   <div>
//     //     Don't have an account? <Link to="/register">Register</Link> now.
//     //   </div>
//     // </Layout>
//   )
// }

import { useState } from 'react'
import {
  Button,
  Dialog,
  TextField,
  DialogContent,
  DialogTitle
} from '@mui/material'

export default function PassReset({ sendPasswordReset }) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Button onClick={handleClickOpen}>Lost Password?</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">
          Enter your email address to reset your password
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleConfirm}>
            <TextField
              id="email"
              label="Email Address"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 1, mt: 1 }}
              autoComplete="email"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 1 }}
            >
              Reset Password
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
        </DialogContent>
      </Dialog>
    </>
  )
}
