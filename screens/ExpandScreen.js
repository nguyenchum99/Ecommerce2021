import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import {connect} from 'react-redux';
import {ListItem, Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from '../store/actions/auth';
import * as usersActions from '../store/actions/users';

const list = [
  {
    title: 'Tìm kiếm bạn bè',
    icon: 'group',
  },
  {
    title: 'Quản lý đơn bán',
    icon: 'history',
  },
  {
    title: 'Đơn hàng mua',
    icon: 'shopping-cart',
  },
  {
    title: 'Hoạt động của bạn',
    icon: 'equalizer',
  },
  {
    title: 'Đăng xuất',
    icon: 'logout',
  },
];

const ExpandScreen = (props) => {
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

  const selectExpand = (index) => {
    if (index == 0) {
      props.navigation.navigate('Find');
    } else if (index == 4) {
      logoutHandler();
    }
    else if( index == 1){
       props.navigation.navigate('Sell');
    }
  };

  return (
    <View style={styles.container}>
      {list.map((item, i) => (
        <TouchableOpacity onPress={() => selectExpand(i)}>
          <ListItem key={i} bottomDivider>
            <Icon name={item.icon} />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ExpandScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
