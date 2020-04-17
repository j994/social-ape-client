import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { editUserDetails } from '../../redux/actions/userActions'
import MyButton from '../../util/MyButton'

//Redux
import { useSelector, useDispatch } from 'react-redux'

//Mui
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

//Icons
import EditIcon from '@material-ui/icons/Edit'

const styles = {
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    float: 'right',
  },
}

const EditDetails = props => {
  const [bio, setBio] = useState('')
  const [website, setWebsite] = useState('')
  const [location, setLocation] = useState('')
  const [open, setOpen] = useState(false)
  const credentials = useSelector(state => state.user.credentials)
  const dispatch = useDispatch()
  const { classes } = props

  const mapUserDetailsToState = credentials => {
    if (credentials.bio) {
      setBio(credentials.bio)
    }
    if (credentials.website) {
      setWebsite(credentials.website)
    }
    if (credentials.location) {
      setLocation(credentials.location)
    }
  }

  useEffect(() => {
    mapUserDetailsToState(credentials)
  })

  const handleOpen = () => {
    setOpen(true)
    mapUserDetailsToState(credentials)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onBioChange = e => {
    setBio(e.target.value)
  }
  const onWebsiteChange = e => {
    setWebsite(e.target.value)
  }
  const onLocationChange = e => {
    setLocation(e.target.value)
  }

  const handleSubmit = () => {
    const userDetails = {
      bio: bio,
      website: website,
      location: location,
    }
    dispatch(editUserDetails(userDetails))
    handleClose()
  }

  return (
    <Fragment>
      <MyButton
        tip="Edit Details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={bio}
              onChange={onBioChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your website"
              className={classes.textField}
              value={website}
              onChange={onWebsiteChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={location}
              onChange={onLocationChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

EditDetails.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(EditDetails)
