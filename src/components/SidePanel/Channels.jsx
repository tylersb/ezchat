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
        key={channel.id}
      >
        # {channel._document.data.value.mapValue.fields.name.stringValue}
      </Button>
    )
  })

  return (
    <>
      <Grid>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Typography variant="h6" sx={{ marginLeft: '1em' }}>
              Channels
            </Typography>
            <NewChannelModal addNewChannel={addNewChannel} />
          </Box>
        </Box>
        <Box>
          {groupsloading ? (
            <Skeleton variant="rectangular" width={210} height={118} />
          ) : (
            <List>
              {displayChannels}
            </List>
          )}
        </Box>
      </Grid>
    </>
  )
}
