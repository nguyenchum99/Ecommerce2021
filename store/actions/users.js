import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import * as helper from '../../database/database-helper';

export const SET_USERS = 'SET_USERS';

export const fetchUsers = () => async (dispatch, getState) => {
  const myUserId = getState().auth.userId;
  database()
    .ref(helper.USERS)
    .orderByChild('name')
    .on('value', async (snapshot) => {
      const listUsers = [];
      snapshot.forEach((item) => {
        if (item.val().uid !== myUserId) {
          listUsers.push(item.val());
        }
      });
      dispatch({type: SET_USERS, users: listUsers});
    });
};
