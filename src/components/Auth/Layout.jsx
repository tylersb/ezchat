import { Header, Image, Grid } from 'semantic-ui-react'
import logo from '../../assets/logo.png'

export default function Layout({ children, header }) {
  return (
    <Grid textAlign="center" verticalAlign="middle" className="auth">
      <Grid.Column style={{ maxWidth: 450 }}>
          <Image src={logo} size="small" centered />
          <Header as="h2" color="black" textAlign="center">
            {header}
          </Header>
            {children}
      </Grid.Column>
    </Grid>
  )
}
