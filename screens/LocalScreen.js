import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {Component} from 'react';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {firebaseApp} from '../Components/FirebaseConfig';

const soundImg = '../assets/icons/heart.png';
const muteImg = '../assets/heart (1).png';

export default class LocalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database();
    this.state = {
      data: [],
      isLoading: true,
      showLikeImg: true,
      imageLike: '../assets/icons/heart.png',
    };
  }

  changeImage() {
    this.setState({
      showLikeImg: false,
    });
    console.log('image' + this.state.imageLike);
  }

  componentDidMount() {
    //console.log('nguyen');
    this.itemRef.ref('Products').on('value', (snapshot) => {
      var li = [];
      snapshot.forEach((child) => {
        li.push({
          key: child.key,
          name: child.val().name,
          description: child.val().description,
          price: child.val().price,
          imageUrl: child.val().imageUrl1,
        });
      });
      this.setState({data: li});
      console.log(this.state.data);
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({item, index}) => {
            return (
              <View style={styles.card}>
                {/* <TouchableOpacity onPress={() =>this.setState({
      showLikeImg: false
    })}>
                  <Image
                    source={require('../assets/icons/menu.png')}
                    style={{height: 25, width: 25}}></Image>
                </TouchableOpacity> */}
                <TouchableOpacity onPress = {()=> this.props.navigation.navigate('Detail', {
                  idProduct: item.key
                })}>
                  <Image source={{uri: item.imageUrl}} style={styles.image} />
                </TouchableOpacity>
                <AirbnbRating size={15} showRating={false} isDisabled={true} />
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.price}>{item.price}$</Text>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.key}
          numColumns={2}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6e6e6',
  },
  card: {
    flex: 1,
    width: '50%',
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: '#d9d9d9',
  },
  image: {
    marginLeft: 50,
    width: 100,
    height: 150,
    justifyContent: 'center',
  },
  title: {
    color: '#000000',
    fontWeight: 'bold',
  },
  price: {
    marginLeft: 20,
    color: 'red',
  },
});
