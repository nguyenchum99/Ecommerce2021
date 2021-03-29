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
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import EditInfoProduct from '../Components/EditInfoProduct';
import {firebaseApp} from '../Components/FirebaseConfig';


const {width, height} = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const numColumns = 3;
// item size
const RECIPE_ITEM_HEIGHT = 100;
const RECIPE_ITEM_OFFSET = 10;
const RECIPE_ITEM_MARGIN = RECIPE_ITEM_OFFSET * 2;
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
            this.refs.editModal.showEditModal(key);
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
    return (
      <View>
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
          keyExtractor={(item) => item.key.toString()}
          numColumns={3}
        /> */}

        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data={this.state.data}
          renderItem={({item}) => (
            <TouchableOpacity
              underlayColor="rgba(73,182,77,0.9)"
              onPress={() => this.selectProductEdit(item.key)}>
              <View style={styles.container}>
                <Image style={styles.photo} source={{uri: item.productImage}} />
                <Text style={styles.title}>{item.productName}</Text>
                <Text style={{color: 'grey'}}>{item.productPrice} VND</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => `${item.key}`}
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
    flex: 1,
    alignItems: 'center',
    margin: RECIPE_ITEM_OFFSET,
    marginTop: 30,
    width:
      (SCREEN_WIDTH - RECIPE_ITEM_MARGIN) / numColumns - RECIPE_ITEM_OFFSET,
    height: RECIPE_ITEM_HEIGHT + 60,
  },
  title: {
    margin: 10,
    marginBottom: 5,
    color: 'black',
    fontSize: 13,
    textAlign: 'center',
  },
  photo: {
    width:
      (SCREEN_WIDTH - RECIPE_ITEM_MARGIN) / numColumns - RECIPE_ITEM_OFFSET,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 60,
  },
});
