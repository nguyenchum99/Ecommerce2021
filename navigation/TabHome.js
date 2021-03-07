import React from 'react';
import {Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ChatScreen from '../screens/ChatScreen';
import StackCreateProduct from './StackCreateProduct';
import StackLike from './StackLike';
import StackProductDetail from './StackProductDetail';
import StackUser from './StackUser';

const TabHome = createBottomTabNavigator(
  {
    Home: {
      screen: StackProductDetail,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Image
            source={require('../assets/icons/icons8-home-24.png')}
            style={{width: 30, height: 30}}
          />
        ),
      },
    },
    Like: {
      screen: StackLike,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Image
            source={require('../assets/icons/icons8-heart-24.png')}
            style={{width: 30, height: 30}}
          />
        ),
      },
    },
    Camera: {
      screen: StackCreateProduct,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Image
            source={require('../assets/icons/icons8-camera-50.png')}
            style={{width: 35, height: 35}}
          />
        ),
      },
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Image
            source={require('../assets/icons/icons8-chat-50.png')}
            style={{width: 30, height: 30}}
          />
        ),
      },
    },
    User: {
      screen: StackUser,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Image
            source={require('../assets/icons/icons8-user-32.png')}
            style={{width: 35, height: 35}}
          />
        ),
      },
    },
  },

  {
    tabBarOptions: {
      showIcon: true,
      activeTintColor: '#ff1a1a',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'white',
      },
      labelStyle: {
        fontSize: 12,
      },
      showLabel: false,
    },
  },
);

export default createAppContainer(TabHome);
