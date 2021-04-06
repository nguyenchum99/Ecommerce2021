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
import {connect} from 'react-redux';
import {ListItem, Icon} from 'react-native-elements';
import {firebaseApp} from '../Components/FirebaseConfig';

class BuyConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      createAt: '',
      idProduct: '',
      idUser: '',
      phone: '',
      productImage: '',
      idProduct: '',
      productName: '',
      userPhoto: '',
      productPrice: '',
      userName: '',
      orderSuccess: '',
      soLuong: '',
      total: '',
      location: '',
      key: '',
      cancelOrder: '',
      receiveProductSuccess: ''
    };
  }

  componentDidMount() {
    const address = this.props.navigation.getParam('address');
    const createAt = this.props.navigation.getParam('createAt');
    const idProduct = this.props.navigation.getParam('idProduct');
    const idUser = this.props.navigation.getParam('idUser');
    const idUserSell = this.props.navigation.getParam('idUserSell');
    const phone = this.props.navigation.getParam('phone');
    const productImage = this.props.navigation.getParam('productImage');
    const productName = this.props.navigation.getParam('productName');
    const userPhoto = this.props.navigation.getParam('userPhoto');
    const productPrice = this.props.navigation.getParam('productPrice');
    const userName = this.props.navigation.getParam('userName');
    const key = this.props.navigation.getParam('key');
    const orderSuccess = this.props.navigation.getParam('orderSuccess');
    const soLuong = this.props.navigation.getParam('soLuong');
    const total = this.props.navigation.getParam('total');
    const location = this.props.navigation.getParam('location');
    const cancelOrder = this.props.navigation.getParam('cancelOrder');
   

    this.setState({
      address: address,
      createAt: createAt,
      idProduct: idProduct,
      idUser: idUser,
      phone: phone,
      productImage: productImage,
      idProduct: idProduct,
      productName: productName,
      userPhoto: userPhoto,
      productPrice: productPrice,
      userName: userName,
      key: key,
      orderSuccess: orderSuccess,
      soLuong: soLuong,
      total: total,
      location: location,
      cancelOrder: cancelOrder
    });

    //check ham da nhan don
  firebaseApp
    .database()
    .ref(`Orders/${key}`)
    .on('value', (snapshot) => {
      this.state.receiveProductSuccess = snapshot
        .child('receiveProductSuccess')
        .val();
     
    });

    
  }

  //xác nhận đã nhận được hàng thành công
  daNhanDon() {
    // update trang thai don thanh cong
    firebaseApp.database().ref(`Orders/${this.state.key}`).update({
      receiveProductSuccess: true,
    });

    this.props.navigation.navigate('Rating', {
      address: this.state.address,
      createAt: this.state.createAt,
      idProduct: this.state.idProduct,
      idUser: this.state.idUser,
      phone: this.state.phone,
      productImage: this.state.productImage,
      idProduct: this.state.idProduct,
      productName: this.state.productName,
      userPhoto: this.state.userPhoto,
      productPrice: this.state.productPrice,
      userName: this.state.userName,
      key: this.state.key,
      orderSuccess: this.state.orderSuccess,
      idUserSell: this.state.idUserSell,
    });
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
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Mã đơn hàng: {this.state.key}</ListItem.Title>
            <ListItem.Title>
              Tên người mua: {this.state.userName}
            </ListItem.Title>
            <ListItem.Title>
              Thời gian đặt: {this.state.createAt}
            </ListItem.Title>
            <ListItem.Title>Số lượng: {this.state.soLuong}</ListItem.Title>
            <ListItem.Title>
              Đơn giá: {this.state.productPrice} VNĐ
            </ListItem.Title>
            <ListItem.Title>
              <Text>Phí ship: </Text>
            </ListItem.Title>
            <ListItem.Title>
              <Text>Thuế: </Text>
            </ListItem.Title>
            <ListItem.Title>
              <Text>Địa chỉ cụ thể: {this.state.address} </Text>
            </ListItem.Title>
            <ListItem.Title>
              <Text>Tỉnh: {this.state.location} </Text>
            </ListItem.Title>
            <ListItem.Title>
              <Text>Số điện thoại: {this.state.phone} </Text>
            </ListItem.Title>
            <ListItem.Title>
              Tổng đơn hàng: {this.state.total} VNĐ
            </ListItem.Title>
            <ListItem.Title>
              {this.state.cancelOrder ? (
                <Text style={{color: 'red', fontSize: 18}}>
                  Đơn hàng của bạn đã bị hủy
                </Text>
              ) : (
                <Text style={{color: 'red', fontSize: 18}}>
                  Trạng thái giao dịch{' '}
                  {this.state.orderSuccess ? (
                    <Text>thành công</Text>
                  ) : (
                    <Text>chưa được xác nhận</Text>
                  )}
                </Text>
              )}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>

        {this.state.orderSuccess ? (
          <TouchableOpacity
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => this.daNhanDon()}>
            <Text style={styles.loginText}>Đã nhận đơn</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(BuyConfirm);
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
    marginTop: 20,
    marginLeft: 80,
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
