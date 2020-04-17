import React, { Fragment, useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../../util/MyButton'
import { postScream, clearErrors } from '../../redux/actions/dataActions'

//Mui
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'

//Icons
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
//Redux
import { useSelector, useDispatch } from 'react-redux'

const styles = {
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10,
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%',
  },
  textField: {
    margin: '10px auto 10px auto',
  },
}

const PostScream = props => {
  const UI = useSelector(state => state.UI)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState({})
  const { classes } = props

  useEffect(() => {
    setErrors(UI.errors)
    if (!UI.errors && !UI.loading) {
      setBody('')
      setOpen(false)
      setErrors({})
    }
  }, [UI.errors, UI.loading])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    dispatch(clearErrors())
    setOpen(false)
    setErrors({})
  }
  const handleChange = e => {
    setBody(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault()
    dispatch(postScream({ body: body }))
  }

  return (
    <Fragment>
      <MyButton onClick={handleOpen} tip="Post a Scream!">
        <AddIcon />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new Scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREAM!!"
              multiline
              rows="3"
              placeholder="What do you want to scream??"
              error={errors && errors.body ? true : false}
              helperText={errors && errors.body ? errors.body : null}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={UI.loading}
            >
              Submit
              {UI.loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default withStyles(styles)(PostScream)
