import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle
} from '../../firebase'
import { useEffect, useState } from 'react'
import '../../styles/Register.css'
import { Button, Form, Message } from 'semantic-ui-react'
import Layout from './Layout'

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [user, loading, error] = useAuthState(auth)

  const navigate = useNavigate()

  const register = () => {
    if (
      form.password !== form.confirmPassword
    ) {
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
    const { name, email, password } = form
    registerWithEmailAndPassword(name, email, password)
  }

  useEffect(() => {
    if (loading) return
    if (user) navigate('/dashboard')
  }, [user, loading])

  return (
    <Layout header="Sign up to get started">
      <Form onSubmit={register}>
      <Form.Input
        fluid
        icon="user"
        iconPosition="left"
        placeholder="Name"
        className="auth-input-field"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <Form.Input
        fluid
        icon="user"
        iconPosition="left"
        placeholder="E-mail address"
        className="auth-input-field"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
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
      />
      <Form.Input
        fluid
        icon="lock"
        iconPosition="left"
        placeholder="Confirm Password"
        type="password"
        className="auth-input-field"
        value={form.confirmPassword}
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        required
      />
      <Form.Button color="teal" fluid size="huge"
      type="submit"
      >
        Sign up
      </Form.Button>
      </Form>
        <Form.Button color="teal" fluid size="huge"
        onClick={signInWithGoogle}
        >
          Sign Up through Google
        </Form.Button>
      <Message size="big">
        <Link to="/login">Already Registered?</Link>
      </Message>
    </Layout>
    // <div className="register">
    //   <div className="register__container">
    //     <input
    //       type="text"
    //       className="register__textBox"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //       placeholder="Full Name"
    //     />
    //     <input
    //       type="text"
    //       className="register__textBox"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       placeholder="E-mail Address"
    //     />
    //     <input
    //       type="password"
    //       className="register__textBox"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       placeholder="Password"
    //     />
    //     <button className="register__btn" onClick={register}>
    //       Register
    //     </button>
    //     <button
    //       className="register__btn register__google"
    //       onClick={signInWithGoogle}
    //     >
    //       Register with Google
    //     </button>
    //     <div>
    //       Already have an account? <Link to="/">Login</Link> now.
    //     </div>
    //   </div>
    // </div>
  )
}
