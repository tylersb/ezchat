import MessageForm from './MessageForm'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'
import { query, collection, orderBy, where } from 'firebase/firestore'
import Message from './Message'
import { Box, List } from '@mui/material'
import { useRef, useEffect } from 'react'

export default function Messages({ userData, activeGroupId, groups, users }) {
  const [messages] = useCollection(
    query(
      collection(db, 'messages'),
      orderBy('createdAt'),
      where('groupId', '==', activeGroupId)
    ),
    { idField: 'id' }
  )

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const displayMessages = messages?.docs?.map((message) => {
    const messageData = message.data()
    return (
      <Message
        key={message.id}
        messageData={messageData}
        users={users}
        ref={messagesEndRef}
      />
    )
  })

  return (
    <Box>
      <List
        sx={{
          overflow: 'auto',
          bgcolor: 'background.paper',
          height: '84vh'
        }}
      >
        {displayMessages}
      </List>
      <MessageForm
        userData={userData}
        activeGroupId={activeGroupId}
        groups={groups}
      />
    </Box>
  )
}
