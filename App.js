// GIT COMMANDS
// git add -A
// git commit -m "commit-message (replace this by your commit message)"
// git push -u origin master

import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import NavigationContainer from './navigation/NavigationContainer';
import TestScreen from './screens/TestScreen';
import authReducer from './store/reducers/auth';
import chatsReducer from './store/reducers/chats';
import usersReducer from './store/reducers/users';

const rootReducer = combineReducers({
  auth: authReducer,
  chats: chatsReducer,
  users: usersReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
    // <CommentList/>
    //<TestScreen/>
  );
};

export default App;
