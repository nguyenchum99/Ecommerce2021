import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonBuyItem from '../Components/ButtonBuyItem';
import ButtonChat from '../Components/ButtonChat';
import {firebaseApp} from '../Components/FirebaseConfig';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      productDescription: '',
      productPrice: '',
      productImage1: '',
      productCreateAt: '',
      productCategory: '',
      idUser: '',
      location: '',
      userName: '',
      idProduct: '',
    };
  }

  componentDidMount() {
    const idProduct = this.props.navigation.getParam('idProduct');
    console.log(idProduct);
    this.setState({idProduct: idProduct});
  }

  render() {
    firebaseApp
      .database()
      .ref(`Products/${this.state.idProduct}`)
      .once('value', (snapshot) => {
        this.state.productName = snapshot.child('name').val();
        this.state.productDescription = snapshot.child('description').val();
        this.state.productPrice = snapshot.child('price').val();
        this.state.productImage1 = snapshot.child('imageUrl1').val();
        this.state.productCreateAt = snapshot.child('createAt').val();
        this.state.productCategory = snapshot.child('description').val();
        this.state.idUser = snapshot.child('idUser').val();
        this.state.userName = snapshot.child('userName').val();
        this.state.location = snapshot.child('location').val();
        console.log(this.state.productName);
      });
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
            style={{height: 200, width: 200, marginLeft: 20}}
            source={{uri: this.state.productImage1}}></Image>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 20,
            }}>
            {this.state.productName} - {this.state.productPrice} $
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
            <Text>{this.state.productDescription}</Text>
          </View>
          <TouchableOpacity style={styles.card}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/icons/avatar.png')}
                style={styles.image}
              />
              <Text style={styles.title}>{this.state.userName}</Text>
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
  }
}

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  card: {
    height: 100,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
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
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  price: {
    marginLeft: 20,
    color: '#000000',
  },
});
