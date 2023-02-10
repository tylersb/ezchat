import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/Login.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  auth,
  signInWithGoogle,
  logInWithEmailAndPassword
} from '../../firebase'
import { Button, Form, Message } from 'semantic-ui-react'
import Layout from './Layout'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, loading, error] = useAuthState(auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return
    }
    if (user) navigate('/dashboard')
  }, [user, loading])

  return (
    <>
      <Layout header="Dashboard Log in">
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          placeholder="E-mail address"
          className="auth-input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          className="auth-input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          color="teal"
          fluid
          size="huge"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Log in
        </Button>
        <br />
        <Button color="teal" fluid size="huge" onClick={signInWithGoogle}>
          Log in with Google
        </Button>
        <Message size="big">
          <Link to="/reset">Forgot Password</Link>
        </Message>
        <Message size="big">
          <Link to="/register">Not Registered?</Link>
        </Message>
      </Layout>
      {/* <div className="login">
        <div className="login__container">
          <input
            type="text"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            className="login__btn"
            onClick={() => logInWithEmailAndPassword(email, password)}
          >
            Login
          </button>
          <button
            className="login__btn login__google"
            onClick={signInWithGoogle}
          >
            Login with Google
          </button>
          <div>
            <Link to="/reset">Forgot Password</Link>
          </div>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
        </div>
      </div> */}
    </>
  )
}
