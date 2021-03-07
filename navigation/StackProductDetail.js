import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import ProductDetail from '../screens/ProductDetail';

const StackProductDetail = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Detail: {
      screen: ProductDetail,
    },
  },
  {
    headerMode: 'Home',
    navigationOptions: {
      headerShown: false,
    },
  },
);

export default createAppContainer(StackProductDetail);
