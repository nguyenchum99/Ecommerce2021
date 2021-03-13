import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import EditProfileUser from '../screens/EditProfileUser';
import ExpandScreen from '../screens/ExpandScreen';
import FindFriendScreen from '../screens/FindFriendScreen';
import UserScreen from '../screens/UserScreen';
import StackExpandNavigator from './StackExpandNavigator';


const StackExpand = createStackNavigator(
  {
    User: {
      screen: UserScreen,
    },
    Expand: {
      screen: StackExpandNavigator,
    },
    Profile: {
      screen: EditProfileUser,
    },
  },
  {
    headerMode: 'Expand',
    navigationOptions: {
      headerShown: false,
    },
  },
);

export default createAppContainer(StackExpand);
