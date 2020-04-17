import React, { Fragment, useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../../util/MyButton'
import dayjs from 'dayjs'
import { Link } from '@reach/router'
import LikeButton from './LikeButton'
import Comments from './Comments'
import CommentForm from './CommentForm'
//Mui
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

//Icons
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import ChatIcon from '@material-ui/icons/Chat'

//Redux
import { useSelector, useDispatch } from 'react-redux'
import { getScream, clearErrors } from '../../redux/actions/dataActions'

const styles = {
  invisibleSeparator: {
    border: 'none',
    margin: 4,
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20,
  },
}

const ScreamDialog = props => {
  const scream = useSelector(state => state.data.scream)
  const UI = useSelector(state => state.UI)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [oldPath, setOldPath] = useState('')
  const { screamId, userHandle, classes, openDialog } = props

  useEffect(() => {
    if (openDialog) handleOpen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpen = () => {
    let oldPath = window.location.pathname
    const newPath = `/users/${userHandle}/scream/${screamId}`

    if (oldPath === newPath) oldPath = `/users/${userHandle}`

    window.history.pushState(null, null, newPath)
    setOpen(true)
    setOldPath(oldPath)
    dispatch(getScream(screamId))
  }
  const handleClose = () => {
    window.history.pushState(null, null, oldPath)
    setOpen(false)
    dispatch(clearErrors())
  }

  const dialogMarkup = UI.loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} />
    </div>
  ) : (
    <Grid container spacing={5}>
      <Grid item sm={5}>
        <img
          src={scream.userImage}
          alt="Profile"
          className={classes.profileImage}
        />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${scream.userHandle}`}
        >
          @{scream.userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(scream.createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{scream.body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{scream.likeCount} likes</span>
        <MyButton tip="Comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{scream.commentCount} comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm screamId={screamId} />
      <Comments comments={scream.comments} />
    </Grid>
  )

  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tip="Expand Scream"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default withStyles(styles)(ScreamDialog)
