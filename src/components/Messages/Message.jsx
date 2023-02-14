import moment from 'moment'
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography
} from '@mui/material'
import { forwardRef } from 'react'

export default forwardRef(function Message({ message, userData, users }, ref) {
  const timeStamp = moment(message?.createdAt?.timestampValue).format('h:mm A')

  const userInfo = users?.find(
    (user) => user?.uid === message?.uid?.stringValue
  )

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={userInfo?.name} src={userInfo?.avatar} />
      </ListItemAvatar>
      <ListItemText
        primary={userInfo?.name}
        secondary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {message?.content.stringValue}
            </Typography>
            {timeStamp}
          </>
        }
        ref={ref}
      />
    </ListItem>
  )
})
