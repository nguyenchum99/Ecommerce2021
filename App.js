// GIT COMMANDS
// git add -A
// git commit -m "commit-message (replace this by your commit message)"
// git push -u origin master

import 'react-native-gesture-handler';

import React from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import NavigationContainer from './navigation/NavigationContainer';
import authReducer from './store/reducers/auth';
import FindFriendScreen from './screens/FindFriendScreen';
const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      {/* <NavigationContainer /> */}
      <FindFriendScreen></FindFriendScreen>
    </Provider>
  );
};

export default App;
