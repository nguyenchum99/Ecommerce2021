import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import EditProfileUser from '../screens/EditProfileUser';
import FindFriendScreen from '../screens/FindFriendScreen';
import UserScreen from '../screens/UserScreen';

import StackBuy from './StackBuy';
import StackSell from './StackSell';

const StackUser = createStackNavigator({
  User: {
    screen: UserScreen,
    navigationOptions: {
      title: 'Quản lý đơn hàng bán',
      headerShown: false,
    },
  },
  Profile: {
    screen: EditProfileUser,
  },
  Find: {
    screen: FindFriendScreen,
    navigationOptions: {
      title: 'Tìm kiếm bạn bè',
    },
  },
  Sell: {
    screen: StackSell,
    navigationOptions: {
      title: 'Quản lý đơn hàng bán',
      headerShown: false,
    },
  },
  Buy: {
    screen: StackBuy,
    navigationOptions: {
      title: 'Quản lý đơn hàng bán',
      headerShown: false,
    },
  },
});

export default createAppContainer(StackUser);
