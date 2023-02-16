import UserPanel from './UserPanel'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import Channels from './Channels'
import ModeToggle from '../ModeToggle'
import { Stack, Skeleton, Box } from '@mui/material'
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
    <Box>
      {userDataLoading ? (
        <Stack>
          <Stack>
            <Skeleton variant="circular" width={40} height={40} 
              sx={{
                ml: 1,
              }}
            />
            <Skeleton variant="text" width={200} />
          </Stack>
          <br />
          <Stack>
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={200} />
          </Stack>
          <br />
          <br />
          <Stack>
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={200} />
          </Stack>
        </Stack>
      ) : (
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
      )}
    </Box>
  )
}
