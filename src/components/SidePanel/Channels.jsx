import { db } from '../../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import NewChannelModal from './NewChannelModal'
import { Box, Skeleton, Typography, Button, List } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

export default function Channels({
  handleGroupClick,
  activeGroupId,
  userData,
  groups,
  groupsloading
}) {
  const addNewChannel = async (channel) => {
    try {
      await addDoc(collection(db, 'groups'), {
        ...channel,
        createdAt: serverTimestamp(),
        members: [userData?.uid],
        createdByUid: userData?.uid,
        type: 'channel'
      })
    } catch (err) {
      console.error(err)
      alert('An error occured while creating a new channel')
    }
  }

  const displayChannels = groups?.docs?.map((channel) => {
    if (
      channel._document.data.value.mapValue.fields.type.stringValue !==
      'channel'
    )
      return null
    return (
      <Button
        onClick={() => handleGroupClick(channel)}
        style={{ cursor: 'pointer', marginLeft: '2em', display: 'block' }}
        active={channel.id === activeGroupId}
        key={channel.id}
      >
        # {channel._document.data.value.mapValue.fields.name.stringValue}
      </Button>
    )
  })

  return (
    <>
      <Grid>
        <Box sx={{ width: '20%' }}>
          <Box sx={{ height: '20%' }}>
            <Typography variant="h6" sx={{ marginLeft: '1em' }}>
              Channels
            </Typography>
          </Box>
          <Box>
            <NewChannelModal addNewChannel={addNewChannel} />
          </Box>
        </Box>
        <Box sx={{ width: '80%' }}>
          <Box sx={{ height: '20%' }}></Box>
          <Box>
            {groupsloading ? (
              <Skeleton variant="rectangular" width={210} height={118} />
            ) : (
              <List animated divided verticalAlign="middle">
                {displayChannels}
              </List>
            )}
          </Box>
        </Box>
      </Grid>

      {/* <Header as="h4" style={{ display: 'inline' }}>
        Channels
      </Header>
      <NewChannelModal addNewChannel={addNewChannel} /> */}

      {/* <Grid verticalAlign="middle">
        <Grid.Row
          style={{ padding: '0', height: '1.5em', marginBottom: '.4em' }}
        >
          <Grid.Column floated="left">
            <Icon
              name="caret down"
              size="med"
              style={{
                cursor: 'pointer',
                marginLeft: '2em',
                display: 'inline'
              }}
            />
            <Header as="h4" style={{ display: 'inline' }}>
              Channels
            </Header>
          </Grid.Column>
          <Grid.Column floated="right">
            <NewChannelModal
              addNewChannel={addNewChannel}
              style={{ height: '1.5em' }}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {groupsloading ? (
        <Loader active inline="centered" />
      ) : (
        <List animated divided verticalAlign="middle">
          {displayChannels}
        </List>
      )} */}
    </>
  )
}
