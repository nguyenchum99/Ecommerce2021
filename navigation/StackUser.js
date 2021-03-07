import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import EditInfoProduct from '../screens/EditInfoProduct';
import EditProfileUser from '../screens/EditProfileUser';
import UserScreen from '../screens/UserScreen';

const StackUser = createStackNavigator(
  {
    User: {
      screen: UserScreen,
    },
    Profile: {
      screen: EditProfileUser,
    },
    EditProduct: {
      screen: EditInfoProduct,
    },
  },
  {
    headerMode: 'User',
    navigationOptions: {
      headerShown: false,
    },
  },
);

export default createAppContainer(StackUser);
