import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  PermissionsAndroid,
  Alert,
  Platform,
  TextInput,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {firebaseApp} from '../Components/FirebaseConfig';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import RNPickerSelect from 'react-native-picker-select';


const city = [
  {label: "Hà Nội", value: "Hà Nội"},
  {label: "Hà Giang", value: "Hà Giang"},
  {label: "Cao Bằng", value: "Cao Bằng"},
  {label: "Bắc Kạn", value: "Bắc Kạn"},
  {label: "Tuyên Quang", value: "Tuyên Quang"},
  {label: "Lào Cai", value: "Lào Cai"},
  {label: "Điện Biên", value: "Điện Biên"},
  {label: "Lai Châu", value: "Lai Châu"},
  {label: "Sơn La", value: "Sơn La"},
  {label: "Yên Bái", value: "Yên Bái"},
  {label: "Hoà Bình", value: "Hoà Bình"},
  {label: "Thái Nguyên", value: "Thái Nguyên"},
  {label: "Lạng Sơn", value: "Lạng Sơn"},
  {label: "Quảng Ninh", value: "Quảng Ninh"},
  {label: "Bắc Giang", value: "Bắc Giang"},
  {label: "Phú Thọ", value: "Phú Thọ"},
  {label: "Vĩnh Phúc", value: "Vĩnh Phúc"},
  {label: "Bắc Ninh", value: "Bắc Ninh"},
  {label: "Hải Dương", value: "Hải Dương"},
  {label: "Hải Phòng", value: "Hải Phòng"},
  {label: "Hưng Yên", value: "Hưng Yên"},
  {label: "Thái Bình", value: "Thái Bình"},
  {label: "Hà Nam", value: "Hà Nam"},
  {label: "Nam Định", value: "Nam Định"},
  {label: "Ninh Bình", value: "Ninh Bình"},
  {label: "Thanh Hóa", value: "Thanh Hóa"},
  {label: "Nghệ An", value: "Nghệ An"},
  {label: "Hà ", value: "Hà "},
  {label: "Quảng Bình", value: "Quảng Bình"},
  {label: "Quảng Trị", value: "Quảng Trị"},
  {label: "Thừa Thiên Huế", value: "Thừa Thiên Huế"},
  {label: "Đà Nẵng", value: "Đà Nẵng"},
  {label: "Quảng Nam", value: "Quảng Nam"},
  {label: "Quảng Ngãi", value: "Quảng Ngãi"},
  {label: "Bình Định", value: "Bình Định"},
  {label: "Phú Yên", value: "Phú Yên"},
  {label: "Khánh Hòa", value: "Khánh Hòa"},
  {label: "Ninh Thuận", value: "Ninh Thuận"},
  {label: "Bình Thuận", value: "Bình Thuận"},
  {label: "Kon Tum", value: "Kon Tum"},
  {label: "Gia Lai", value: "Gia Lai"},
  {label: "Đắk Lắk", value: "Đắk Lắk"},
  {label: "Đắk Nông", value: "Đắk Nông"},
  {label: "Lâm Đồng", value: "Lâm Đồng"},
  {label: "Bình Phước", value: "Bình Phước"},
  {label: "Tây Ninh", value: "Tây Ninh"},
  {label: "Bình Dương", value: "Bình Dương"},
  {label: "Đồng Nai", value: "Đồng Nai"},
  {label: "Bà Rịa - Vũng Tàu", value: "Bà Rịa - Vũng Tàu"},
  {label: "Hồ Chí Minh", value: "Hồ Chí Minh"},
  {label: "Long An", value: "Long An"},
  {label: "Tiền Giang", value: "Tiền Giang"},
  {label: "Bến Tre", value: "Bến Tre"},
  {label: "Trà Vinh", value: "Trà Vinh"},
  {label: "Vĩnh Long", value: "Vĩnh Long"},
  {label: "Đồng Tháp", value: "Đồng Tháp"},
  {label: "An Giang", value: "An Giang"},
  {label: "Kiên Giang", value: "Kiên Giang"},
  {label: "Cần Thơ", value: "Cần Thơ"},
  {label: "Hậu Giang", value: "Hậu Giang"},
  {label: "Sóc Trăng", value: "Sóc Trăng"},
  {label: "Bạc Liêu", value: "Bạc Liêu"},
  {label: "Cà Mau", value: "Cà Mau"},
  ];
