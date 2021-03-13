import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import {connect} from 'react-redux';


class ExpandScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            height: 35,
            backgroundColor: '#DDDDDD',
            padding: 10,
            borderWidth: 1,
            borderColor: '#000000',
          }}
          onPress={() => this.props.navigation.navigate('Find')}>
          <Text
            style={{
              padding: 5,
            }}>
            Tìm kiếm bạn bè
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 35,
            backgroundColor: '#DDDDDD',
            padding: 10,
            borderWidth: 1,
            borderColor: '#000000',
          }}
          onPress={() => this.props.navigation.navigate('Find')}>
          <Text
            style={{
              padding: 5,
            }}>
            Danh mục
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 35,
            backgroundColor: '#DDDDDD',
            padding: 10,
            borderWidth: 1,
            borderColor: '#000000',
          }}
          onPress={() => this.props.navigation.navigate('Find')}>
          <Text
            style={{
              padding: 5,
            }}>
            yêu thích
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(ExpandScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
