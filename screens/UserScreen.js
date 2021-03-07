import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import UserTopNavigator from '../navigation/UserTopNavigator';

class UserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Setting')}>
            <Image source={{uri: this.props.userPhoto}} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile')}>
            <View>
              <Text style={styles.title}>{this.props.userName}</Text>
              <Text style={styles.location}>Location: Ha noi</Text>
              <Text style={styles.location}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
        <UserTopNavigator />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(UserScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  title: {
    marginLeft: 25,
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  location: {
    fontSize: 13,
    marginLeft: 25,
  },
  price: {
    marginLeft: 20,
    color: '#000000',
  },
});
