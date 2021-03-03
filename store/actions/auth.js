import {GoogleSignin} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '50803647850-411jbhjg7169l96avctukst3b3atq8bt.apps.googleusercontent.com',
});

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const authenticate = (token, userId) => {
  return {type: AUTHENTICATE, token: token, userId: userId};
};

export const login = () => async (dispatch) => {
  let userInfo;
  try {
    await GoogleSignin.hasPlayServices();
    // userInfo = await GoogleSignin.signIn();
    // console.log(userInfo);
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    userInfo = await auth().signInWithCredential(googleCredential);
    console.log(userInfo);
  } catch (err) {
    console.log(err.message);
    throw err;
  }
  dispatch({
    type: AUTHENTICATE,
    token: userInfo.user.token,
    userId: userInfo.user.uid,
    userName: userInfo.user.displayName,
    userEmail: userInfo.user.email,
    userPhone: userInfo.user.phoneNumber,
    userPhoto: userInfo.user.photoURL

  });
  const expiryDate = new Date(new Date().getTime() + 1000 * 1000);
  saveToStorage(userInfo.user.displayName, userInfo.user.uid, userInfo.user.email, 
    userInfo.user.phoneNumber,userInfo.user.photoURL, expiryDate);
};

export const signOut = () => async (dispatch, getState) => {
  console.log(getState());
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
    throw error;
  }
  dispatch({type: LOGOUT});
  removeUserData();
};

const saveToStorage = async (userName, userId, userEmail, userPhone, userPhoto, expiryDate) => {
  try {
    await AsyncStorage.setItem(
      'userData',
      JSON.stringify({      
        userId: userId,
        userName: userName,
        userEmail: userEmail,
        userPhone: userPhone,
        userPhoto: userPhoto,
        expiryDate: expiryDate.toISOString(),
      }),
    );
  } catch (err) {
    console.log(err.message);
  }
  console.log('Done.');
};

const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem('userData');
  } catch (e) {
    console.log(e.message);
  }
  console.log('Done.');
};
