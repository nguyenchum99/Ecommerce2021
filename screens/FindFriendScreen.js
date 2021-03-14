import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {firebaseApp} from '../Components/FirebaseConfig';


class FindFriendScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  // componentDidMount() {
  //   this.listAllUsers();
  // }

  // listAllUsers = (nextPageToken) => {
  //   // List batch of users, 1000 at a time.
  //   firebaseApp
  //     .auth()
  //     .listUsers(1000, nextPageToken)
  //     .then((listUsersResult) => {
  //       listUsersResult.users.forEach((userRecord) => {
  //         console.log('user', userRecord.toJSON());
  //       });
  //       if (listUsersResult.pageToken) {
  //         // List next batch of users.
  //         listAllUsers(listUsersResult.pageToken);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('Error listing users:', error);
  //     });
  // };

  render() {
    return (
      <View style={styles.container}>
        <Text>test</Text>
        {/* <FlatList
          data={this.state.data}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => this.selectProductEdit(item.key)}>
                <Image source={{uri: item.productImage}} style={styles.image} />
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <Text style={styles.title}>{item.productName}</Text>
                  <Text style={styles.price}>{item.productPrice} đ</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.key}
          numColumns={3}
        /> */}
      </View>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     ...state.auth,
//   };
// };

export default FindFriendScreen;
// export default connect(mapStateToProps, null)(FindFriendScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
