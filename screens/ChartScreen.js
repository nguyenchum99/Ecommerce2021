import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import {firebaseApp} from '../Components/FirebaseConfig';
import {Dimensions} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';

class ChartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      clickLikeItem: false,
      searchKey: '',
    };
  }

  componentDidMount() {
    //tinh so san pham duoc ban
    // console.log(this.props);
    firebaseApp
      .database()
      .ref('Orders')
      .orderByChild('idUserSell')
      .equalTo(this.props.userId)
      .on('value', (snapshot) => {
        const li = [];
        snapshot.forEach((child) => {
           // console.log(child.key);
          if (child.val().orderSuccess) {
            firebaseApp
              .database()
              .ref('Ratings')
              .orderByChild('key')
              .equalTo(child.key)
              .on('value', (snap) => {
                console.log(snap.child('rating').val());
                li.push({
                  key: child.key,
                  name: child.val().productName,
                  image: child.val().productImage,
                  total: child.val().total,
                  soLuong: child.val().soLuong,
                  createAt: child.val().createAt,
                  rating : snap.child('rating').val(),
                });
               
              });
            // li.push({
            //   key: child.key,
            //   name: child.val().productName,
            //   image: child.val().productImage,
            //   total: child.val().total,
            //   soLuong: child.val().soLuong,
            //   createAt: child.val().createAt,
            // });
          }
        });
        this.setState({
          data: li,
        });
        // console.log(this.state.data)
      });
  }

  render() {
    return (
      <View>
        <FlatList
          enableEmptySections={true}
          data={this.state.data}
          keyExtractor={(item) => {
            return item.key;
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>Không có sản phẩm nào</Text>
              </View>
            );
          }}
          renderItem={({item}) => {
            return (
              <View style={styles.box}>
                <Image style={styles.image} source={{uri: item.image}} />
                <View style={styles.boxContent}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text
                    style={styles.description}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    Tổng tiền: {item.total} VND
                  </Text>
                  <Text
                    style={styles.description}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    Số lượng đã bán: {item.soLuong}
                  </Text>
                  <Text
                    style={{color: '#000000', fontSize: 12}}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {moment(new Date(item.createAt)).fromNow()}
                  </Text>
                  <Text
                    style={{color: '#000000', fontSize: 12}}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {item.rating}
                  </Text>
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
  };
};

export default connect(mapStateToProps, null)(ChartScreen);

const styles = StyleSheet.create({
  screen: {flex: 1},
  header: {
    padding: 10,
    backgroundColor: 'lightgray',
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  image: {
    width: 70,
    height: 70,
  },
  box: {
    padding: 10,
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
    fontSize: 15,
    color: '#151515',
  },
  description: {
    fontSize: 12,
    color: 'tomato',
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
