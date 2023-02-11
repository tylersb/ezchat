import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  auth,
  signInWithGoogle,
  logInWithEmailAndPassword,
  logInAnonymously
} from '../../firebase'
import { Form, Message, Segment } from 'semantic-ui-react'
import Layout from './Layout'

const validate = (email, password) => {
  return {
    email: email.length === 0,
    password: password.length === 0
  }
}

export default function Login() {
  const [user, loading] = useAuthState(auth)
  const [form, setForm] = useState({
    email: '',
    password: '',
    touched: {
      email: false,
      password: false
    }
  })

  const handleBlur = (field) => (evt) => {
    setForm({
      ...form,
      touched: { ...form.touched, [field]: true }
    })
  }

  const errors = validate(form.email, form.password)
  const isDisabled = Object.keys(errors).some((x) => errors[x])

  const shouldMarkError = (field) => {
    const hasError = errors[field]
    const shouldShow = form.touched[field]

    return hasError ? shouldShow : false
  }

  const handleLogin = (e) => {
    if (isDisabled) return
    e.preventDefault()
    logInWithEmailAndPassword(form.email, form.password)
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return
    }
    if (user) navigate('/')
  }, [user, loading, navigate])

  return (
    <Layout header="Dashboard Log in">
      <Segment>
        <Form onSubmit={handleLogin}>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="E-mail address"
            className="auth-input-field"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            onBlur={handleBlur('email')}
            error={shouldMarkError('email')}
            autoComplete="username"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            className="auth-input-field"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            onBlur={handleBlur('password')}
            error={shouldMarkError('password')}
            autoComplete="current-password"
          />
          <Form.Button
            color="teal"
            fluid
            size="huge"
            disabled={isDisabled}
            type="submit"
          >
            Log in
          </Form.Button>
        </Form>
        <Form.Button color="teal" fluid size="huge" onClick={signInWithGoogle}>
          Log in with Google
        </Form.Button>
        <Form.Button color="teal" fluid size="huge" onClick={logInAnonymously}>
          Log in Anonymously
        </Form.Button>
      </Segment>
      <Segment>
        <Message size="big">
          <Link to="/reset">Forgot Password</Link>
        </Message>
        <Message size="big">
          <Link to="/register">Not Registered?</Link>
        </Message>
      </Segment>
    </Layout>
  )
}
