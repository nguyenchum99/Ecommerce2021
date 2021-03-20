import Entypo from 'react-native-vector-icons/Entypo';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import StackChat from './StackChat';
import StackChatBuy from './StackChatBuy';

const ChatsTopNavigation = createMaterialTopTabNavigator(
  {
    Sell: {
      screen: StackChat,
      navigationOptions: {
        tabBarLabel: 'Sell',
      },
    },
    Buy: {
      screen: StackChatBuy,
      navigationOptions: {
        tabBarLabel: 'Buy',
      },
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({tintColor, size}) => {
        const {routeName} = navigation.state;
        if (routeName === 'Sell') {
          return <Entypo name="home" size={30} color={tintColor} />;
        } else if (routeName === 'Buy') {
          return <Entypo name="heart" size={30} color={tintColor} />;
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#D4AF37',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'white',
      },
      labelStyle: {
        fontSize: 16,
        fontWeight: '500',
      },
    },
  },
);

export default createAppContainer(ChatsTopNavigation);
