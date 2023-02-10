import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { auth, sendPasswordReset } from '../../firebase'
import { Form, Segment } from 'semantic-ui-react'
import Layout from './Layout'

export default function Reset() {
  const [email, setEmail] = useState('')
  const [user, loading] = useAuthState(auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (user) navigate('/dashboard')
  }, [user, loading, navigate])

  const handleReset = (e) => {
    e.preventDefault()
    sendPasswordReset(email)
  }
  
  return (
    <Layout header="Reset your password">
      <Segment>
      <Form onSubmit={handleReset}>
      <Form.Input
        fluid
        icon="user"
        iconPosition="left"
        placeholder="E-mail address"
        className="auth-input-field"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Form.Button
        color="teal"
        fluid
        size="huge"
      >
        Send password reset email
      </Form.Button>
      </Form>
      </Segment>
      <div>
        Don't have an account? <Link to="/register">Register</Link> now.
      </div>
    </Layout>
  )
}
