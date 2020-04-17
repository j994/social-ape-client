import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Scream from '../components/scream/Scream'
import StaticProfile from '../components/profile/StaticProfile'
import Grid from '@material-ui/core/Grid'
import ScreamSkeleton from '../util/ScreamSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'

//Redux
import { useSelector, useDispatch } from 'react-redux'
import { getUserData } from '../redux/actions/dataActions'

const User = props => {
  const [profile, setProfile] = useState(null)
  const [screamIdParam, setScreamIdParam] = useState(null)
  const data = useSelector(state => state.data)
  const dispatch = useDispatch()
  const { screamId } = props

  useEffect(() => {
    const { handle } = props

    dispatch(getUserData(handle))
    axios
      .get(`/user/${handle}`)
      .then(res => {
        setProfile(res.data.user)
      })
      .catch(err => console.log(err))
  }, [props, dispatch])

  useEffect(() => {
    if (screamId) setScreamIdParam(screamId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const screamsMarkup = data.loading ? (
    <ScreamSkeleton />
  ) : data.screams === null ? (
    <p>No screams from this user</p>
  ) : !screamIdParam ? (
    data.screams.map(scream => (
      <Scream key={scream.screamId} scream={scream} disabled />
    ))
  ) : (
    data.screams.map(scream => {
      if (scream.screamId !== screamIdParam)
        return <Scream key={scream.screamId} scream={scream} disabled />
      else
        return (
          <Scream key={scream.screamId} scream={scream} openDialog disabled />
        )
    })
  )

  return (
    <Grid container spacing={6}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  )
}

export default User
