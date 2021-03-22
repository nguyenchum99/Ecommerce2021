import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import EditProfileUser from '../screens/EditProfileUser';
import LoginScreen from '../screens/LoginScreen';
import UserScreen from '../screens/UserScreen';
import StackExpand from './StackExpand';

const StackUser = createStackNavigator(
  {
    User: {
      screen: StackExpand,
      
    },
    Profile: {
      screen: EditProfileUser,
    }
  },
  {
    headerMode: 'User',
    navigationOptions: {
      headerShown: false,
    },
  },
);

export default createAppContainer(StackUser);
