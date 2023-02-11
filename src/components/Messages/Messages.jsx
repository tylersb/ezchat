import MessageForm from './MessageForm'
import MessagesHeader from './MessagesHeader'
import { Grid, Segment, Comment, Container, Loader } from 'semantic-ui-react'
import {
  useCollection,
  useCollectionData
} from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'
import { query, collection, orderBy, where } from 'firebase/firestore'
import Message from './Message'
import { useRef, useEffect } from 'react'

export default function Messages({ userData, activeGroupId, groups }) {
  const [messages, messagesLoading, error] = useCollection(
    query(
      collection(db, 'messages'),
      orderBy('createdAt', 'desc'),
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

  if (messagesLoading) return <Loader active inline="centered" />

  if (!activeGroupId)
    return (
      <Container
        style={{ height: '100vh', width: '100vw', padding: 0, margin: 0 }}
      >
        <Grid>
          <Grid.Column>
            <Grid.Row
              style={{
                height: '7vh'
              }}
            ></Grid.Row>
            <Grid.Row
              style={{
                height: '80vh'
              }}
            >
              <Segment
                style={{
                  overflow: 'auto',
                  height: '100%'
                }}
              ></Segment>
            </Grid.Row>
            <Grid.Row
              style={{
                height: '15vh'
              }}
            ></Grid.Row>
          </Grid.Column>
        </Grid>
      </Container>
    )

  return (
    <Grid>
      <Grid.Column>
        <Grid.Row
          style={{
            height: '7vh'
          }}
        >
          <MessagesHeader
            userData={userData}
            activeGroupId={activeGroupId}
            groups={groups}
          />
        </Grid.Row>
        <Grid.Row
          style={{
            height: '80vh'
          }}
        >
          <Segment
            style={{
              overflow: 'auto',
              height: '100%'
            }}
          >
            <Comment.Group
              className="messages"
              style={{
                display: 'flex',
                flexDirection: 'column-reverse'
              }}
            >
              {displayMessages}
            </Comment.Group>
          </Segment>
        </Grid.Row>
        <Grid.Row
          style={{
            height: '15vh'
          }}
        >
          <MessageForm
            userData={userData}
            activeGroupId={activeGroupId}
            groups={groups}
          />
        </Grid.Row>
      </Grid.Column>
    </Grid>
  )
}
