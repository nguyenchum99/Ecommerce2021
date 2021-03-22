import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ChatScreen from '../screens/ChatScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductDetail from '../screens/ProductDetail';
import ProfileUser from '../screens/ProfileUser';

const StackProductDetail = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Detail: {
    screen: ProductDetail,
    navigationOptions: {
      title: 'Thông tin sản phẩm',
    },
  },
  UserProfile: {
    screen: ProfileUser,
    navigationOptions: {
      title: 'Thông tin',
    },
  },
  ChatRoom: {
    screen: ChatScreen,
    navigationOptions: {
      headerShown: true,
    },
  },
});

export default createAppContainer(StackProductDetail);
