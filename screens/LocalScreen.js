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
import React, {Component, useState, useEffect} from 'react';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {firebaseApp} from '../Components/FirebaseConfig';
import isEqual from 'lodash/isEqual';
import {connect} from 'react-redux';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

class LocalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      clickLikeItem: false,
    };
  }

  componentDidMount() {
    firebaseApp
      .database()
      .ref('Products')
      .on('value', (snapshot) => {
        const li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            name: child.val().name,
            description: child.val().description,
            price: child.val().price,
            imageUrl: child.val().imageUrl1,
            isLike: false,
          });
        });
        this.setState({
          data: li,
          isLoading: false,
        });
      });
  }

  selectLikeProduct = (idProduct, isLike)=> {
    isLike = true;
  }

  render() {
    console.log(this.state.isLoading);
    const {data} = this.state;
    return (
      <>
        <>
          {this.state.isLoading && (
            <ActivityIndicator size="large" color="#000" />
          )}
        </>
        <ScrollView style={styles.container}>
          <FlatList
            data={data}
            renderItem={({item, index}) => {
              return (
                <View style={styles.card}>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('Detail', {
                          idProduct: item.key,
                        })
                      }>
                      <Image
                        source={{uri: item.imageUrl}}
                        style={styles.image}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                     >
                      {item.isLike ? (
                        <Image
                          source={require('../assets/icons/heart(1).png')}
                          style={{height: 25, width: 25, margin: 5}}
                        />
                      ) : (
                        <Image
                          source={require('../assets/icons/heart.png')}
                          style={{height: 25, width: 25, margin: 5}}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  <AirbnbRating
                    size={15}
                    showRating={false}
                    isDisabled={true}
                  />
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

export default connect(mapStateToProps, null)(LocalScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6e6e6',
  },
  card: {
    flex: 1,
    width: 200,
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
