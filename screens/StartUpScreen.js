import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const StartUpScreen = (props) => {
  useEffect(() => {
    const tryLogin = async () => {
      console.log('Getting save account');
      try {
        const userData = await AsyncStorage.getItem('$userAccount');

        if (!userData) {
          alert('UserData is null');
          props.navigation.navigate('Auth');
          return;
        }
        const transData = JSON.parse(userData);
        console.log(transData);
        const {email, password} = transData;
        props.navigation.navigate('Auth', {email: email, password: password});
      } catch (err) {
        console.log(err.message);
      }
    };
    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color="red" />
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
