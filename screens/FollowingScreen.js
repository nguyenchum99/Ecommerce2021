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
import {firebaseApp} from '../Components/FirebaseConfig';



class FollowingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser: [],
      users: [],
    };
  }

  // clickEventListener = (item) => {
  //   this.setState({userSelected: item}, () => {
  //     this.setModalVisible(true);
  //   });
  // };

  // setModalVisible(visible) {
  //   this.setState({modalVisible: visible});
  // }

  _unfollow(key) {
    firebaseApp.database().ref(`Follows/${key}`).update({
      isFollowing: false,
    });
  }

  componentDidMount() {
    firebaseApp
      .database()
      .ref('Follows')
      .orderByChild('myUserid')
      .equalTo(this.props.userId)
      .on('value', (snapshot) => {
        const user = [];
        // console.log("snapshop", snapshot.val())
        snapshot.forEach((child) => {
          // console.log('following sjdkfhfs', child.val());
          if (child.val().isFollowing === true) {
            // console.log('following sjdkfhfs', child.key);
           
            firebaseApp
              .database()
              .ref('Users/')
              .orderByChild('uid')
              .equalTo(child.val().userId)
              .on('value', (snap) => {
               
                // const info = [];
                // console.log('nguyen snapnsajsoidj', snap.val());
                snap.forEach((item) => {
                  // console.log('nguyen nguyen nguyen', child.key);

                  user.push({
                    key: child.key,
                    userId: item.val().uid,
                    name: item.val().name,
                    email: item.val().email,
                    photoUrl: item.val().photoUrl,
                    isFollowing: child.val().isFollowing,
                  });
                  console.log('delete', user);
                  this.setState({listUser: user});
                  console.log("list",this.state.listUser)
                });
                //  this.setState({listUser: info});
                //  console.log('following sjdkfhfs', this.state.listUser);
              });
            
          }
          this.setState({listUser: user});
        });
      });
  }

  render() {
    
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.userList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.listUser}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => {
            return (
              <View style={styles.card}>
                <Image style={styles.image} source={{uri: item.photoUrl}} />
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.name}</Text>
                  <TouchableOpacity
                    style={styles.followButton}
                    onPress={() => this._unfollow(item.key)}>
                    <Text style={styles.followButtonText}>Unfollow</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
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

export default connect(mapStateToProps, null)(FollowingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#eeeeee',
  },
  header: {
    backgroundColor: '#00CED1',
    height: 200,
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
    flex: 1,
  },
  detailContent: {
    top: 80,
    height: 500,
    width: Dimensions.get('screen').width - 90,
    marginHorizontal: 30,
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#ffffff',
  },
  userList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
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
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: '#008080',
    fontWeight: 'bold',
  },
  position: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: '#696969',
  },
  about: {
    marginHorizontal: 10,
  },

  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  /************ modals ************/
  popup: {
    backgroundColor: 'white',
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: '#00000057',
    flex: 1,
    marginTop: 30,
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height: 250,
  },
  popupHeader: {
    marginBottom: 45,
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
  },
  popupButton: {
    flex: 1,
    marginVertical: 16,
  },
  btnClose: {
    height: 20,
    backgroundColor: '#20b2aa',
    padding: 20,
  },
  modalInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
