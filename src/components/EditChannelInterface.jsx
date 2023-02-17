import { useState, forwardRef } from 'react'
import {
  Button,
  Dialog,
  MenuItem,
  ListItemIcon,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Container
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import CloseIcon from '@mui/icons-material/Close'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function EditChannelInterface({ handleCloseMenu, groupData }) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
    handleCloseMenu()
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Edit Channel</Typography>
      </MenuItem>
      <Dialog
        fullScreen
        open={open}
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
            <Button color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
          <h1>Edit Channel</h1>
          <p>Channel Name: {groupData.name}</p>
          <p>Channel Description: {groupData.description}</p>
        </Container>
      </Dialog>
    </div>
  )
}
