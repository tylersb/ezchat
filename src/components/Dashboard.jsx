import { useEffect, useState, useMemo } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import {
  query,
  collection,
  where,
  orderBy
} from 'firebase/firestore'
import SidePanel from './SidePanel/SidePanel'
import Messages from './Messages/Messages'
import {
  useCollection,
  useCollectionData
} from 'react-firebase-hooks/firestore'
import { Box, AppBar, IconButton, Drawer, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import MessagesHeader from './Messages/MessagesHeader'

export default function Dashboard() {
  // State
  const [activeGroupId, setActiveGroupId] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  // const [lastSeen, setLastSeen] = useState(null)

  // Firebase Hooks
  const [groups, groupsloading] = useCollection(
    query(
      collection(db, 'groups')
      // where('users', 'array-contains', auth.currentUser?.uid || null)
    ),
    { idField: 'id' }
  )
  
  const [userData, userDataLoading] = useCollectionData(
    query(
      collection(db, 'users'),
      where('uid', '==', auth.currentUser?.uid || null)
    ),
    { idField: 'uid' }
  )

  const [users] = useCollectionData(
    query(
      collection(db, 'users')
      // where('uid', 'in', userList)
    ),
    { idField: 'uid' }
  )

  const userGroups = useMemo(() => {
    const userGroups = []
    groups?.docs?.forEach((group) => {
      userGroups.push(group.id)
    })
    return userGroups
  }, [groups])

  const whereValue = userGroups?.length > 0 ? 'in' : '=='

  const messageQuery = useMemo(
    () =>
      query(
        collection(db, 'messages'),
        orderBy('createdAt'),
        where('groupId', whereValue, userGroups || activeGroupId)
      ),
    [activeGroupId, userGroups, whereValue]
  )

  const [messages, messagesLoading, messagesError] = useCollection(
    messageQuery,
    { idField: 'id' }
  )

  console.log(userData)

  // useEffect(() => {
  //   if (!messages) return
  //   const lastSeenRef = doc(db, 'lastSeen', auth.currentUser?.uid)
  //   const getData = async () => {
  //     const docSnap = await getDoc(lastSeenRef)
  //     if (docSnap.exists()) {
  //       setLastSeen(docSnap.data())
  //     } else {
  //       setLastSeen(null)
  //     }
  //   }
  //   getData()
  // }, [messages])

  // Firebase hook to check if user is logged in
  const [user, loading] = useAuthState(auth)

  // React Router hook to navigate to different pages
  const navigate = useNavigate()

  // If user is not logged in, redirect to login page
  useEffect(() => {
    if (loading) return
    if (!user) navigate('/auth')
  }, [user, loading, navigate])

  // Click handlers
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const handleGroupClick = (group) => {
    setActiveGroupId(group?.id)
    setMobileOpen(false)
  }

  // If there are groups, set the active group to the first group
  if (!activeGroupId && groups?.docs?.length > 0) {
    setActiveGroupId(groups?.docs[0].id)
  }

  const userEmail = (uid) => {
    const foundUser = users?.find((checkUser) => checkUser.uid === uid)
    return foundUser?.email
  }

  const drawer = (
    <Box>
      <SidePanel
        userData={userData?.[0]}
        handleGroupClick={handleGroupClick}
        activeGroupId={activeGroupId}
        groups={groups}
        groupsloading={groupsloading}
        userDataLoading={userDataLoading}
        userEmail={userEmail}
      />
    </Box>
  )

  const drawerWidth = 240

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        alignItems: 'center'
      }}
    >
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
            userEmail={userEmail}
            setActiveGroupId={setActiveGroupId}
          />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="sidebar"
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
          width: { sm: `calc(100% - ${drawerWidth}px)`, xs: '100%' },
          maxWidth: { sm: `calc(100% - ${drawerWidth}px)`, xs: '100%' },
          overflow: 'hidden'
        }}
      >
        <Toolbar />
        <Messages
          userData={userData?.[0]}
          activeGroupId={activeGroupId}
          groups={groups}
          users={users}
          messages={messages?.docs
            ?.map((doc) => {
              return { ...doc.data(), id: doc.id }
            })
            .filter((message) => message.groupId === activeGroupId)}
        />
      </Box>
    </Box>
  )
}
