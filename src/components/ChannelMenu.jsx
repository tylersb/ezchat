import { useState, useRef, useEffect } from 'react'
import {
  IconButton,
  MenuList,
  MenuItem,
  ListItemIcon,
  Typography,
  Popper,
  Grow,
  Paper,
  ClickAwayListener
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { leaveGroup } from '../firebase'
import ConfirmationDialog from './ConfirmationDialog'
import EditChannelInterface from './EditChannelInterface'

export default function ChannelMenu({
  userData,
  groupData,
  anchorRef,
  activeGroupId,
  setActiveGroupId
}) {
  // State
  const [open, setOpen] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)

  // Event handlers
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const handleCloseConfirm = () => {
    setOpenConfirm(false)
  }

  const handleLeaveGroup = async () => {
    try {
      await leaveGroup(activeGroupId, userData.uid)
      setOpenConfirm(false)
      setActiveGroupId('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpenConfirm = () => {
    setOpenConfirm(true)
    setOpen(false)
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open, anchorRef])

  return (
    <div>
      <ConfirmationDialog
        openConfirm={openConfirm}
        handleCloseConfirm={handleCloseConfirm}
        handleLeaveGroup={handleLeaveGroup}
        title="Are you sure you want to leave this group?"
      />
      <IconButton
        id="expand-menu"
        aria-controls={open ? 'channel-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleToggle}
      >
        <ExpandMoreIcon />
      </IconButton>
      <Popper
        id="channel-menu"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-start"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <EditChannelInterface
                    handleCloseMenu={handleClose}
                    groupData={groupData}
                  />
                  <MenuItem onClick={handleClose}></MenuItem>
                  <MenuItem onClick={handleOpenConfirm}>
                    <ListItemIcon>
                      <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Leave Channel</Typography>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}
