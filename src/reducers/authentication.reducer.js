import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
let initialState = {
  loggingIn: false,
  loggedIn: false,
  loggedOut: false,
  user: {}
}

const initState = user ? { ...initialState, loggedIn: true, user } : initialState;

export function authentication(state = initState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggingIn: false,
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggingIn: false,
        loggedIn: false,
      };
    case userConstants.LOGOUT:
      return {
        loggedOut: true
      };
    default:
      return state
  }
}