import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import UserTopNavigator from '../navigation/UserTopNavigator';

import * as authActions from '../store/actions/auth';

const UserScreen = (props) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  const [userInfo, setUserInfo] = useState();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const loadUserInfo = async () => {
      const user = await authActions.getUserData(token);
      console.log(user);
      setUserInfo(user);
    };
    if (!userInfo) {
      loadUserInfo();
    }
  }, [userInfo]);

  if (!userInfo) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Setting')}>
          <Image source={{uri: props.userPhoto}} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
          <View>
            <Text style={styles.title}>{props.userName}</Text>
            <Text style={styles.location}>Location: Ha noi</Text>
            <Text style={styles.location}>Editttt Profile</Text>
            <Button title="Log out" onPress={logoutHandler} />
          </View>
        </TouchableOpacity>
      </View>
      <UserTopNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  title: {
    marginLeft: 25,
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  location: {
    fontSize: 13,
    marginLeft: 25,
  },
  price: {
    marginLeft: 20,
    color: '#000000',
  },
});

export default UserScreen;
