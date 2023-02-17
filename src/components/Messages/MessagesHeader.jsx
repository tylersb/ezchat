import { Typography, Box, Skeleton } from '@mui/material'
import ChannelMenu from '../ChannelMenu'
import { useRef } from 'react'

export default function MessagesHeader({
  userData,
  activeGroupId,
  groups,
  userEmail
}) {
  const anchorRef = useRef(null)


  const groupData = groups?.docs
    ?.find((group) => group.id === activeGroupId)
    ?.data()
  const totalMembers = groupData?.users?.length || 0

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}
    >
      {!groups ? (
        <Skeleton variant="rectangular" width={210} height={'100%'} />
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Box
          component="span"
          ref={anchorRef}
          >
          <Typography variant="h6">
            {groupData?.type === 'channel'
              ? groupData.name
              : 'Chat with ' +
                userEmail(
                  groupData?.users?.find((user) => user !== userData?.uid)
                )}
          </Typography>
          </Box>
          <ChannelMenu userData={userData} groupData={groupData} 
          anchorRef={anchorRef}
          />
        </Box>
      )}
      <Typography variant="subtitle2">{totalMembers} Users</Typography>
    </Box>
  )
}
