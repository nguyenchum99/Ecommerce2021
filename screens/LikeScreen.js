import {firebaseApp} from '../Components/FirebaseConfig';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

class LikeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLike: '',
      key: '',
    };
  }

  componentDidMount() {
   //console.log("dskfdsssssfffffffffffff", this.props.userId)
    firebaseApp
      .database()
      .ref('Likes')
      .orderByChild('uid')
      .equalTo(this.props.userId)
      .on('value', (snapshot) => {
        const li = [];
        snapshot.forEach((child) => {
          if (child.val().isLiked) {
            li.push({
              key: child.key,
              productName: child.val().productName,
              productDescription: child.val().productDescription,
              productPrice: child.val().productDescription,
              productImage1: child.val().productImage1,
              isLike: child.val().isLiked,
            });
          }
        });
        this.setState({
          data: li,
        });
      });
  }

  clickLike(key) {
    //this.setState({isLike: !this.state.isLike});
    firebaseApp.database().ref(`Likes/${key}`).update({
      isLiked: false,
    });
  }

  render() {
    return (
      <FlatList
        enableEmptySections={true}
        data={this.state.data}
        keyExtractor={(item) => {
          return item.key;
        }}
        renderItem={({item}) => {
          return (
            <View style={styles.box}>
              <Image style={styles.image} source={{uri: item.productImage1}} />
              <View style={styles.boxContent}>
                <Text style={styles.title}>{item.productName}</Text>
                <Text style={styles.description}>
                  {item.productDescription}
                </Text>
                <View style={styles.buttons}>
                  <TouchableOpacity onPress={() => this.clickLike(item.key)}>
                    <Image
                      style={styles.icon}
                      source={require('../assets/icons/heart(1).png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(LikeScreen);

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  box: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  boxContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    color: '#151515',
  },
  description: {
    fontSize: 15,
    color: '#646464',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 50,
    marginRight: 5,
    marginTop: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  view: {
    backgroundColor: '#eee',
  },
  profile: {
    backgroundColor: '#1E90FF',
  },
  message: {
    backgroundColor: '#228B22',
  },
});
