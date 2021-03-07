import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import LocalScreen from './LocalScreen';

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
