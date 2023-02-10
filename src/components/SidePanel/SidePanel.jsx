import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import UserPanel from './UserPanel'
// import Starred from './Starred'
// import Channels from './Channels'
// import DirectMessages from './DirectMessages'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import Channels from './Channels'

export default function SidePanel({ userData }) {

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
        <UserPanel userData={userData} handleLogout={handleLogout} />
        {/* <Starred /> */}
        <Channels />
        {/* <DirectMessages /> */}
      </Menu>
    </div>
  )
}