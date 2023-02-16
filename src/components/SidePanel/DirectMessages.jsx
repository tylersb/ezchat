import { db } from '../../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import NewDirectMessageModal from './NewDirectMessageModal'
import { Box, Skeleton, Typography, Button, List } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

export default function DirectMessages({
  handleGroupClick,
  userData,
  groups,
  groupsloading
}) {
  const addNewDirectMessage = async (user) => {
    try {
      await addDoc(collection(db, 'groups'), {
        createdAt: serverTimestamp(),
        users: [userData?.uid,
        user.uid],
        createdByUid: userData?.uid,
        type: 'directMessage'
      })
    } catch (err) {
      console.error(err)
      alert('An error occured while creating a new channel')
    }
  }

  const displayDirectMessages = groups?.docs?.map((channel) => {
    if (
      channel._document.data.value.mapValue.fields.type.stringValue !==
      'directMessage'
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
              Direct Messages
            </Typography>
            <NewDirectMessageModal addNewDirectMessage={addNewDirectMessage} />
          </Box>
        </Box>
        <Box>
          {groupsloading ? (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          ) : (
            <List>{displayDirectMessages}</List>
          )}
        </Box>
      </Grid>
    </>
  )
}
