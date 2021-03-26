import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import database from '@react-native-firebase/database';
import {GiftedAvatar} from 'react-native-gifted-chat';

class UserListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlowing: false,
    };
  }

  componentDidMount() {
    this._checkFollowState(this.props.userId, this.props.item.uid);
  }

  _checkFollowState = (myUserid, userId) => {
    const key = myUserid + '_' + userId;
    database()
      .ref(`Follows/`)
      .orderByChild('myUserid_userId')
      .equalTo(key)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          snapshot.forEach((item) => {
            if (item.val()) {
              this.setState({isFlowing: item.val().isFollowing});
            }
          });
        }
      });
  };

  _toggleFollowState = (myUserid, userId) => {
    const key = myUserid + '_' + userId;
    database()
      .ref(`Follows/`)
      .orderByChild('myUserid_userId')
      .equalTo(key)
      .once('value', (snapshot) => {
        if (snapshot.val()) {
          snapshot.forEach((item) => {
            database()
              .ref(`Follows/${item.key}/isFollowing`)
              .transaction((state) => !state);
          });
        } else {
          database().ref('Follows').push().set({
            myUserid_userId: key,
            myUserid: myUserid,
            userId: userId,
            isFollowing: true,
          });
        }
      });
  };

  render() {
    return (
      <View style={styles.card}>
        <GiftedAvatar
          user={{
            name: this.props.item.name,
            avatar: this.props.item.photoUrl,
          }}
          avatarStyle={styles.image}
          textStyle={{fontSize: 30}}
        />
        <View style={styles.cardContent}>
          <Text style={styles.name}>{this.props.item.name}</Text>
          <TouchableOpacity
            onPress={() => {
              this._toggleFollowState(this.props.userId, this.props.item.uid);
            }}>
            {this.state.isFlowing ? (
              <Text style={styles.followButton}>Following</Text>
            ) : (
              <Text style={styles.followButton}>Follow</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
    ...state.users,
  };
};

export default connect(mapStateToProps, null)(UserListItem);

const styles = StyleSheet.create({
  userList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
    alignItems: 'flex-start',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: 'white',
    flexBasis: '46%',
    padding: 10,
    flexDirection: 'row',
  },

  name: {
    fontSize: 20,
    flex: 1,
    alignSelf: 'center',
    color: '#008080',
    fontWeight: 'bold',
  },

  followButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#00BFFF',
    alignContent: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    alignSelf: 'center',
  },
});
