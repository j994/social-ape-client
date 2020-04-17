import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from '@reach/router'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import LikeButton from './LikeButton'
import MyButton from '../../util/MyButton'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'

//Mui
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

//Icons
import ChatIcon from '@material-ui/icons/Chat'

//Redux
import { useSelector } from 'react-redux'

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
}

const Scream = props => {
  const user = useSelector(state => state.user)
  const {
    classes,
    openDialog,
    disabled,
    scream: {
      body,
      createdAt,
      userImage,
      userHandle,
      screamId,
      likeCount,
      commentCount,
    },
  } = props

  dayjs.extend(relativeTime)

  const deleteButton =
    user.authenticated && userHandle === user.credentials.handle ? (
      <DeleteScream screamId={screamId} />
    ) : null

  const userLink = disabled ? (
    <Typography variant="h5" color="primary">
      {userHandle}
    </Typography>
  ) : (
    <Typography variant="h5" color="primary">
      <Link to={`users/${userHandle}`}>{userHandle}</Link>
    </Typography>
  )

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile Image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        {userLink}
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} likes</span>
        <MyButton tip="Comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
        <ScreamDialog
          screamId={screamId}
          userHandle={userHandle}
          openDialog={openDialog}
        />
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(Scream)
