import { useContext } from 'react'
import { IconButton, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { ColorModeContext } from './contexts/ColorModeContext'

export default function ModeToggle() {
  const theme = useTheme()
  const handleColorMode = useContext(ColorModeContext)

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
        onClick={handleColorMode.toggleColorMode}
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
