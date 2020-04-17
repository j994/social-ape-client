import React, { useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

//Mui
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

//Redux
import { useSelector, useDispatch } from 'react-redux'
import { submitComment } from '../../redux/actions/dataActions'

const styles = {
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20,
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 5,
  },
}

const CommentForm = props => {
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState({})
  const UI = useSelector(state => state.UI)
  const authenticated = useSelector(state => state.user.authenticated)
  const dispatch = useDispatch()
  const { classes, screamId } = props

  useEffect(() => {
    setErrors(UI.errors)
    if (!UI.errors && !UI.loading) {
      setBody('')
      setErrors({})
    }
  }, [UI.errors, UI.loading])

  const handleChange = e => {
    setBody(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault()
    dispatch(submitComment(screamId, { body: body }))
  }

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={errors && errors.comment ? true : false}
          helperText={errors && errors.comment ? errors.comment : null}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submitButton}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null

  return commentFormMarkup
}

export default withStyles(styles)(CommentForm)
