import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabHome from "./TabHome";


const StackHomePage = createStackNavigator({
  
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  Home: {
    screen: TabHome
  },
}, {
  headerMode : 'Login',
  headerMode : 'Home',
  navigationOptions:  {
    headerShown: false
  },
  
});



export default createAppContainer(StackHomePage);
