import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'
// import UserPanel from './UserPanel'
// import Starred from './Starred'
// import Channels from './Channels'
// import DirectMessages from './DirectMessages'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'

export default function SidePanel({ user }) {

  const navigate = useNavigate()

  const handleLogout = () => {
    auth.signOut()
    navigate('/login')
  }

  return (
    <div>
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: '#4c3c4c', fontSize: '1.2rem' }}
      >
        {/* <UserPanel user={user} /> */}
        {/* <Starred />
        <Channels />
        <DirectMessages /> */}
        <Menu.Item onClick={handleLogout}>
          <Icon name="sign out" />
          Logout
        </Menu.Item>
      </Menu>
    </div>
  )
}