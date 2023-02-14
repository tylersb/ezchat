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
import { Box, Skeleton, Stack, Divider } from '@mui/material'

export default function Dashboard() {
  const [activeGroupId, setActiveGroupId] = useState('')
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

  const [user, loading] = useAuthState(auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (!user) return navigate('/auth')
  }, [user, loading, navigate])

  const handleGroupClick = (group) => {
    setActiveGroupId(group?.id)
  }

  if (!activeGroupId && groups?.docs?.length > 0) {
    setActiveGroupId(groups?.docs[0].id)
  }

  return (
    <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}  >
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

      <Messages
        userData={userData?.[0]}
        activeGroupId={activeGroupId}
        groups={groups}
      />
    </Stack>

    // <Box
    //   sx={{
    //     display: 'flex',
    //     flexDirection: 'row',
    //     height: '100vh',
    //     width: '100vw',
    //     padding: 0,
    //     margin: 0,
    //     overflow: 'hidden'
    //   }}
    // >
    //   <Box sx={{ width: '20%' }}>
    //     {loading ? (
    //       <Skeleton variant="rectangular" width={210} height={118} />
    //     ) : (
    //       <SidePanel
    //         userData={userData?.[0]}
    //         handleGroupClick={handleGroupClick}
    //         activeGroupId={activeGroupId}
    //         groups={groups}
    //         groupsloading={groupsloading}
    //         userDataLoading={userDataLoading}
    //       />
    //     )}
    //   </Box>
    //   <Box sx={{ width: '80%' }}>
    //     <Messages
    //       userData={userData?.[0]}
    //       activeGroupId={activeGroupId}
    //       groups={groups}
    //     />
    //   </Box>
    // </Box>
  )
}
