import { useState, forwardRef, useEffect } from 'react'
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Unstable_Grid2 as Grid,
  TextField,
  Container
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { editGroup, deleteGroup } from '../firebase'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function EditChannelInterface({
  openEdit,
  setOpenEdit,
  groupData,
  activeGroupId,
  setActiveGroupId
}) {
  const [channelDetails, setChannelDetails] = useState({
    name: '',
    description: ''
  })

  useEffect(() => {
    setChannelDetails({
      name: groupData?.name,
      description: groupData?.description
    })
  }, [groupData])

  const handleClose = () => {
    setOpenEdit(false)
  }

  const handleEditGroup = async () => {
    try {
      await editGroup(activeGroupId, channelDetails)
      setOpenEdit(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteGroup = async () => {
    try {
      setOpenEdit(false)
      setChannelDetails({
        name: '',
        description: ''
      })
      await deleteGroup(activeGroupId)
      setActiveGroupId('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Dialog
        // fullScreen
        open={openEdit}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit Channel
            </Typography>
            <Button color="inherit" onClick={handleEditGroup}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Container
          maxWidth="sm"
          sx={{
            py: 4,
            px: 2
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="channelName"
                name="channelName"
                label="Channel Name"
                fullWidth
                autoComplete="channel-name"
                value={channelDetails.name}
                onChange={(e) =>
                  setChannelDetails({
                    ...channelDetails,
                    name: e.target.value
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="channelDescription"
                name="channelDescription"
                label="Channel Description"
                fullWidth
                autoComplete="channel-description"
                value={channelDetails.description}
                onChange={(e) =>
                  setChannelDetails({
                    ...channelDetails,
                    description: e.target.value
                  })
                }
              />
            </Grid>
          </Grid>
        </Container>
        <Button
          variant="contained"
          color="error"
          onClick={() => deleteGroup(activeGroupId)}
        >
          Delete Channel
        </Button>
      </Dialog>
    </div>
  )
}
