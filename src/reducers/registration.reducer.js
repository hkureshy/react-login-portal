import { userConstants } from '../constants';

const initialState = {
  registering: false,
  registered: false
}

export function registration(state = initialState, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return { registering: false, registered: true };
    case userConstants.REGISTER_FAILURE:
      return { registering: false };
    default:
      return state
  }
}