import {
  FETCHING_AUTH,
  REQUEST_AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  USER_STATE_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  RECOVER_PASSWORD_SUCCESS
} from '../actions';

const INITIAL_STATE = {
  sending: false,
  error: null,
  user: null,
  loggedIn: null
}

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_AUTH:
      return { ...state, sending: action.fetching, error: null }

    case USER_STATE_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, sending: false, user: action.user, loggedIn: true }

    case LOGOUT_SUCCESS:
    case RECOVER_PASSWORD_SUCCESS:
      return { ...state, sending: false, user: null, loggedIn: null }

    case REQUEST_AUTH_ERROR:
      return { ...state, sending: false, error: action.error }

    case CLEAR_AUTH_ERROR:
      return { ...state, error: null }

    default:
      return state;
  }
}

export default auth;