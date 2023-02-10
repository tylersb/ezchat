import { Form, Header } from 'semantic-ui-react'
import logo from '../../assets/logo.png'
import '../../styles/Layout.css'

export default function Layout({ children, header }) {
  return (
    <div className="auth-main">
      <div class="auth-content">
        <div className="auth-card">
          <img src={logo} alt="Logo" className="auth-logo" />
          <Header as="h2" color="black" textAlign="center">
            {header}
          </Header>
          <Form.Group size="large" className="auth-form" autocomplete="off">
            {children}
          </Form.Group>
        </div>
      </div>
    </div>
  )
}
