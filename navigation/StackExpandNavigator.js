import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ExpandScreen from '../screens/ExpandScreen';
import FindFriendScreen from '../screens/FindFriendScreen';


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
  },
  //   {
  //     headerMode: 'ExpandScreen',
  //     navigationOptions: {
  //       headerShown: false,
  //     },
  //   },
);

export default createAppContainer(StackExpandNavigator);
