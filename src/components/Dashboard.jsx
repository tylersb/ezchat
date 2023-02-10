import { useEffect, useState, useCallback } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { auth, db, logout } from '../firebase'
import { query, collection, getDocs, where } from 'firebase/firestore'
import SidePanel from './SidePanel/SidePanel'
import Messages from './Messages/Messages'
import MetaPanel from './MetaPanel/MetaPanel'
import { Grid } from 'semantic-ui-react'

export default function Dashboard() {
  const [name, setName] = useState('')

  const [user, loading] = useAuthState(auth)

  const navigate = useNavigate()

  const fetchUserName = useCallback(async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid))
      const doc = await getDocs(q)
      const data = doc.docs[0].data()
      setName(data.name)
    } catch (err) {
      console.error(err)
      alert('An error occured while fetching user data')
    }
  }, [user])

  useEffect(() => {
    if (loading) return
    if (!user) return navigate('/login')
    fetchUserName()
  }, [user, loading, navigate, fetchUserName])

  return (
    <Grid columns="equal" className="app" style={{ background: '#eee' }}>
      <SidePanel user={user} />
      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages user={user} />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  )
}
