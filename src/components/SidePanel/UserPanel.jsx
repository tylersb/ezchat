import {
  Menu,
  Tooltip,
  Box,
  Avatar,
  Typography,
  Button,
  IconButton
} from '@mui/material'
import { useState } from 'react'

export default function UserPanel({ userData, handleLogout }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Tooltip title="User Menu">
        <IconButton
          onClick={handleClick}
          sx={{
            color: 'white',
            padding: 0,
            margin: 0,
            '&:hover': {
              backgroundColor: 'transparent'
            }
          }}
        >
          <Avatar src={userData?.avatar}>
            {userData?.displayName?.charAt(0)}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={userData?.avatar} />
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
              <Typography variant="body1">{userData?.displayName}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {userData?.email}
              </Typography>
            </Box>
          </Box>
          <Button variant="contained" sx={{ mt: 1 }} onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  )
}
