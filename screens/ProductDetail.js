import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import ButtonGoBack from '../Components/ButtonGoBack';
import ButtonBuyItem from '../Components/ButtonBuyItem';
import ButtonChat from '../Components/ButtonChat';
import CardInfoShop from '../Components/CardInfoShop';
import ModalBuyItem from '../Components/ModalBuyItem';
import {SliderBox} from 'react-native-image-slider-box';
import {firebaseApp} from '../Components/FirebaseConfig';
import {useSelector} from 'react-redux';

const ProductDetail = (props) => {
  const [productName, setProductName] = useState();
  const [productDescription, setProductDescription] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productImage1, setProductImage1] = useState();
  const [productImage2, setProductImage2] = useState();
  const [productImage3, setProductImage3] = useState();
  const [productCreateAt, setProductCreateAt] = useState();
  const [productCategory, setProductCategory] = useState();
  const [idUser, setIdUser] = useState();
  const [location, setLocation] = useState();
  const [userName, setUserName] = useState();

  useEffect(() => {
    const idProduct = props.navigation.getParam('idProduct');
    console.log('product' + idProduct);
    firebaseApp
      .database()
      .ref(`Products/${idProduct}`)
      .once('value', (snapshot) => {
        setProductName(snapshot.child('name').val());
        setProductDescription(snapshot.child('description').val());
        setProductPrice(snapshot.child('price').val());
        setProductImage1(snapshot.child('imageUrl1').val());
        setProductImage2(null);
        setProductImage3(null);
        setProductCreateAt(null);
        setLocation(snapshot.child('location').val());
        setIdUser(snapshot.child('idUser').val());
       // productName = snapshot.child('name').val();
        // productPrice = snapshot.child('price').val();
        // productDescription = snapshot.child('description').val();
        // location = snapshot.child('location').val();
        // productImage1= snapshot.child('imageUrl1').val();
      });
   // console.log('product' + productName);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* <SliderBox
            images={this.state.images }
            sliderBoxHeight={300}
            onCurrentImagePressed={(index) =>
              console.warn(`image ${index} pressed`)
            }
            currentImageEmitter={(index) =>
              console.warn(`current pos is: ${index}`)
            }
          /> */}
        <Image
          style={{height: 300, width: 100}}
          source={{uri: productImage1}}></Image>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 20,
            marginTop: 20,
            marginBottom: 20,
          }}>
          {productName} - {productPrice}$
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 20,
            marginRight: 20,
          }}>
          <ButtonBuyItem />
          <ButtonChat />
        </View>
        <View
          style={{
            marginTop: 10,
            marginLeft: 20,
            marginRight: 20,
            padding: 5,
            borderRadius: 10,
            backgroundColor: '#ffffff',
          }}>
          <Text>{productDescription}</Text>
        </View>
        <TouchableOpacity style={styles.card} onPress={props.onPress}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../assets/icons/avatar.png')}
              style={styles.image}
            />
            <Text style={styles.title}>{userName}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <Text>List</Text>
            <Text>Sold</Text>
            <Text>Rating</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  card: {
    height: 100,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  
  },
  image: {
    marginTop: 10,
    marginLeft: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  title: {
    marginTop: 20,
    marginLeft: 20,
    color: "#000000",
    fontWeight: "bold",
    fontSize: 15,
  },
  price: {
    marginLeft: 20,
    color: "#000000",
  },
});
