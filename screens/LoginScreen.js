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
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
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
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    isValidForm: false,
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
    <View style={styles.container}>
      <View style={styles.inputView}>
        {/* <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        /> */}
        <Input
          id="email"
          label="Email"
          keyboardType="email-address"
          email
          returnKeyType="next"
          initialValue={email}
          initiallyValid={!!email}
          required
          onInputChange={inputChangeHandler}
          errorText="*Please enter a valid email!"
        />
        <Input
          id="password"
          label="Password"
          required
          initialValue={password}
          initiallyValid={!!password}
          keyboardType="number-pad"
          onInputChange={inputChangeHandler}
          secureTextEntry={true}
          minLen={6}
          maxLength={6}
          returnKeyType="go"
          errorText="*Please enter password with 6 numbers"
        />
      </View>
      {isWaiting ? (
        <ActivityIndicator size="large" corlor="white" />
      ) : (
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={authenticationHandler}>
          <Text style={styles.loginText}>{isSignup ? 'Signup' : 'Login'}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          setIsSignup((isSignup) => !isSignup);
        }}>
        <Text style={styles.loginText}>
          Switch to {isSignup ? 'Login' : 'Signup'}
        </Text>
      </TouchableOpacity>
      <GoogleSigninButton
        onPress={googleLoginHandler}
        size={GoogleSigninButton.Size.Wide}
        style={{width: '50%', height: 50}}
        color={GoogleSigninButton.Color.Dark}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default LoginScreen;
