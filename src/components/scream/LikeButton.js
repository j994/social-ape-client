import React from 'react'
import MyButton from '../../util/MyButton'
import { Link } from '@reach/router'

import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

import { useSelector, useDispatch } from 'react-redux'
import { likeScream, unlikeScream } from '../../redux/actions/dataActions'

const LikeButton = props => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const { screamId } = props

  const likedScream = () => {
    if (user.likes && user.likes.find(like => like.screamId === screamId)) {
      return true
    } else return false
  }

  const handleLikeScream = () => {
    dispatch(likeScream(screamId))
  }

  const handleUnlikeScream = () => {
    dispatch(unlikeScream(screamId))
  }

  const likeButton = !user.authenticated ? (
    <Link to="/login">
      <MyButton tip="like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedScream() ? (
    <MyButton tip="Unlike" onClick={handleUnlikeScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={handleLikeScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  )
  return likeButton
}

export default LikeButton
