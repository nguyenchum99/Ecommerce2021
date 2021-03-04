import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";
import ProductDetail from "../screens/ProductDetail";


const StackProductDetail = createStackNavigator(
  {
    List: {
      screen: HomeScreen,
    },
    Detail: {
      screen: ProductDetail,
    },
  },
  {
    headerMode: 'List',
    navigationOptions:  {
      headerShown: false
    },
  }
);

export default createAppContainer(StackProductDetail);
