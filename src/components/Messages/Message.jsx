import moment from 'moment'
import { useRef, useEffect } from 'react'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography
} from '@mui/material'

export default function Message({ message, userData, users }) {
  const timeStamp = moment(message?.createdAt?.timestampValue).format('h:mm A')

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [message])

  const userInfo = users?.find(
    (user) => user?.uid === message?.uid?.stringValue
  )

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
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
        />
      </ListItem>
    </List>
  )
}
