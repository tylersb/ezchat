import UserPanel from './UserPanel'
// import Starred from './Starred'
// import DirectMessages from './DirectMessages'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import Channels from './Channels'
import ModeToggle from '../ModeToggle'
import { Stack } from '@mui/material'
import DirectMessages from './DirectMessages'

export default function SidePanel({
  userData,
  handleGroupClick,
  groups,
  groupsloading,
  userDataLoading,
  userEmail
}) {
  const navigate = useNavigate()

  const handleLogout = () => {
    auth.signOut()
    navigate('/auth')
  }

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between">
        <UserPanel
          userData={userData}
          userDataLoading={userDataLoading}
          handleLogout={handleLogout}
        />
        <ModeToggle />
      </Stack>

      <Channels
        handleGroupClick={handleGroupClick}
        groups={groups}
        groupsloading={groupsloading}
        userData={userData}
      />
      <DirectMessages
        handleGroupClick={handleGroupClick}
        groups={groups}
        groupsloading={groupsloading}
        userData={userData}
        userEmail={userEmail}
      />
    </Stack>
  )
}
