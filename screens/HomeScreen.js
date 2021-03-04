import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from 'react-native';
import SearchItem from '../Components/SearchItem';
import HomeTopNavigator from '../navigation/HomeTopNavigator';
import {SearchBar} from 'react-native-elements';
import LocalScreen from './LocalScreen';
import {useSelector} from 'react-redux';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  updateSearch = (search) => {
    this.setState({search});
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
          <SearchBar
            placeholder="Search item..."
            onChangeText={this.updateSearch}
            value={this.state.search}
            lightTheme
            round
            containerStyle={
              Platform.OS === 'android'
                ? {backgroundColor: '#ffffff'}
                : {backgroundColor: '#ffffff'}
            }
            inputStyle={{color: '#000000'}}
          />
     
        <LocalScreen {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
