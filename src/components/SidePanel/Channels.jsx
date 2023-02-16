import { db } from '../../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import NewChannelModal from './NewChannelModal'
import { Box, Skeleton, Typography, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { toast } from 'react-toastify'

export default function Channels({ handleGroupClick, userData, groups }) {
  const addNewChannel = async (channel) => {
    try {
      await addDoc(collection(db, 'groups'), {
        ...channel,
        createdAt: serverTimestamp(),
        users: [userData?.uid],
        createdByUid: userData?.uid,
        type: 'channel'
      })
    } catch (err) {
      console.error(err)
      toast.error('An error occured while creating a new channel')
    }
  }

  const displayChannels = groups?.docs?.map((channel) => {
    const channelData = channel.data()
    if (channelData.type !== 'channel') return null
    return (
      <Box key={channel.id}>
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
          <Typography># {channelData.name}</Typography>
        </Button>
      </Box>
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
        <Box>{displayChannels}</Box>
      </Grid>
    </>
  )
}
