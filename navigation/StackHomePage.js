import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabHome from "./TabHome";
import StartUpScreen from '../screens/StartUpScreen';


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
});

export default createAppContainer(StackHomePage);
