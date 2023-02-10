import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { auth, sendPasswordReset } from '../../firebase'
import { Button, Form, Message } from 'semantic-ui-react'
import Layout from './Layout'

export default function Reset() {
  const [email, setEmail] = useState('')
  const [user, loading, error] = useAuthState(auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (user) navigate('/dashboard')
  }, [user, loading])
  
  return (
    <Layout header="Reset your password">
      <Form.Input
        fluid
        icon="user"
        iconPosition="left"
        placeholder="E-mail address"
        className="auth-input-field"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        color="teal"
        fluid
        size="huge"
        onClick={() => sendPasswordReset(email)}
      >
        Send password reset email
      </Button>
      <br />
      <div>
        Don't have an account? <Link to="/register">Register</Link> now.
      </div>
    </Layout>
    // {/* <div className="reset">
    //   <div className="reset__container">
    //     <input
    //       type="text"
    //       className="reset__textBox"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       placeholder="E-mail Address"
    //     />
    //     <button
    //       className="reset__btn"
    //       onClick={() => sendPasswordReset(email)}
    //     >
    //       Send password reset email
    //     </button>
    //     <div>
    //       Don't have an account? <Link to="/register">Register</Link> now.
    //     </div>
    //   </div>
    // </div> */}
  )
}
