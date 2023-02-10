import React from 'react'
import { Menu, Icon, Image } from 'semantic-ui-react'

export default function UserPanel({ userData, handleLogout }) {
  

  return (
    <div>
      <Menu.Item>
        <span>
          <Image src={userData?.avatar} avatar spaced="right" />
          {userData?.email} ({userData?.name})
        </span>
      </Menu.Item>
      <Menu.Item onClick={handleLogout}>
        <span>
          <Icon name="sign-out" />
          Logout
        </span>
      </Menu.Item>
    </div>
  )
}
