import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import ButtonGoBack from '../Components/ButtonGoBack';
import ButtonBuyItem from '../Components/ButtonBuyItem';
import ButtonChat from '../Components/ButtonChat';
import CardInfoShop from '../Components/CardInfoShop';
import ModalBuyItem from '../Components/ModalBuyItem';
import {SliderBox} from 'react-native-image-slider-box';
import {firebaseApp} from '../Components/FirebaseConfig';

export default class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        'https://source.unsplash.com/1024x768/?nature',
        'https://source.unsplash.com/1024x768/?water',
        'https://source.unsplash.com/1024x768/?girl',
        'https://source.unsplash.com/1024x768/?tree', // Network image
        // Local image
      ],
      nameProduct: '',
      priceProduct: '',
      descriptionProduct: '',
      imageProduct: '',
      idUser: '',
      idProduct: '',
    };
  }

  componentDidMount() {
    const idProduct = this.props.navigation.getParam('idProduct');
    this.setState({idProduct: idProduct});
    firebaseApp
      .database()
      .ref(`Products/${idProduct}`)
      .once('value', (snapshot) => {
        this.setState({
            nameProduct: snapshot.child('name').val(),
            priceProduct: snapshot.child('price').val(),
            descriptionProduct: snapshot.child('description').val(),
            imageProduct: snapshot.child('imageUrl1').val(),
            idUser: snapshot.child('idUser').val(),
        });
      });
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <SliderBox
            images={this.state.images}
            sliderBoxHeight={300}
            onCurrentImagePressed={(index) =>
              console.warn(`image ${index} pressed`)
            }
            currentImageEmitter={(index) =>
              console.warn(`current pos is: ${index}`)
            }
          />

          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 20,
            }}>
                {this.state.nameProduct} - {this.state.priceProduct}$
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 20,
              marginRight: 20,
            }}>
            <ButtonBuyItem
              onPress={() => this.refs.modalBuyItem.showAddModal()}
            />
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
            <Text>
            {this.state.descriptionProduct}
            </Text>
          </View>
          <CardInfoShop />
          <ModalBuyItem ref={'modalBuyItem'} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});
