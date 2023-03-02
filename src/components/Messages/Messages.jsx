import MessageForm from './MessageForm'
import Message from './Message'
import { Box, List } from '@mui/material'
import { useRef, useEffect } from 'react'

export default function Messages({ userData, activeGroupId, groups, users, messages }) {

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // useEffect(() => {
  //   if (activeGroupId && userData) {
  //     createOrUpdateLastSeen(userData.uid, activeGroupId)
  //   }
  // }, [activeGroupId, userData, messages])

  const displayMessages = messages?.map((message) => {
    return (
      <Message
        key={message.id}
        messageData={message}
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
          height: '88vh'
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
