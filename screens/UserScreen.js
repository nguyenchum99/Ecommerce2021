import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GiftedAvatar} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import UserTopNavigator from '../navigation/UserTopNavigator';
import * as authActions from '../store/actions/auth';
import * as usersActions from '../store/actions/users';

const UserScreen = (props) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  const userName = useSelector((state) => state.auth.userName);
  const userPhoto = useSelector((state) => state.auth.userPhoto);
  const userId = useSelector((state) => state.auth.userId);
  const users = useSelector((state) => state.users.users);

  const fetchUserData = async () => {
    await dispatch(usersActions.fetchUsers());
    await dispatch(usersActions.fetchFollowerUsers());
    await dispatch(usersActions.fetchFollowingUsers());
  };
  useEffect(() => {
    fetchUserData();
  }, [userId]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Expand')}>
          <GiftedAvatar
            user={{name: userName, avatar: userPhoto}}
            avatarStyle={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
          <View>
            <Text style={styles.title}>{userName}</Text>
            <Text style={styles.location}>Location: Ha noi</Text>
            <Text style={styles.location}>Editttt Profile</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={logoutHandler}>
          <Text>Logout</Text>
        </TouchableOpacity> */}
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
