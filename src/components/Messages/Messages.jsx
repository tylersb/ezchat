import MessageForm from './MessageForm'
import MessagesHeader from './MessagesHeader'
import {
  useCollection,
  useCollectionData
} from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'
import { query, collection, orderBy, where } from 'firebase/firestore'
import Message from './Message'
import { Stack, Box } from '@mui/material'

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

  const displayMessages = messages?.docs?.map((message) => {
    const data = message._document.data.value.mapValue.fields
    return (
      <Message
        key={message.id}
        message={data}
        userData={userData}
        users={users}
      />
    )
  })

  return (
    <Box>
      <Stack direction="column">
        <MessagesHeader
          userData={userData}
          activeGroupId={activeGroupId}
          groups={groups}
        />
        <Box flex={1} overflow="auto"
        >
          {displayMessages}
        </Box>
        <MessageForm
          userData={userData}
          activeGroupId={activeGroupId}
          groups={groups}
        />
      </Stack>
    </Box>
  )
}
