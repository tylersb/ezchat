import { Typography, Box } from '@mui/material'
import { Skeleton } from '@mui/material'

export default function MessagesHeader({
  userData,
  activeGroupId,
  groups,
  userEmail
}) {
  const groupData = groups?.docs
    ?.find((group) => group.id === activeGroupId)
    .data()
  const totalMembers = groupData?.users?.length || 0

  return (
    <Box>
      {!groups ? (
        <Skeleton variant="rectangular" 
          width={210} height={'100%'}
        />
      ) : (
        <>
          <Typography variant="h6">
            {groupData?.type === 'channel'
              ? groupData.name
              : 'Chat with ' +
                userEmail(
                  groupData?.users?.find((user) => user !== userData?.uid)
                )}
          </Typography>
          <Typography variant="subtitle2">{totalMembers} Users</Typography>
        </>
      )}
    </Box>
  )
}
