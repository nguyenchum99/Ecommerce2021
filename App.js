
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import HomeTopNavigator from './navigation/HomeTopNavigator';
import StackHomePage from './navigation/StackHomePage';
import TabHome from './navigation/TabHome';
import CameraScreen from './screens/CameraScreen';
import LocalScreen from './screens/LocalScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const App = () => {
  return (
    <> 
    <TabHome/>
    </>   
  );
};



export default App;
