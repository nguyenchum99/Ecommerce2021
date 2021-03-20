import {SET_USERS} from '../actions/users';

const initialState = {
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        users: action.users,
      };
    default:
      return state;
  }
};

export default usersReducer;
