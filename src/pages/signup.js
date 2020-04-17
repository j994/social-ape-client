import React, { useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/face_monkey.png'
import { Link } from '@reach/router'

//Mui
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

//Redux
import { signupUser } from '../redux/actions/userActions'
import { useSelector, useDispatch } from 'react-redux'

const styles = {
  form: {
    textAlign: 'center',
  },
  image: {
    margin: '20px auto 20px auto',
  },
  pageTitle: {
    margin: '10px auto 10px auto',
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: '20px',
    position: 'relative',
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: '10px',
  },
  progress: {
    position: 'absolute',
  },
}

const Signup = props => {
  const UI = useSelector(state => state.UI)
  const dispatch = useDispatch()
  const [userEmail, setEmail] = useState('')
  const [userPassword, setPassword] = useState('')
  const [confirmUserPassword, setConfirmPassword] = useState('')
  const [userHandle, setUserHandle] = useState('')
  const [errors, setError] = useState({})

  const { classes } = props

  useEffect(() => {
    setError(UI.errors)
  }, [UI.errors])

  const handleSubmit = e => {
    e.preventDefault()
    const newUserData = {
      email: userEmail,
      password: userPassword,
      confirmPassword: confirmUserPassword,
      handle: userHandle,
    }
    dispatch(signupUser(newUserData))
  }

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value)
  }

  const handleHandleChange = e => {
    setUserHandle(e.target.value)
  }
  console.log('signup')
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={errors && errors.email ? errors.email : null}
            error={errors && errors.email ? true : false}
            value={userEmail}
            onChange={handleEmailChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={errors && errors.password ? errors.password : null}
            error={errors && errors.password ? true : false}
            value={userPassword}
            onChange={handlePasswordChange}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            helperText={
              errors && errors.confirmPassword ? errors.confirmPassword : null
            }
            error={errors && errors.confirmPassword ? true : false}
            value={confirmUserPassword}
            onChange={handleConfirmPasswordChange}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            className={classes.textField}
            helperText={errors && errors.handle ? errors.handle : null}
            error={errors && errors.handle ? true : false}
            value={userHandle}
            onChange={handleHandleChange}
            fullWidth
          />
          {errors && errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={UI.loading}
          >
            Signup
            {UI.loading && (
              <CircularProgress size={20} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            already have an account ? login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  )
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Signup)
