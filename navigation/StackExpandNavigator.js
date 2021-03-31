import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ExpandScreen from '../screens/ExpandScreen';
import FindFriendScreen from '../screens/FindFriendScreen';

import StackSell from './StackSell';


const StackExpandNavigator = createStackNavigator(
  {
    ExpandScreen: {
      screen: ExpandScreen,
      navigationOptions: {
        title: 'Mở rộng',
      },
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
  },
  //   {
  //     headerMode: 'ExpandScreen',
  //     navigationOptions: {
  //       headerShown: false,
  //     },
  //   },
);

export default createAppContainer(StackExpandNavigator);
