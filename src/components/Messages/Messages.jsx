import MessageForm from './MessageForm'
import MessagesHeader from './MessagesHeader'
import {
  useCollection,
  useCollectionData
} from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'
import { query, collection, orderBy, where } from 'firebase/firestore'
import Message from './Message'
import { Grid, Unstable_Grid2, Box, Skeleton, List } from '@mui/material'

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        padding: 0,
        margin: 0,
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          height: '7vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
      >
        <MessagesHeader
          userData={userData}
          activeGroupId={activeGroupId}
          groups={groups}
        />
      </Box>
      <Box
        sx={{
          height: '80vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column-reverse',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            overflow: 'auto'
          }}
        >
          <List>{displayMessages}</List>
        </Box>
      </Box>
      <Box
        sx={{
          height: '5vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
      >
        <MessageForm
          userData={userData}
          activeGroupId={activeGroupId}
          groups={groups}
        />
      </Box>
    </Box>
    // <Unstable_Grid2
    //   sx={{
    //     height: '100vh',
    //     width: '100vw',
    //     padding: 0,
    //     margin: 0,
    //     overflow: 'hidden'
    //   }}
    //   container
    //   direction="column"
    // >
    //   <Grid
    //     sx={{
    //       height: '7vh',
    //       width: '100vw',
    //       display: 'flex',
    //       flexDirection: 'row',
    //       justifyContent: 'flex-start',
    //       alignItems: 'center'
    //     }}
    //     item
    //   >

    // <Container
    //   style={{ height: '100vh', width: '100vw', padding: 0, margin: 0 }}
    // >
    //   <Grid>
    //     <Grid.Column
    //       style={{
    //         height: '100vh',
    //         width: '100vw'
    //       }}
    //     >
    //       <Grid.Row
    //         style={{
    //           height: '7vh'
    //         }}
    //       >
    //         <MessagesHeader
    //           userData={userData}
    //           activeGroupId={activeGroupId}
    //           groups={groups}
    //           style={{
    //             height: '7vh'
    //           }}
    //         />
    //       </Grid.Row>
    //       <Grid.Row
    //         style={{
    //           height: '80vh'
    //         }}
    //       >
    //         <Segment
    //           style={{
    //             overflow: 'auto',
    //             height: '100%',
    //             display: 'flex',
    //             flexDirection: 'column-reverse'
    //           }}
    //         >
    //           <Comment.Group className="messages">
    //             {displayMessages}
    //           </Comment.Group>
    //         </Segment>
    //       </Grid.Row>
    //       <Grid.Row
    //         style={{
    //           height: '5vh'
    //         }}
    //       >
    //         <MessageForm
    //           userData={userData}
    //           activeGroupId={activeGroupId}
    //           groups={groups}
    //         />
    //       </Grid.Row>
    //     </Grid.Column>
    //   </Grid>
    // </Container>
  )
}