export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.productRef = firebaseApp.database();
    this.state = {
      productName: '',
      productDescription: '',
      productPrice: '',
      productImage1: null,
      productImage2: '',
      productImage3: '',
      productCreateAt: '',
      productCategory: '',
      idUser: '',
      location: '',
 
    };
  }

  uploadImage = async () => {
    const reference = storage().ref(`${this.state.productImage1}`);
    const pathToFile = `${this.state.productImage1}`;
    //console.log(pathToFile)
    // uploads file
    await reference.putFile(pathToFile);
  };

  //tạo sản phẩm
  addNewproduct = () => {
  
    if (
      this.state.productName.length == 0 ||
      this.state.productPrice.length == 0 ||
      this.state.productDescription.length == 0
    ) {
      alert('Bạn phải nhập đầy đủ thông tin');
    } else {
      Alert.alert(
        'Thông báo',
        'Bạn có chắc muốn tạo món mới không ?',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              // const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/${this.state.productImage1}`;
              // // uploads file
              // await reference.putFile(pathToFile);
              this.uploadImage();
              this.productRef.ref('Products').push({
                name: this.state.productName,
                description: this.state.productDescription,
                price: this.state.productPrice,
                imageUrl1: this.state.productImage1,
                imageUrl2: this.state.productImage2,
                imageUrl3: this.state.productImage3,
                createAt: new Date().toString(),
                timeUpdate: '',
                idUser: this.state.idUser,
                location: this.state.location
              });

              this.setState({
                productName: '',
                productDescription: '',
                productPrice: '',
                productImage: '',
                productImage2: '',
                productCreateAt: '',
                location: '',
              });
              // this.props.navigation.navigate('Listproduct')
              return <ActivityIndicator size="small" color="#0000ff" />;
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  takeCamera = () => {
    this.setState({productImage1: ''});
    launchCamera({}, (response) => {
      console.log(response.uri);
      this.setState({productImage1: response.uri});
    });
  };

  takePhotoLibrary = () => {
    launchImageLibrary({}, (response) => {
      console.log(response.uri);
      this.setState({productImage1: response.uri});
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.title}>Sell your product</Text>
        <Text style={styles.text}>What are you selling? </Text>
        <Text style={styles.text}>Upload clear photos for more offers</Text>
        <TextInput
          placeholder="Name..."
          style={styles.input}
          onChangeText={(productName) => this.setState({productName})}
          value={this.state.productName}></TextInput>
        <TextInput
          keyboardType='numeric'
          placeholder="Price..."
          style={styles.input}
          onChangeText={(productPrice) => this.setState({productPrice})}
          value={this.state.productPrice}></TextInput>
        <TextInput
          placeholder="Description..."
          style={styles.input}
          onChangeText={(productDescription) =>
            this.setState({productDescription})
          }
          value={this.state.productDescription}></TextInput>
        <View  style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
          <RNPickerSelect
            onValueChange={(value) => this.setState({location: value})}
            items={city}
            placeholder={{
              label: 'Select a city...',
              value: this.state.location,
            }}
           value = {this.state.location}
           
          />
        </View>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={this.takeCamera}>
              <Image
                source={require('../assets/icons/icons8-camera-40.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.takePhotoLibrary}>
              <Image
                source={require('../assets/icons/icons8-photo-gallery-40.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginLeft: 20}}>
            <Image
              style={styles.imageUrl}
              source={{uri: this.state.productImage1}}></Image>
            <Image
              style={styles.imageUrl}
              source={{uri: this.state.productImage2}}></Image>
            <Image
              style={styles.imageUrl}
              source={{uri: this.state.productImage3}}></Image>
          </View>
        </View>

        <TouchableOpacity style={styles.choose}>
          <Text style={styles.textBtn}>Choose category</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.addNewproduct()}>
          <Text style={styles.textbutton}>Ok</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
  },
  text: {
    color: '#000000',
    fontSize: 20,
    marginLeft: 20,
  },
  imageUrl: {
    width: 80,
    height: 80,
    marginTop: 20,
    marginRight: 20,
  },
  icon: {
    height: 50,
    width: 50,
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
  },
  choose: {
    padding: 15,
    borderColor: '#d9d9d9',
    borderWidth: 0.5,
    margin: 20,
    borderRadius: 10,
  },
  textBtn: {
    color: '#000000',
  },
  button: {
    backgroundColor: '#ff8533',
    padding: 10,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  textbutton: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#3399ff',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});
