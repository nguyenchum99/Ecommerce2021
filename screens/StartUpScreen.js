import React, {useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';

import * as authActions from '../store/actions/auth';

const StartUpScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        alert('UserData is null');
        props.navigation.navigate('Login');
        return;
      }
      const transData = JSON.parse(userData);
      const {token, userId, expiryDate} = transData;
      const expirationDate = new Date(expiryDate);
      if (expirationDate <= new Date() || !token || !userId) {
        console.log(expirationDate.toISOString() + ' ' + token + ' ' + userId);
        props.navigation.navigate('Login');
        return;
      }
      dispatch(authActions.authenticate(token, userId));
      props.navigation.navigate('Home');
    };
    tryLogin();
  }, [dispatch]);

  useEffect(() => {}, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartUpScreen;
