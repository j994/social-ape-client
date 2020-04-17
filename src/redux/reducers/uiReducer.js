import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI } from '../types'

const initialState = {
  loading: false,
  errors: null,
}

export default function(state = initialState, actions) {
  switch (actions.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: actions.payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      }
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      }
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
