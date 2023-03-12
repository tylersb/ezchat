import { useContext } from 'react'
import { IconButton, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { ColorModeContext } from './contexts/ColorModeContext'
import { saveUserTheme } from '../firebase'

export default function ModeToggle() {
  const theme = useTheme()
  const handleColorMode = useContext(ColorModeContext)

  const handleToggle = () => {
    handleColorMode.toggleColorMode()
    if (theme.palette.mode === 'dark') {
      saveUserTheme('light')
    } else {
      saveUserTheme('dark')
    }
  }


  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1
      }}
    >
      <IconButton
        sx={{ ml: 1 }}
        onClick={handleToggle}
        color="inherit"
      >
        {theme.palette.mode === 'dark' ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  )
}
