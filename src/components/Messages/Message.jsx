import moment from 'moment'
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Dialog,
  Slide,
  Skeleton
} from '@mui/material'
import { forwardRef, useState } from 'react'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default forwardRef(function Message({ messageData, users }, ref) {
  const [open, setOpen] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const timeStamp = moment(
    messageData?.createdAt?.toDate(
      messageData?.createdAt?.seconds * 1000
    )
  ).format('llll')

  const userInfo = users?.find(
    (user) => user?.uid === messageData?.uid
  )

  const isImage = messageData?.type === 'image'
  const isText = messageData?.type === 'text'
  const isGif = messageData?.type === 'gif'

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
          <Box>
            {isText && (
              <Typography
                sx={{ display: 'inline-block', wordBreak: 'break-word' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {messageData?.content}
              </Typography>
            )}
            {isImage && (
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  wordBreak: 'break-word',
                  maxWidth: '500px',
                  maxHeight: '500px'
                }}
                onClick={handleClickOpen}
              >
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: '500px',
                    height: '500px',
                    display: imageLoading ? 'block' : 'none'
                  }}
                />
                <img
                  loading="lazy"
                  src={messageData?.content}
                  alt={`uploaded by ${userInfo?.name}`}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  onLoad={() => setImageLoading(false)}
                  display={imageLoading ? 'none' : 'block'}
                />
              </Box>
            )}
            {isGif && (
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  wordBreak: 'break-word',
                  maxWidth: messageData?.content?.width,
                  maxHeight: messageData?.content?.height
                }}
                onClick={handleClickOpen}
              >
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: messageData?.content?.width,
                    height: messageData?.content?.height,
                    display: imageLoading ? 'block' : 'none'
                  }}
                />
                <img
                  loading="lazy"
                  src={messageData?.content?.url}
                  alt={`uploaded by ${userInfo?.name}`}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  onLoad={() => setImageLoading(false)}
                  display={imageLoading ? 'none' : 'block'}
                />
              </Box>
            )}
          </Box>
        }
        ref={ref}
      />

      {isImage && (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="lg"
        >
          <img
            loading="lazy"
            src={messageData?.content}
            alt={`uploaded by ${userInfo?.name}`}
          />
        </Dialog>
      )}
      {isGif && (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="lg"
        >
          <img
            loading="lazy"
            src={messageData?.content}
            alt={`uploaded by ${userInfo?.name}`}
          />
        </Dialog>
      )}
    </ListItem>
  )
})
