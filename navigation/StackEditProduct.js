import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ListtingScreen from '../screens/ListtingScreen';

const StackEditProduct = createStackNavigator(
  {
    List: {
      screen: ListtingScreen,
    }
 
  },
  {
    headerMode: 'List',
    navigationOptions: {
      headerShown: false,
    },
  },
);

export default createAppContainer(StackEditProduct);
