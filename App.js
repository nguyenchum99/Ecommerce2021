
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import StackHomePage from './navigation/StackHomePage';
import TabHomePage from './navigation/TabHome';
import CameraScreen from './screens/CameraScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const App = () => {
  return (
    <> 
    <CameraScreen/>
    </>   
  );
};



export default App;
