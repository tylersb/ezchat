import { useEffect, useState, useCallback } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { auth, db, logout } from '../firebase'
import { query, collection, getDocs, where } from 'firebase/firestore'
import SidePanel from './SidePanel/SidePanel'
import Messages from './Messages/Messages'
import MetaPanel from './MetaPanel/MetaPanel'
import { Grid } from 'semantic-ui-react'
import Loading from './Loading'

export default function Dashboard() {
  const [userData, setUserData] = useState('')

  const [user, loading] = useAuthState(auth)

  const navigate = useNavigate()

  const fetchUserData = useCallback(async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid))
      const doc = await getDocs(q)
      const data = doc.docs[0].data()
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

  if (loading) return <Loading length={Array(10).fill(1)} />

  return (
    <Grid columns="equal" className="app" style={{ background: '#eee' }}>
      <SidePanel userData={userData} />
      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages userData={userData} />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel userData={userData}/>
      </Grid.Column>
    </Grid>
  )
}
