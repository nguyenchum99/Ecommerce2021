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

class SellDetail extends React.Component {
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
      key: '',
      soLuong: '',
      total: '',
      location: '',
      soLuongProduct: '',
      confirmOrder: '',
      cancelOrder: '',
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
    const location = this.props.navigation.getParam('location');
    const soLuong = this.props.navigation.getParam('soLuong');
    const total = this.props.navigation.getParam('total');
    const key = this.props.navigation.getParam('key');

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
      location: location,
      total: total,
      soLuong: soLuong,
    });

    //lay so luong cua san pham
    firebaseApp
      .database()
      .ref(`Products/${idProduct}`)
      .on('value', (snapshot) => {
        this.state.soLuongProduct = snapshot.child('soLuong').val();
      });

    //check trang thai don hang
    firebaseApp
      .database()
      .ref(`Orders/${key}`)
      .on('value', (snapshot) => {
        this.state.confirmOrder = snapshot.child('orderSuccess').val();
        this.state.cancelOrder = snapshot.child('cancelOrder').val();
      });

    
  }

  xacThucDonHang() {
    Alert.alert('Xác thực', 'Xác nhận đơn hàng', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          if(this.state.soLuongProduct == 0){
            alert('Số lượng hàng đã hết');
            this.props.navigation.navigate('Manager');
          }else {
            // update trang thai don thanh cong
            firebaseApp.database().ref(`Orders/${this.state.key}`).update({
              orderSuccess: true,
            });
            //update san pham da ban
            firebaseApp
              .database()
              .ref(`Products/${this.state.idProduct}`)
              .update({
                sold: true,
                soLuong: this.state.soLuongProduct - this.state.soLuong,
              });
            alert('Xác nhận đơn hàng thành công');
            this.props.navigation.navigate('Manager');
          }
         
        },
      },
    ]);
  }

  huyDonHang = () => {
    Alert.alert('Hủy đơn', 'Xác nhận hủy đơn hàng', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          // update trang thai don thanh cong
          firebaseApp.database().ref(`Orders/${this.state.key}`).update({
            cancelOrder: true,
          });
          alert('Hủy đơn hàng thành công');
          this.props.navigation.navigate('Manager');
        },
      },
    ]);
  };

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
            <Text style={styles.description}>
              Số lượng hiện có: {this.state.soLuongProduct} 
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
            <ListItem.Title>Số lượng đặt mua: {this.state.soLuong}</ListItem.Title>
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
              <Text>Địa chỉ: {this.state.address} </Text>
            </ListItem.Title>
            <ListItem.Title>
              <Text>Tỉnh: {this.state.location} </Text>
            </ListItem.Title>
            <ListItem.Title>
              <Text>Số điện thoại: {this.state.phone} </Text>
            </ListItem.Title>
            <ListItem.Title>
              <Text>Tổng đơn hàng: {this.state.total} VNĐ</Text>
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        {this.state.cancelOrder ? (
          <Text
            style={{marginLeft: 20, marginTop: 10, color: 'red', fontSize: 18}}>
            Đơn hàng đã hủy
          </Text>
        ) : this.state.confirmOrder ? (
          <Text
            style={{marginLeft: 20, marginTop: 10, color: 'red', fontSize: 18}}>
            Đơn hàng xác nhận thành công
          </Text>
        ) : (
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.huyDonHang()}>
              <Text style={styles.loginText}>Hủy đơn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.xacThucDonHang()}>
              <Text style={styles.loginText}>Xác nhận đơn hàng</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(SellDetail);
const styles = StyleSheet.create({
  loginText: {
    color: 'white',
  },
  buttonContainer: {
    flex: 2,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    borderColor: '#ffffff',
    borderWidth: 1,
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
