import { useState } from 'react'
import { SwipeableDrawer, Button } from '@mui/material'

export default function MetaPanelDrawer({ groupData }) {
  const [open, setOpen] = useState(false)

  const toggleDrawer = (open) => (event) => {
    setOpen(open)
  }

  return (
    <>
      <Button onClick={toggleDrawer(true)}>Open Right</Button>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div>Drawer</div>
      </SwipeableDrawer>
    </>
  )
}
