import React from 'react';
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input, ListItem} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import {connect} from 'react-redux';
import {CITIES} from '../constants/Cities';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import PhoneNumberInput from '../Components/UI/PhoneNumberInput';

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
      idUserSell: '',
      location: 'Hà Nội',
      soLuong: '',
      soLuongOrder: '',
      total: '',
      codeVerification: '',
      confirmation: null,
    };
  }

  // Handle the button press
  signInWithPhoneNumber = async (phoneNumber) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    this.setState({confirmation: confirmation});
  };

  confirmCode = (code) => {
    // alert('Order successfully');
    
      this.state.confirmation.confirm(code).then(() => {
        console.log('Success');
        alert('Đặt hàng thành công');
        database()
          .ref('Orders')
          .push({
            idProduct: this.state.idProduct,
            productPrice: this.state.productPrice,
            productName: this.state.productName,
            productImage: this.state.productImage,
            idUser: this.props.userId,
            userName: this.props.userName,
            userPhoto: this.props.userPhoto,
            address: this.state.addressUser,
            phone: this.state.phoneUser,
            idUserSell: this.state.idUserSell,
            location: this.state.location,
            createAt: new Date().toString('YYYY-MM-DD hh:mm:ss'),
            soLuong: this.state.soLuongOrder,
            total: this.state.soLuongOrder * this.state.productPrice,
          });

        //post notification order
        const newRef = database().ref('Notifications').push();
        newRef.set({
          uid1: this.props.userId,
          userName: this.props.userName,
          uid2: this.state.idUserSell,
          content: `${this.props.userName} đã đặt sản phẩm ${this.state.productName} của bạn`,
          createdAt: new Date().toISOString(),
          avatarUser: this.props.userPhoto,
          attachment: this.state.productImage,
          idProduct: this.state.idProduct,
          productName: this.state.productName,
          productPrice: this.state.productPrice,
          type: 'order',
        });

        // alert('Đặt hàng thành công');
        this.props.navigation.navigate('OrderSuccess', {
          idProduct: this.state.idProduct,
        });

        this.setState({
          idProduct: null,
          productName: null,
          productDescription: null,
          productPrice: null,
          productImage: null,
          addressUser: null,
          phoneUser: null,
          idUserSell: null,
        });
      });
   
  };

  componentDidMount() {
    const idProduct = this.props.navigation.getParam('idProduct');
    const name = this.props.navigation.getParam('productName');
    const price = this.props.navigation.getParam('productPrice');
    const image = this.props.navigation.getParam('productImage');
    const idUserSell = this.props.navigation.getParam('idUserSell');
    const soLuong = this.props.navigation.getParam('soLuong');

    this.setState({
      idProduct: idProduct,
      productName: name,
      productImage: image,
      productPrice: price,
      idUserSell: idUserSell,
      soLuong: soLuong,
    });
  }

  //xac thuc so dien thoai
  // verifyPhoneNumber = async (phoneNumber)=>{
  //   const confirmation = await auth().verifyPhoneNumber(phoneNumber);
  //   this.setState({codeVerification: confirmation});
  // }

  //  // Handle confirm code button press
  // confirmCode = async () =>{
  //   try {
  //     const credential = auth.PhoneAuthProvider.credential(
  //       confirm.verificationId,
  //       this.state.codeVerification,
  //     );

  //   } catch (error) {
  //     if (error.code == 'auth/invalid-verification-code') {
  //       console.log('Invalid code.');
  //     } else {
  //       console.log('Account linking error');
  //     }
  //   }
  // }

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
            // console.log('Phone number', this.state.phoneUser);
            // this.signInWithPhoneNumber(this.state.phoneUser);
            if(this.state.addressUser == ''){
              alert('Bạn phải nhập địa chỉ nhận hàng');
            }
            else if (
              this.state.soLuongOrder == 0 ||
              this.state.soLuongOrder == ''
            ) {
              alert('Bạn phải nhập số lượng đặt mua');
            }
            else if (this.state.soLuongOrder <= this.state.soLuong) {
              this.signInWithPhoneNumber(this.state.phoneUser);
              // database()
              //   .ref('Orders')
              //   .push({
              //     idProduct: this.state.idProduct,
              //     productPrice: this.state.productPrice,
              //     productName: this.state.productName,
              //     productImage: this.state.productImage,
              //     idUser: this.props.userId,
              //     userName: this.props.userName,
              //     userPhoto: this.props.userPhoto,
              //     address: this.state.addressUser,
              //     phone: this.state.phoneUser,
              //     idUserSell: this.state.idUserSell,
              //     location: this.state.location,
              //     createAt: new Date().toString('YYYY-MM-DD hh:mm:ss'),
              //     soLuong: this.state.soLuongOrder,
              //     total: this.state.soLuongOrder * this.state.productPrice,
              //   });

              // //post notification order
              // const newRef = database().ref('Notifications').push();
              // newRef.set({
              //   uid1: this.props.userId,
              //   userName: this.props.userName,
              //   uid2: this.state.idUserSell,
              //   content: `${this.props.userName} đã đặt sản phẩm ${this.state.productName} của bạn`,
              //   createdAt: new Date().toISOString(),
              //   avatarUser: this.props.userPhoto,
              //   attachment: this.state.productImage,
              //   idProduct: this.state.idProduct,
              //   productName: this.state.productName,
              //   productPrice: this.state.productPrice,
              //   type: 'order',
              // });

              // // alert('Đặt hàng thành công');
              // this.props.navigation.navigate('OrderSuccess', {
              //   idProduct: this.state.idProduct,
              // });

              // this.setState({
              //   idProduct: null,
              //   productName: null,
              //   productDescription: null,
              //   productPrice: null,
              //   productImage: null,
              //   addressUser: null,
              //   phoneUser: null,
              //   idUserSell: null,
              // });
            } else {
              alert(
                'Số lượng đặt mua phải nhỏ hơn hoặc bằng số lượng của sản phẩm',
              );
            }
          },
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    console.log('number', this.state.addressUser + ' ' + this.state.soLuong);
    return (
      <ScrollView>
        <View style={styles.box}>
          <Image style={styles.image} source={{uri: this.state.productImage}} />
          <View style={styles.boxContent}>
            <Text style={styles.title}>{this.state.productName}</Text>
            <Text style={styles.description}>
              {this.state.productPrice} VND
            </Text>
            <Text style={styles.description}>
              Số lượng: {this.state.soLuong}
            </Text>
          </View>
        </View>
        <View style={styles.box2}>
          <Text style={styles.title2}>
            Tên người nhận: {this.props.userName}
          </Text>
          <Text style={styles.title2}>Địa chỉ nhận hàng</Text>
          <Input
            placeholder="..."
            onChangeText={(value) => this.setState({addressUser: value})}
          />
          <View style={{marginTop: 10}}>
            <Text style={styles.title2}>Chọn địa điểm</Text>
            <RNPickerSelect
              onValueChange={(location) => this.setState({location})}
              items={CITIES}
              useNativeAndroidPickerStyle={true}
              placeholder={{
                label: this.state.location,
                value: this.state.location,
              }}
              value={this.state.location}
            />
          </View>
          <Text style={styles.title2}>Số lượng</Text>
          <Input
            placeholder="..."
            keyboardType="numeric"
            onChangeText={(value) => this.setState({soLuongOrder: value})}
          />
          <PhoneNumberInput
            onChangeText={(text) => {
              this.setState({phoneUser: text});
            }}
          />
          {this.state.confirmation && (
            <View>
              <Text style={styles.title2}>Mã xác nhận</Text>
              <Input
                placeholder="..."
                onChangeText={(value) =>
                  this.setState({codeVerification: value})
                }
                keyboardType="number-pad"
              />
              <TouchableOpacity
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => {
                  this.confirmCode(this.state.codeVerification);
                }}>
                <Text style={{color: '#ffffff'}}>Xác thực mã code</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>
              <Text style={styles.title}>
                Tổng: {this.state.soLuongOrder * this.state.productPrice} VND
              </Text>
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <View style = {{marginTop: 10}}>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => this.orderProduct()}>
            <Text style={styles.loginText}>Đặt hàng</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginLeft: 80,
  },
  loginButton: {
    backgroundColor: '#3498db',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginLeft: 10,
    marginHorizontal: 10,
  },
  box: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  box2: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
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
  title2: {
    fontSize: 15,
    color: '#151515',
    marginLeft: 10,
    marginBottom: 10,
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
