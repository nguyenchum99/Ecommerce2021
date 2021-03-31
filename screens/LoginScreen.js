import AsyncStorage from '@react-native-community/async-storage';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput
} from 'react-native';
import {useDispatch} from 'react-redux';
import Input from '../Components/UI/Input';
import * as authActions from '../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const saveAccountToStorage = async (email, password) => {
  try {
    await AsyncStorage.setItem(
      '$userAccount',
      JSON.stringify({
        email: email,
        password: password,
      }),
    );
  } catch (err) {
    console.log(err.message);
  }
};

const getUserAccountFromStorage = async () => {
  try {
    const account = await AsyncStorage.getItem('$userAccount');
    return account;
  } catch (error) {
    // Error retrieving data
  }
};

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.id]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.id]: action.isValid,
    };
    let updatedIsValid = true;
    for (const key in updatedValidities) {
      updatedIsValid &= updatedValidities[key];
    }
    state = {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      isValidForm: updatedIsValid,
    };
  }
  return state;
};

const LoginScreen = (props) => {
  const initialEmail = props.navigation.getParam('email');
  const initialPassword = props.navigation.getParam('password');
  const [isSignup, setIsSignup] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const googleLoginHandler = async () => {
    setError(null);
    try {
      await dispatch(authActions.googleLogin());
      props.navigation.navigate('Home');
    } catch (err) {
      setError(err.message);
    }
  };

  const authenticationHandler = async () => {
    if (!formState.isValidForm) {
      Alert.alert(
        'An error occurred!',
        'Please fill out valid email and password',
        [{text: 'OK'}],
      );
      return;
    }
    setError(null);
    setIsWaiting(true);
    try {
      await dispatch(
        authActions.authenticate(
          isSignup,
          formState.inputValues.email,
          formState.inputValues.password,
        ),
      );
      saveAccountToStorage(
        formState.inputValues.email,
        formState.inputValues.password,
      );
      props.navigation.navigate('Home');
    } catch (err) {
      setIsWaiting(false);
      setError(err.message);
    }
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: initialEmail ? initialEmail : '',
      password: initialPassword ? initialPassword : '',
    },
    inputValidities: {
      email: !!initialEmail,
      password: !!initialPassword,
    },
    isValidForm: !!initialEmail && !!initialPassword,
  });

  const inputChangeHandler = useCallback(
    (id, value, isValid) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        id: id,
        value: value,
        isValid: isValid,
      });
    },
    [dispatchFormState],
  );

  return (
    // <View style={styles.container}>
    //   <View style={styles.inputView}>
     
    //     <Input
    //       id="email"
    //       label="Email"
    //       keyboardType="email-address"
    //       email
    //       returnKeyType="next"
    //       initialValue={initialEmail}
    //       initiallyValid={!!initialEmail}
    //       required
    //       onInputChange={inputChangeHandler}
    //       errorText="*Please enter a valid email!"
    //     />
    //     <Input
    //       id="password"
    //       label="Password"
    //       required
    //       initialValue={initialPassword}
    //       initiallyValid={!!initialPassword}
    //       keyboardType="number-pad"
    //       onInputChange={inputChangeHandler}
    //       secureTextEntry={true}
    //       minLen={6}
    //       maxLength={6}
    //       returnKeyType="go"
    //       errorText="*Please enter password with 6 numbers"
    //     />
    //   </View>
    //   {isWaiting ? (
    //     <ActivityIndicator size="large" corlor="white" />
    //   ) : (
    //     <TouchableOpacity
    //       style={styles.buttonContainer}
    //       onPress={authenticationHandler}>
    //       <Text style={styles.buttonText}>{isSignup ? 'Signup' : 'Login'}</Text>
    //     </TouchableOpacity>
    //   )}
    //   <TouchableOpacity
    //     style={styles.buttonContainer}
    //     onPress={() => {
    //       setIsSignup((isSignup) => !isSignup);
    //     }}>
    //     <Text style={styles.buttonText}>
    //       Switch to {isSignup ? 'Login' : 'Signup'}
    //     </Text>
    //   </TouchableOpacity>
    //   <GoogleSigninButton
    //     onPress={googleLoginHandler}
    //     size={GoogleSigninButton.Size.Wide}
    //     style={{width: '50%', height: 50}}
    //     color={GoogleSigninButton.Color.Dark}
    //   />
    // </View>
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image style={[styles.icon, styles.inputIcon]} source={{ uri: 'https://png.icons8.com/password/androidL/40/3498db' }} />
        <TextInput style={styles.inputs}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid='transparent' />
      </View>

      <View style={styles.inputContainer}>
        <Image style={[styles.icon, styles.inputIcon]} source={{ uri: 'https://png.icons8.com/envelope/androidL/40/3498db' }} />
        <TextInput style={styles.inputs}
          placeholder="Mật khẩu"
          secureTextEntry={true}
          underlineColorAndroid='transparent' />
      </View>

      <TouchableOpacity style={styles.restoreButtonContainer}>
        <Text>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}>
        <Text style={styles.loginText}>Đăng nhập</Text>
      </TouchableOpacity>


      {/* <TouchableOpacity style={[styles.buttonContainer, styles.fabookButton]}>
        <View style={styles.socialButtonContent}>
          <Image style={styles.icon} source={{ uri: 'https://png.icons8.com/facebook/androidL/40/FFFFFF' }} />
          <Text style={styles.loginText}>Continue with facebook</Text>
        </View>
      </TouchableOpacity> */}

      <TouchableOpacity style={[styles.buttonContainer, styles.googleButton]} onPress={googleLoginHandler}>
        <View style={styles.socialButtonContent}>
          <Image style={styles.icon} source={{ uri: 'https://png.icons8.com/google/androidL/40/FFFFFF' }} />
          <Text style={styles.loginText}>Đăng nhập với Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B0E0E6',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#3498db',
  },
  fabookButton: {
    backgroundColor: "#3b5998",
  },
  googleButton: {
    backgroundColor: "#ff0000",
  },
  loginText: {
    color: 'white',
  },
  restoreButtonContainer: {
    width: 250,
    marginBottom: 15,
    alignItems: 'flex-end'
  },
  socialButtonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    color: "#FFFFFF",
    marginRight: 5
  }
});

export default LoginScreen;
