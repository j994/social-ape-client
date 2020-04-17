import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from '@reach/router'
import dayjs from 'dayjs'
import EditDetails from './EditDetails'
import MyButton from '../../util/MyButton'
import ProfileSkeleton from '../../util/ProfileSkeleton'

//Mui
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import MuiLink from '@material-ui/core/Link'

//icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

//Redux
import { useSelector, useDispatch } from 'react-redux'
import { uploadImage, logoutUser } from '../../redux/actions/userActions'

const styles = {
  paper: {
    padding: 20,
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%',
      },
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle',
      },
      '& a': {
        color: '#00bcd4',
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0',
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px',
    },
  },
}

const Profile = props => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const { classes } = props

  const handleImageChange = e => {
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('image', image, image.name)
    dispatch(uploadImage(formData))
  }

  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  let profileMarkup = !user.loading ? (
    user.authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img
              src={user.credentials.imageUrl}
              alt="profile"
              className="profile-image"
            />
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={handleImageChange}
            />
            <MyButton
              tip="Edit profile picture"
              onClick={handleEditPicture}
              btnClassName="button"
            >
              <EditIcon color="primary" />
            </MyButton>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${user.credentials.handle}`}
              color="primary"
              varient="h5"
            >
              @{user.credentials.handle}
            </MuiLink>
            <hr />
            {user.credentials.bio && (
              <Typography variant="body2">{user.credentials.bio}</Typography>
            )}
            <hr />
            {user.credentials.location && (
              <Fragment>
                <LocationOn color="primary" />
                <span>{user.credentials.location}</span>
                <hr />
              </Fragment>
            )}
            {user.credentials.website && (
              <Fragment>
                <LinkIcon color="primary" />
                <a
                  href={user.credentials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  {user.credentials.website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary" />{' '}
            <span>
              Joined {dayjs(user.credentials.createdAt).format('MMM YYYY')}
            </span>
          </div>
          <MyButton tip="Logout" onClick={handleLogout}>
            <KeyboardReturn color="primary" />
          </MyButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <ProfileSkeleton />
  )

  return profileMarkup
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Profile)
