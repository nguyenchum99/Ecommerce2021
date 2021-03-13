import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ExpandScreen from '../screens/ExpandScreen';
import FindFriendScreen from '../screens/FindFriendScreen';


const StackExpandNavigator = createStackNavigator(
  {
    ExpandScreen: {
      screen: ExpandScreen,
    },
    Find: {
      screen: FindFriendScreen,
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
