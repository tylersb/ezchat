import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Typography,
  Fade,
  DialogContent,
  Button
} from '@mui/material'

export default function ConfirmationDialog({
  openConfirm,
  handleCloseConfirm,
  handleLeaveGroup,
  title
}) {
  return (
    <Fade in={openConfirm}>
      <div>
        <Dialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          aria-describedby="confirmation-dialog-slide-description"
        >
          <DialogTitle>
            <Typography variant="subtitle">{title || 'Leave Group'}</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="confirmation-dialog-slide-description">
              You will no longer be able to see this group in your list of
              groups.
            </DialogContentText>
            <DialogActions>
              <Button variant="outlined" onClick={handleCloseConfirm}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleLeaveGroup}
              >
                Leave Group
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    </Fade>
  )
}
