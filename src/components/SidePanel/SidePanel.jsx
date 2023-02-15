import UserPanel from './UserPanel'
// import Starred from './Starred'
// import DirectMessages from './DirectMessages'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import Channels from './Channels'
import ModeToggle from '../ModeToggle'
import { Stack } from '@mui/material'

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
    navigate('/auth')
  }

  return (
    <Stack>
      <Stack direction='row' justifyContent='space-between' >
        <UserPanel
          userData={userData}
          userDataLoading={userDataLoading}
          handleLogout={handleLogout}
        />
        <ModeToggle />
      </Stack>

      <Channels
        activeGroupId={activeGroupId}
        handleGroupClick={handleGroupClick}
        groups={groups}
        groupsloading={groupsloading}
        userData={userData}
      />
    </Stack>
  )
}
