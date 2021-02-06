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
    };
  }

  uploadImage = async () => {
    const reference = storage().ref('images');
    const pathToFile = `${this.state.productImage1}`;
    console.log(pathToFile)
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
                createAt: this.state.productCreateAt,
                timeUpdate: '',
                idUser: this.state.idUser,
              });

              this.setState({
                productName: '',
                productDescription: '',
                productPrice: '',
                productImage: '',
                productImage2: '',
                productCreateAt: '',
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
          onPress={() => this.uploadImage()}>
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
