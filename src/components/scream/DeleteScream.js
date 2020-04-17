import React, { Fragment, useState } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../../util/MyButton'

//Mui
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DeleteOutline from '@material-ui/icons/DeleteOutline'

//Redux
import { deleteScream } from '../../redux/actions/dataActions'
import { useDispatch } from 'react-redux'

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%',
  },
}

const DeleteScream = props => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const { classes, screamId } = props

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClosed = () => {
    setOpen(false)
  }

  const handledeleteScream = () => {
    dispatch(deleteScream(screamId))
    setOpen(false)
  }
  return (
    <Fragment>
      <MyButton
        tip="Delete Scream"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog open={open} onClose={handleClosed} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure??</DialogTitle>
        <DialogActions>
          <Button onClick={handleClosed} color="primary">
            Cancel
          </Button>
          <Button onClick={handledeleteScream} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default withStyles(styles)(DeleteScream)
