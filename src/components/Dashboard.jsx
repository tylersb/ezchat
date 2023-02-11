import { useEffect, useState, useCallback } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { query, collection, getDocs, where } from 'firebase/firestore'
import SidePanel from './SidePanel/SidePanel'
import Messages from './Messages/Messages'
import { Grid, Container, Segment, Loader } from 'semantic-ui-react'
import { useCollection } from 'react-firebase-hooks/firestore'

export default function Dashboard() {
  const [userData, setUserData] = useState('')
  const [activeGroupId, setActiveGroupId] = useState('')
  const [groups, groupsloading, error] = useCollection(
    query(
      collection(db, 'groups'),
      where('users', 'array-contains', auth.currentUser?.uid || null),
    ),
    { idField: 'id' }
  )

  const [user, loading] = useAuthState(auth)

  const navigate = useNavigate()

  const fetchUserData = useCallback(async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid))
      const doc = await getDocs(q)
      const data = doc.docs[0].data() || null
      setUserData(data)
    } catch (err) {
      console.error(err)
      alert('An error occured while fetching user data')
    }
  }, [user])

  useEffect(() => {
    if (loading) return
    if (!user) return navigate('/login')
    fetchUserData()
  }, [user, loading, navigate, fetchUserData])

  if (loading) return <Loader active inline="centered" />

  const handleGroupClick = (group) => {
    setActiveGroupId(group.id)
  }

  if (!activeGroupId && groups?.docs?.length > 0) {
    setActiveGroupId(groups.docs[0].id)
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
            userData={userData}
            handleGroupClick={handleGroupClick}
            activeGroupId={activeGroupId}
            groups={groups}
          />
        </Grid.Column>
        <Grid.Column width={14}>
          <Segment>
            <Messages
              userData={userData}
              activeGroupId={activeGroupId}
              groups={groups}
            />
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  )
}
