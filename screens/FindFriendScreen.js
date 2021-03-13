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

  

  render() {
      firebaseApp
        .database()
        .ref('users')
        .once('value', (snapshot) => {
          const li = [];
           console.log('listuser' + snapshot.val());
          snapshot.forEach((child) => {
            //   li.push({
            //     key: child.key,
            //     productName: child.val().name,
            //     productDescription: child.val().description,
            //     productPrice: child.val().price,
            //     productImage: child.val().imageUrl1,
            //     location: child.val().location,
            //     createAt: child.val().createAt,
            //   });
            console.log('listuser' + child.val().email);
          });

          //this.setState({data: li});
        });
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
