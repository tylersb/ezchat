import { addNewGroup } from '../../firebase'
import NewDirectMessageModal from './NewDirectMessageModal'
import { Box, Typography, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { toast } from 'react-toastify'

export default function DirectMessages({
  handleGroupClick,
  userData,
  groups,
  userEmail
}) {
  const addNewDirectMessage = async (uid) => {
    try {
      const newDirectMessage = await addNewGroup([userData?.uid, uid], userData?.uid, 'directMessage')
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
        sx={{
          cursor: 'pointer',
          marginLeft: '2em',
          display: 'block'
        }}
        key={channel.id}
        variant="text"
      >
        <Typography>
          {userEmail(channelData.users.find((user) => user !== userData?.uid))}
        </Typography>
      </Button>
    )
  })

  return (
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
      <Box>{displayDirectMessages}</Box>
    </Grid>
  )
}
