import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
  logInAnonymously
} from '../../firebase'
import { useEffect, useState } from 'react'
import { Form, Message, Segment } from 'semantic-ui-react'
import Layout from './Layout'

const validate = (email, password, name) => {
  return {
    email: email.length === 0,
    password: password.length === 0,
    name: name.length === 0
  }
}

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    touched: {
      name: false,
      email: false,
      password: false
    }
  })

  const [user, loading] = useAuthState(auth)

  const navigate = useNavigate()

  const handleBlur = (field) => (evt) => {
    setForm({
      ...form,
      touched: { ...form.touched, [field]: true }
    })
  }

  const errors = validate(form.email, form.password, form.name)
  const isDisabled = Object.keys(errors).some((x) => errors[x])

  const shouldMarkError = (field) => {
    const hasError = errors[field]
    const shouldShow = form.touched[field]

    return hasError ? shouldShow : false
  }

  const register = (e) => {
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    if (!form.email || !form.password || !form.name) {
      alert('Please fill out all fields')
      return
    }
    if (form.password.length < 6) {
      alert('Password must be at least 6 characters')
      return
    }
    e.preventDefault()
    const { name, email, password } = form
    registerWithEmailAndPassword(name, email, password)
  }

  useEffect(() => {
    if (loading) return
    if (user) navigate('/')
  }, [user, loading, navigate])

  return (
    <Layout header="Sign up to get started">
      <Segment>
        <Form onSubmit={register}>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Name"
            className="auth-input-field"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onBlur={handleBlur('name')}
            required
            error={shouldMarkError('name')}
          />
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="E-mail address"
            className="auth-input-field"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onBlur={handleBlur('email')}
            required
            error={shouldMarkError('email')}
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
            onBlur={handleBlur('password')}
            required
            error={shouldMarkError('password')}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Confirm Password"
            type="password"
            className="auth-input-field"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            required
          />
          <Form.Button
            color="teal"
            fluid
            size="huge"
            type="submit"
            disabled={isDisabled}
          >
            Sign up
          </Form.Button>
        </Form>
        <Form.Button color="teal" fluid size="huge" onClick={signInWithGoogle}>
          Sign Up through Google
        </Form.Button>
        <Form.Button color="teal" fluid size="huge" onClick={logInAnonymously}>
          Sign In Anonymously
        </Form.Button>
      </Segment>
      <Message size="big">
        <Link to="/login">Already Registered?</Link>
      </Message>
    </Layout>
  )
}
