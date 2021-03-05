import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { Provider } from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';

import ReduxThunk from 'redux-thunk';

import HomeTopNavigator from './navigation/HomeTopNavigator';
import StackHomePage from './navigation/StackHomePage';
import TabHome from './navigation/TabHome';
import CameraScreen from './screens/CameraScreen';
import CategoryScreen from './screens/CategoryScreen';
import HomeScreen from './screens/HomeScreen';
import LocalScreen from './screens/LocalScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    //<CategoryScreen/>
    <Provider store={store}>
      <StackHomePage />
    </ Provider>
  );
};

export default App;
