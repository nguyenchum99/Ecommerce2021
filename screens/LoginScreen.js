import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin, GoogleSigninButton} from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId:
    '50803647850-411jbhjg7169l96avctukst3b3atq8bt.apps.googleusercontent.com',
});

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      userInfo: {},
    };
  }

  signIn = async() => {
    try{
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn();
      Alert.alert(
        'Alert Title',
        'Đăng nhập thành công: ' + userInfo.user.name,
        [
          {
            text: 'Hủy',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => this.props.navigation.navigate('Home') },
        ],
        { cancelable: false }
      );
      this.setState({
        userInfo: userInfo,
        loaded: true,
      })
      console.log(this.state.userInfo);
    }catch(error){
      console.log(error.message)
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({email: text})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({password: text})}
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          // onPress={() => this.signInGoogle()}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
        <GoogleSigninButton
          onPress={this.signIn}
          size={GoogleSigninButton.Size.Wide}
          style={{width: '50%', height: 50}}
          color={GoogleSigninButton.Color.Dark}
        />
      </View>
    );
  }
}

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
    height: 50,
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

