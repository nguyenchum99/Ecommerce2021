import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import EditInfoProduct from '../screens/EditInfoProduct';
import ListtingScreen from '../screens/ListtingScreen';

const StackEditProduct = createStackNavigator(
  {
    List: {
      screen: ListtingScreen,
    },
    Detail: {
      screen: EditInfoProduct,
    },
  },
  {
    headerMode: 'List',
    navigationOptions: {
      headerShown: false,
    },
  },
);

export default createAppContainer(StackEditProduct);
