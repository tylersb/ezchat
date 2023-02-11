import { Menu, Loader } from 'semantic-ui-react'
import UserPanel from './UserPanel'
// import Starred from './Starred'
// import DirectMessages from './DirectMessages'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import Channels from './Channels'

export default function SidePanel({
  userData,
  activeGroupId,
  handleGroupClick,
  groups,
  groupsloading,
  userDataLoading
}) {
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
      {userDataLoading ? <Loader active inline="centered" /> : <UserPanel userData={userData} handleLogout={handleLogout} />}
        <Channels 
          userData={userData}
          activeGroupId={activeGroupId}
          handleGroupClick={handleGroupClick}
          groups={groups}
          groupsloading={groupsloading}
        />
        {/* <DirectMessages /> */}
      </Menu>
    </div>
  )
}
