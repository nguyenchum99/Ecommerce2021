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
  const userName = useSelector((state) => state.auth.userName);
  const userPhoto = useSelector((state) => state.auth.userPhoto);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Expand')}>
          <Image source={{uri: userPhoto}} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
          <View>
            <Text style={styles.title}>{userName}</Text>
            <Text style={styles.location}>Location: Ha noi</Text>
            <Text style={styles.location}>Editttt Profile</Text>
          </View>
        </TouchableOpacity>
        {/* <Button title="Log out" onPress={logoutHandler} /> */}
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
