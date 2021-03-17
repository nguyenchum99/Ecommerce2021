import storage from '@react-native-firebase/storage';
import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Picker
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { firebaseApp } from '../Components/FirebaseConfig';
import { CITIES } from '../constants/Cities';
import { Hoshi } from 'react-native-textinput-effects';


const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};


const category = [
  { label: 'Thời trang', value: 'Thời trang' },
  { label: 'Điện thoại', value: 'Điện thoại' },
  { label: 'Đồ gia dụng', value: 'Đồ gia dụng' }];

const status = [
  { label: 'Mới', value: 'Mới' },
  { label: 'Cũ', value: 'Cũ' },
];

const productRef = firebaseApp.database();

class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      productDescription: '',
      productPrice: '',
      productImage1: '',
      productCreateAt: '',
      productCategory: 'Thời trang',
      idUser: '',
      location: 'Hà Nội',
      userName: '',
      productStatus: 'Mới'
    };
  }

  componentDidMount() {
    const category = this.props.navigation.getParam('category');
    console.log('get param' + category);
  }


  uploadImage = async () => {
    const reference = firebaseApp.storage().ref(`${productImage1}`);
    const pathToFile = `${productImage1}`;
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
              if (
                this.state.productName == null ||
                this.state.productPrice == null ||
                this.state.productDescription == null 
              
              ) {
                alert('Bạn phải nhập đầy đủ thông tin');
              } else {
                this.uploadImage();
                productRef.ref('Products').push({
                  name: this.state.productName,
                  description: this.state.productDescription,
                  price: this.state.productPrice,
                  imageUrl1: this.state.productImage1,
                  createAt: new Date().toISOString(),
                  timeUpdate: '',
                  location: this.state.location,
                  idUser: this.props.userId,
                  userName: this.props.userName,
                  category: this.state.productCategory,
                  status: this.state.productStatus,
                });

                this.setState({
                  productName: null,
                  productDescription: null,
                  productPrice: null,
                  productImage1: null,
                  productCreateAt: null,
                  productDescription: null,
                });
                this.props.navigation.navigate('Home');
              }
            },
          },
        ],
        { cancelable: false },
      );
    }
  };

  takeCamera = () => {
    ImagePicker.launchCamera(options, (response) => {
      // Same code as in above section!
      console.log('take phpto' + response.uri);

      this.setState({ productImage1: response.uri });
    });
  };

  takePhotoLibrary = () => {
    // launchImageLibrary({}, (response) => {
    //   console.log(response.uri);
    //   this.setState({productImage1: response.uri});
    // });
    ImagePicker.launchImageLibrary(options, (response) => {
      // Same code as in above section!
      console.log(response.uri);
      //setProductImage1(response.uri);
      this.setState({ productImage1: response.uri });
    });
  };

  takeImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      this.setState({ productImage1: '' })
      if (response.didCancel) {

      } else if (response.error) {

      } else if (response.customButton) {
      } else {
        const source = { uri: response.uri };
        this.setState({
          productImage1: response.uri,
        });

        this.uploadImage();

      }
    });
  }


  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Tạo sản phẩm của bạn</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 3, marginLeft: 20 }}>
            <Text >Tên sản phẩm</Text>
            <TextInput
              placeholder="..."
              style={styles.input}
              onChangeText={(productName) => this.setState({ productName })}
              value={this.state.productName}></TextInput>
          </View>
          <View style={{ flex: 2, marginRight: 20, marginLeft: 10 }}>
            <Text>Đơn giá (VNĐ)</Text>
            <TextInput
              keyboardType="numeric"
              placeholder="..."
              style={styles.input}

              onChangeText={(productPrice) => this.setState({ productPrice })}
              value={this.state.productPrice}></TextInput>
          </View>

        </View>
        <View style={{ marginRight: 20, marginLeft: 20, marginTop: 10 }}>
          <Text>Mô tả sản phẩm:</Text>
          <TextInput
            placeholder="..."
            style={{
              textAlignVertical: "top", borderWidth: 1,
              borderColor: '#3399ff',
              borderRadius: 10,
              marginTop: 10
            }}
            numberOfLines={3}
            onChangeText={(productDescription) =>
              this.setState({ productDescription })
            }
            value={this.state.productDescription}></TextInput>
        </View>
        <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
          <Text>Chọn địa điểm</Text>
          <RNPickerSelect
            onValueChange={(location) => this.setState({ location })}
            items={CITIES}
            useNativeAndroidPickerStyle={true}
            placeholder={{
              label: this.state.location,
              value: this.state.location,
            }}
            value={this.state.location}
          />
        </View>
        <View style={{ marginTop: 10, flexDirection: 'row' }}>
          <View style={{ flex: 3, marginLeft: 20 }}>
            <Text>Danh mục</Text>
            <RNPickerSelect
              onValueChange={(productCategory) => this.setState({ productCategory })}
              items={category}
              useNativeAndroidPickerStyle={true}
              placeholder={{
                label: this.state.productCategory,
                value: this.state.productCategory,
              }}
              value={this.state.productCategory}
            />
          </View>
          <View style={{ flex: 3, marginRight: 20 }}>
            <Text>Tình trạng</Text>
            <RNPickerSelect
              onValueChange={(productStatus) => this.setState({ productStatus })}
              items={status}
              useNativeAndroidPickerStyle={true}
              placeholder={{
                label: this.state.productCategory,
                value: this.state.productStatus,
              }}
              value={this.state.productStatus}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.takeImage()}>
            <Image
              source={require('../assets/icons/add.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Image
            style={styles.imageUrl}
            source={{ uri: this.state.productImage1 }}></Image>
          {/* <TouchableOpacity onPress={() => this.takePhotoLibrary()}>
              <Image
                source={require('../assets/icons/icons8-photo-gallery-40.png')}
                style={styles.icon}
              />
            </TouchableOpacity> */}
        </View>


        {/* <TouchableOpacity
          style={styles.choose}
          onPress={() => this.props.navigation.navigate('Category')}>
          <Text style={styles.textBtn}>Choose category</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.addNewproduct()}>
          <Text style={styles.textbutton}>Ok</Text>
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

export default connect(mapStateToProps, null)(CameraScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
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
    justifyContent: 'flex-end',
    
    
  },
  textbutton: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#3399ff',
    borderRadius: 10,
    marginTop: 10

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
