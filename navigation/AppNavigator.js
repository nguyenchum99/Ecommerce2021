import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import StartUpScreen from '../screens/StartUpScreen';
import TabHome from './TabHome';

const AppNavigator = createSwitchNavigator(
  {
    Auth: {
      screen: LoginScreen,
    },
    Home: {
      screen: TabHome,
    },
  },
  {
    headerMode: 'Auth',
    headerMode: 'Home',
    navigationOptions: {
      headerShown: false,
    },
  },
);

export default createAppContainer(AppNavigator);
