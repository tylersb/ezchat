import { useState, useRef, useEffect } from 'react'
import {
  IconButton,
  MenuList,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  Box
} from '@mui/material'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'

export default function EmojiMenu({ message, setMessage }) {
  // State
  const [open, setOpen] = useState(false)

  // Refs
  const anchorRef = useRef(null)

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

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.native)
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
    <div
      style={{
        margin: 0,
        padding: 0,
      }}
    >
      <IconButton
        id="expand-menu"
        aria-controls={open ? 'emoji-picker' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleToggle}
      >
        <Box component="span" ref={anchorRef}>
          <EmojiEmotionsIcon />
        </Box>
      </IconButton>
      <Popper
        id="emoji-picker"
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
                  <Picker
                    set="native"
                    onEmojiSelect={handleEmojiSelect}
                    data={data}
                  />
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}
