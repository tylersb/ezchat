import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { query, collection, where } from 'firebase/firestore'
import SidePanel from './SidePanel/SidePanel'
import Messages from './Messages/Messages'
import { Grid, Container, Segment, Loader } from 'semantic-ui-react'
import {
  useCollection,
  useCollectionData
} from 'react-firebase-hooks/firestore'

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
    if (!user) return navigate('/login')
  }, [user, loading, navigate])

  if (loading) return <Loader active inline="centered" />

  const handleGroupClick = (group) => {
    setActiveGroupId(group?.id)
  }

  if (!activeGroupId && groups?.docs?.length > 0) {
    setActiveGroupId(groups?.docs[0].id)
  }

  return (
    <Container
      style={{
        height: '100vh',
        width: '100vw',
        padding: 0,
        margin: 0,
        overflow: 'hidden'
      }}
    >
      <Grid columns={2} width={16}>
        <Grid.Column width={2}>
          <SidePanel
            userData={userData?.[0]}
            handleGroupClick={handleGroupClick}
            activeGroupId={activeGroupId}
            groups={groups}
            groupsloading={groupsloading}
            userDataLoading={userDataLoading}
          />
        </Grid.Column>
        <Grid.Column width={14}>
          <Segment>
            <Messages
              userData={userData?.[0]}
              activeGroupId={activeGroupId}
              groups={groups}
            />
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  )
}
