import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ItemDetail from '../screens/ItemDetail';
import LikeScreen from '../screens/LikeScreen';

const StackLike = createStackNavigator(
  {
    List: {
      screen: LikeScreen,
    },
    Detail: {
      screen: ItemDetail,
    },
  },
  {
    headerMode: 'List',
    navigationOptions: {
      headerShown: false,
    },
  },
);

export default createAppContainer(StackLike);
