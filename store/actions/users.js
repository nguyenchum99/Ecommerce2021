import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import * as helper from '../../database/database-helper';

export const SET_USERS = 'SET_USERS';

export const fetchUsers = () => async (dispatch) => {
  const myUserId = auth().currentUser.uid;
  database()
    .ref(helper.USERS)
    .orderByChild('name')
    .on('value', async (snapshot) => {
      const listUsers = [];
      snapshot.forEach((item) => {
        if (item.val().uid !== myUserId) {
          console.log(item.val());
          listUsers.push(item.val());
        }
      });
      dispatch({type: SET_USERS, users: listUsers});
    });
};
