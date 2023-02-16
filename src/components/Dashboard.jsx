import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { query, collection, where } from 'firebase/firestore'
import SidePanel from './SidePanel/SidePanel'
import Messages from './Messages/Messages'
import {
  useCollection,
  useCollectionData
} from 'react-firebase-hooks/firestore'
import {
  Box,
  Skeleton,
  Divider,
  AppBar,
  IconButton,
  Drawer,
  Toolbar,
  Typography
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import MessagesHeader from './Messages/MessagesHeader'
import { max } from 'moment'

export default function Dashboard() {
  // State
  const [activeGroupId, setActiveGroupId] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  // Firebase Hooks
  const [groups, groupsloading, error] = useCollection(
    query(
      collection(db, 'groups')
      // where('users', 'array-contains', auth.currentUser?.uid || null),
    ),
    { idField: 'id' }
  )
  const [userData, userDataLoading, userDataError] = useCollectionData(
    query(
      collection(db, 'users'),
      where('uid', '==', auth.currentUser?.uid || null)
    ),
    { idField: 'uid' }
  )

  // Firebase hook to check if user is logged in
  const [user, loading] = useAuthState(auth)

  // React Router hook to navigate to different pages
  const navigate = useNavigate()

  // If user is not logged in, redirect to login page
  useEffect(() => {
    if (loading) return
    if (!user) return navigate('/auth')
  }, [user, loading, navigate])

  // Click handlers
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const handleGroupClick = (group) => {
    setActiveGroupId(group?.id)
  }

  // If there are groups, set the active group to the first group
  if (!activeGroupId && groups?.docs?.length > 0) {
    setActiveGroupId(groups?.docs[0].id)
  }

  const drawer = (
    <Box>
      {loading ? (
        <Skeleton variant="rectangular" width={210} height={118} />
      ) : (
        <SidePanel
          userData={userData?.[0]}
          handleGroupClick={handleGroupClick}
          activeGroupId={activeGroupId}
          groups={groups}
          groupsloading={groupsloading}
          userDataLoading={userDataLoading}
        />
      )}
    </Box>
  )

  const drawerWidth = 240

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <MessagesHeader
            userData={userData?.[0]}
            activeGroupId={activeGroupId}
            groups={groups}
          />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="siebar"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          p: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          maxWidth: { sm: `calc(100% - ${drawerWidth}px)` },
          overflow: 'hidden',
        }}
      >
        <Toolbar />
        <Messages
          userData={userData?.[0]}
          activeGroupId={activeGroupId}
          groups={groups}
        />
      </Box>
    </Box>
  )
}
