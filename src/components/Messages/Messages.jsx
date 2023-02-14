import MessageForm from './MessageForm'
import {
  useCollection,
  useCollectionData
} from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'
import { query, collection, orderBy, where } from 'firebase/firestore'
import Message from './Message'
import { Unstable_Grid2 as Grid, List } from '@mui/material'
import { useRef, useEffect } from 'react'

export default function Messages({ userData, activeGroupId, groups }) {
  const [messages, messagesLoading, error] = useCollection(
    query(
      collection(db, 'messages'),
      orderBy('createdAt'),
      where('groupId', '==', activeGroupId)
    ),
    { idField: 'id' }
  )

  const userList = groups?.docs
    ?.find((group) => group.id === activeGroupId)
    ?._document?.data?.value?.mapValue?.fields?.users?.arrayValue?.values?.map(
      (user) => user?.stringValue
    ) || [null]

  const [users, usersLoading, usersError] = useCollectionData(
    query(
      collection(db, 'users')
      // where('uid', 'in', userList)
    ),
    { idField: 'uid' }
  )

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const displayMessages = messages?.docs?.map((message) => {
    const data = message._document.data.value.mapValue.fields
    return (
      <Message
        key={message.id}
        message={data}
        userData={userData}
        users={users}
        ref={messagesEndRef}
      />
    )
  })

  return (
    <Grid container>
      <Grid xs={12}>
        <List
          sx={{
            overflow: 'auto',
            bgcolor: 'background.paper',
            height: '84vh'
          }}
        >
          {displayMessages}
        </List>
      </Grid>
      <Grid
        xs={12}
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          height: '94px',
          bgcolor: 'background.paper'
        }}
      >
        <MessageForm
          userData={userData}
          activeGroupId={activeGroupId}
          groups={groups}
        />
      </Grid>
    </Grid>
  )
}
