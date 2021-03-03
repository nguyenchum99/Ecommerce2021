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
} from 'react-native';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firebaseApp} from '../Components/FirebaseConfig';

class ListingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const userId = this.props.userId;
    firebaseApp
      .database()
      .ref('Products/')
      .orderByChild('idUser')
      .equalTo(userId)
      .on('value', (snapshot) => {
        const li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            productName: child.val().name,
            productDescription: child.val().description,
            productPrice: child.val().price,
            productImage: child.val().imageUrl1,
            location: child.val().location,
            createAt: child.val().createAt,
          });
        });

        this.setState({data: li});
      });
  }

  render() {
    console.log("info" + this.props);
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => {
            // return <CardItem nameItem={item.label} priceItem={item.price} onPress= {()=> this.props.navigation.navigate('Detail')} />;
            return (
              <TouchableOpacity style={styles.card}>
                <Image source={{uri: item.productImage}} style={styles.image} />
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <Text style={styles.title}>{item.productName}</Text>
                  <Text style={styles.price}>{item.productPrice} $</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.key}
          numColumns={3}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(ListingScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6e6e6',
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: '#e6e6e6',
  },
  image: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    width: 100,
    height: 150,
    justifyContent: 'center',
  },
  title: {
    marginLeft: 10,
    color: 'red',
    fontWeight: 'bold',
  },
  price: {
    marginLeft: 10,
    color: '#000000',
  },
});
