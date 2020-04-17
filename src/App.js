import React from 'react'
import { Router, navigate } from '@reach/router'
import './App.css'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import jwtDecode from 'jwt-decode'
//redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { logoutUser, getUserData } from './redux/actions/userActions'

import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import User from './pages/user'
import Navbar from './components/layout/Navbar'
import { SET_AUTHENTICATED } from './redux/types'
import axios from 'axios'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#9a67ea',
      main: '#673ab7',
      dark: '#320b86',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
  },
})

axios.defaults.baseURL =
  'https://europe-west1-socialape-249ec.cloudfunctions.net/api'

const token = localStorage.FBIdToken
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    navigate('/login')
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Navbar />
        <div className="container">
          <Router>
            <Home path="/" />
            <Login path="/login" />
            <Signup path="/signup" />
            <User path="/users/:handle" />
            <User path="/users/:handle/scream/:screamId" />
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  )
}

export default App
