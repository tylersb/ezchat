import NewChannelModal from './NewChannelModal'
import { Box, Typography, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

export default function Channels({ handleGroupClick, userData, groups }) {
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
          <NewChannelModal 
          userData={userData}
          />
        </Box>
      </Box>
      <Box>{displayChannels}</Box>
    </Grid>
  )
}
