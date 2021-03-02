import {AUTHENTICATE, LOGOUT} from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  userName: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        userName: action.userName,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
