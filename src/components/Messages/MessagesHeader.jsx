import { Typography, Box } from '@mui/material'

export default function MessagesHeader({ userData, activeGroupId, groups }) {
  const totalMembers = groups?.docs?.find((group) => group.id === activeGroupId)
    ?._document?.data?.value?.mapValue?.fields?.members?.arrayValue?.values
    ?.length

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '10%',
        backgroundColor: 'white',
        padding: 1
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          padding: 1
        }}
      >
        <Typography variant="h6">
          {
            groups?.docs?.find((group) => group.id === activeGroupId)?._document
              ?.data?.value?.mapValue?.fields?.name?.stringValue
          }
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          padding: 1
        }}
      >
        <Typography variant="h6">{totalMembers}</Typography>
      </Box>
    </Box>
  )
}
