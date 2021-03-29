import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {connect} from 'react-redux';
import {firebaseApp} from '../Components/FirebaseConfig';
import * as helper from '../database/database-helper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      productPrice: '',
      productImage: '',
      productDescription: '',
      phoneUser: '',
      addressUser: '',
      idProduct: '',
    };
  }

  componentDidMount() {
    const idProduct = this.props.navigation.getParam('idProduct');
    const name = this.props.navigation.getParam('productName');
    const price = this.props.navigation.getParam('productPrice');
    const image = this.props.navigation.getParam('productImage');

    console.log('image', image);
    this.setState({
      idProduct: idProduct,
      productName: name,
      productImage: image,
      productPrice: price,
    });
  }

  orderProduct() {
    Alert.alert(
      'Xác nhận đặt hàng',
      'Bạn có đồng ý mua sản phẩm không?',
      [
        {
          text: 'Không',
          onPress: () => console.log('Cancel'),
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => {
            firebaseApp.database().ref('Orders').push({
              idProduct: this.state.idProduct,
              productPrice: this.state.productPrice,
              productName: this.state.productName,
              productImage: this.state.productImage,
              idUser: this.props.userId,
              userName: this.props.userName,
              address: this.state.addressUser,
              phone: this.state.phoneUser,
            });

            this.setState({
              idProduct: null,
              productName: null,
              productDescription: null,
              productPrice: null,
              productImage: null,
              addressUser: null,
              phoneUser: null,
            });

            alert('Đặt hàng thành công');
          },
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <View>
        <View style={styles.box}>
          <Image style={styles.image} source={{uri: this.state.productImage}} />
          <View style={styles.boxContent}>
            <Text style={styles.title}>{this.state.productName}</Text>
            <Text style={styles.description}>
              {this.state.productPrice} VND
            </Text>
          </View>
        </View>
        <Text>Địa chỉ giao hàng</Text>
        <Text>Tên người nhận: {this.props.userName}</Text>
        <Text>Phí ship: </Text>
        <Text>Thuế: </Text>
        <Input
          placeholder="Địa chỉ"
          errorStyle={{color: 'red'}}
          errorMessage="ENTER A VALID ERROR HERE"
          onChangeText={(value) => this.setState({addressUser: value})}
        />
        <Input
          placeholder="Số điện thoại"
          errorStyle={{color: 'red'}}
          errorMessage="ENTER A VALID ERROR HERE"
          onChangeText={(value) => this.setState({phoneUser: value})}
        />
        <Text>Thuế: </Text>
        <Text>Tổng: {this.state.productPrice} VND</Text>
        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.orderProduct()}>
          <Text style={styles.loginText}>Đặt hàng</Text>
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

export default connect(mapStateToProps, null)(ProductDetail);
const styles = StyleSheet.create({
  loginText: {
    color: 'white',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#3498db',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
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