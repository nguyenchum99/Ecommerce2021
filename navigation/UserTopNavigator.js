import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import FollowersScreen from '../screens/FollowersScreen';
import FollowingScreen from '../screens/FollowingScreen';
import StackEditProduct from './StackEditProduct';

const UserTopNavigator = createMaterialTopTabNavigator(
  {
    Listing: {
      screen: StackEditProduct,
      navigationOptions: {
        tabBarLabel: 'Listing',
      },
    },
    Following: {
      screen: FollowingScreen,
      navigationOptions: {
        tabBarLabel: 'Following',
      },
    },
    Followers: {
      screen: FollowersScreen,
      navigationOptions: {
        tabBarLabel: 'Followers',
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#D4AF37',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'white',
      },
      labelStyle: {
        fontSize: 10,
      },
    },
  },
);

export default createAppContainer(UserTopNavigator);
