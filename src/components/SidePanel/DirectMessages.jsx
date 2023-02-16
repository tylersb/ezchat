import { db } from '../../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import NewDirectMessageModal from './NewDirectMessageModal'
import { Box, Skeleton, Typography, Button, List } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { toast } from 'react-toastify'

export default function DirectMessages({
  handleGroupClick,
  userData,
  groups,
  groupsloading,
  userEmail
}) {
  const addNewDirectMessage = async (uid) => {
    try {
      const newDirectMessage = await addDoc(collection(db, 'groups'), {
        createdAt: serverTimestamp(),
        users: [userData?.uid, uid],
        createdByUid: userData?.uid,
        type: 'directMessage'
      })
      handleGroupClick(newDirectMessage)
    } catch (err) {
      console.error(err)
      toast.error('An error occured while creating a new direct message', {
        position: 'top-center'
      })
    }
  }

  const displayDirectMessages = groups?.docs?.map((channel) => {
    const channelData = channel.data()
    if (
      channelData.type !== 'directMessage' ||
      channelData.users.find((user) => user === userData?.uid) === undefined
    )
      return null
    return (
      <Button
        onClick={() => handleGroupClick(channel)}
        style={{ cursor: 'pointer', marginLeft: '2em', display: 'block' }}
        key={channel.id}
      >
        <Typography variant="body1">
          {userEmail(channelData.users.find((user) => user !== userData?.uid))}
        </Typography>
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
