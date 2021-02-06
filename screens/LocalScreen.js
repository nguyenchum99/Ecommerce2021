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
} from "react-native";
import React, { Component } from "react";
import { Rating, AirbnbRating } from "react-native-ratings";
import { firebaseApp } from "../Components/FirebaseConfig";

export default class LocalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database();
    this.state = {
      data: [],
     
    };
  }
  
  componentDidMount() {
    console.log('nguyen')
    this.itemRef.ref('Products').on('value', (snapshot) => {
      var li = [];
      snapshot.forEach((child) => {
        li.push({
          key: child.key,
          name: child.val().name,
          description: child.val().description,
          price: child.val().price,
          imageUrl: child.val().imageUrl1,
        })
      });
      this.setState({ data: li });
      console.log(this.state.data)
    
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.card}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.image}
                />
                <AirbnbRating
                  size={15}
                  showRating={false}
                  isDisabled={true}
                />
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.price}>{item.price}$</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={this._keyExtractor}
          numColumns={2}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6e6e6",
  },
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 0.5,
    borderColor: "#d9d9d9",
  },
  image: {
    marginLeft: 50,
    width: 100,
    height: 150,
    justifyContent: "center",
  },
  title: {
    color: "#000000",
    fontWeight: "bold",
  },
  price: {
    marginLeft: 20,
    color: "red",
  },
});
