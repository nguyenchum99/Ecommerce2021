import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

const WEB_API_KEY = 'AIzaSyB6AlBiawWCOgXpAdOYuqm8vNEJX4I1EVQ';

GoogleSignin.configure({
  webClientId:
    '50803647850-411jbhjg7169l96avctukst3b3atq8bt.apps.googleusercontent.com',
});

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const getUserData = async () => {
  try {
    const respone = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${WEB_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: token,
        }),
      },
    );
    const resData = await respone.json();
    if (!respone.ok) {
      throw new Error(resData.error.message);
    }
    console.log('ResDAta ' + resData);
    return resData;
  } catch (error) {
    throw error;
  }
};

export const deleteUnverifiedUser = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const respone = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${WEB_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken: token,
          }),
        },
      );
      const resData = await respone.json();
      if (!respone.ok) {
        throw new Error(resData.error.message);
      }
      console.log('ResDAta ' + resData);
      dispatch({
        type: LOGOUT,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const sendEmailVerification = () => {
  return async (getState) => {
    const token = getState().auth.token;
    try {
      const respone = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${WEB_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Firebase-Locale': 'vi',
          },
          body: JSON.stringify({
            requestType: 'VERIFY_EMAIL',
            idToken: token,
          }),
        },
      );
      const resData = await respone.json();
      if (!respone.ok) {
        throw new Error(resData.error.message);
      }
      console.log('ResDAta ' + resData);
    } catch (err) {
      throw err;
    }
  };
};

export const authenticate = (isSignup, email, password) => {
  return async (dispatch) => {
    try {
      const respone = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:${
          isSignup ? 'signUp' : 'signInWithPassword'
        }?key=${WEB_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        },
      );
      const resData = await respone.json();
      if (!respone.ok) {
        throw new Error(resData.error.message);
      }
      const expiryDate = new Date(
        new Date().getTime() + parseInt(resData.expiryDate_) * 1000,
      );
      if (isSignup) {
        alert('We send email verification to ' + resData.email);
      }
      dispatch({
        type: AUTHENTICATE,
        token: resData.idToken,
        useId: resData.localId,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const googleLogin = () => async (dispatch) => {
  let userInfo;
  try {
    await GoogleSignin.hasPlayServices();
    // userInfo = await GoogleSignin.signIn();
    // console.log(userInfo);
    // Get the users ID token
    const respone = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(
      respone.idToken,
    );

    // Sign-in the user with the credential
    userInfo = await auth().signInWithCredential(googleCredential);
    dispatch({
      type: AUTHENTICATE,
      token: respone.idToken,
      userId: userInfo.user.uid,
    });
  } catch (err) {
    throw err;
  }
};

export const logout = () => {
  return dispatch({type: LOGOUT});
};

export const signOut = () => {
  return async (dispatch) => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
    dispatch(logout);
    removeUserData();
  };
};
