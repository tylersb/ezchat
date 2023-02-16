import moment from 'moment'
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box
} from '@mui/material'
import { forwardRef } from 'react'

export default forwardRef(function Message({ message, userData, users }, ref) {
  const timeStamp = moment(message?.createdAt?.timestampValue).format('llll')

  const userInfo = users?.find(
    (user) => user?.uid === message?.uid?.stringValue
  )

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={userInfo?.name} src={userInfo?.avatar} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {userInfo?.name}
            </Typography>
            <Typography
              sx={{ display: 'inline', marginLeft: '5px' }}
              component="span"
              variant="caption"
              color="text.secondary"
            >
              {timeStamp}
            </Typography>
          </>
        }
        secondary={
            <Typography
              sx={{ display: 'inline-block', wordBreak: 'break-word' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {message?.content.stringValue}
            </Typography>
        }
        ref={ref}
      />
    </ListItem>
  )
})
