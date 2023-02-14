import { Typography, Box } from '@mui/material'

export default function MessagesHeader({ userData, activeGroupId, groups }) {
  const totalMembers = groups?.docs?.find((group) => group.id === activeGroupId)
    ?._document?.data?.value?.mapValue?.fields?.users?.arrayValue?.values
    ?.length || 0

  return (
    <Box>
      <Typography variant="h6">
        {
          groups?.docs?.find((group) => group.id === activeGroupId)?._document
            ?.data?.value?.mapValue?.fields?.name?.stringValue
        }
      </Typography>
      <Typography variant="subtitle2"
      >{totalMembers} Users</Typography>
    </Box>
  )
}
