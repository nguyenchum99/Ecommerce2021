import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import EditInfoProduct from '../Components/EditInfoProduct';
import {firebaseApp} from '../Components/FirebaseConfig';

class ListingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    const userId = this.props.userId;
    firebaseApp
      .database()
      .ref('Products/')
      .orderByChild('idUser')
      .equalTo(userId)
      .on('value', (snapshot) => {
        const li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            productName: child.val().name,
            productDescription: child.val().description,
            productPrice: child.val().price,
            productImage: child.val().imageUrl1,
            location: child.val().location,
            createAt: child.val().createAt,
          });
        });

        this.setState({data: li});
      });
  }

  selectProductEdit = (key) => {
    Alert.alert(
      'Sửa thông tin sản phẩm',
      '',
      [
        {
          text: 'Xóa sản phẩm',
          onPress: () => {
            Alert.alert(
              'Cảnh báo',
              'Bạn có chắc muốn xóa không?',
              [
                {
                  text: 'Không',
                  onPress: () => console.log('Cancel'),
                  style: 'cancel',
                },
                {
                  text: 'Có',
                  onPress: () => {
                    firebaseApp.database().ref(`Products/${key}`).remove();
                    this.setState({
                      isLoading: true,
                    });
                    alert('Bạn đã xóa thành công');
                  },
                },
              ],
              {cancelable: false},
            );
          },
        },
        {
          text: 'Sửa thông tin',
          onPress: () => {
            this.refs.editModal.showEditModal(key)
             
          },
        },
      ],
      {cancelable: true},
      {
        onDismiss: () => {
          console.log('Dismissed');
        },
      },
    );
  };

  render() {
    console.log('info' + this.props);
    return (
      <View style={styles.container}>
        <FlatList
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
        />
        <EditInfoProduct ref={'editModal'} parentFlatList={this} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(ListingScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: '#e6e6e6',
  },
  image: {
    marginTop: 10,
    marginLeft: 50,
    marginRight: 10,
    width: 100,
    height: 150,
    justifyContent: 'center',
  },
  title: {
    marginLeft: 50,
    color: 'red',
    fontWeight: 'bold',
  },
  price: {
    marginLeft: 20,
    color: '#000000',
  },
});
