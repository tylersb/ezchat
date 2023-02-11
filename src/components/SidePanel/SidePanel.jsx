import UserPanel from './UserPanel'
// import Starred from './Starred'
// import DirectMessages from './DirectMessages'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import Channels from './Channels'
import ModeToggle from '../ModeToggle'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

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
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <UserPanel userData={userData} userDataLoading={userDataLoading} 
            handleLogout={handleLogout}
          />
          <ModeToggle />
        </Box>
      </Box>
      <Channels
        activeGroupId={activeGroupId}
        handleGroupClick={handleGroupClick}
        groups={groups}
        groupsloading={groupsloading}
      />
    </Box>
  )
}
