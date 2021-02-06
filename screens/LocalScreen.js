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

export default class LocalScreen extends React.Component {
  data = [
    {
      id: 1,
      label: "Label 01",
      price: "12$",
    },
    {
      id: 2,
      label: "Label 02",
      price: "12$",
    },
    {
      id: 3,
      label: "Label 03",
      price: "12$",
    },
    {
      id: 4,
      label: "Label 04",
      price: "12$",
    },
    {
      id: 5,
      label: "Label 05",
      price: "12$",
    },
    {
      id: 6,
      label: "Label 06",
      price: "12$",
    },
  ];
  _keyExtractor = (item, index) => item.id;

  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.data}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.card}>
                <Image
                  source={require("../assets/icons/iphonex.jpg")}
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
                  <Text style={styles.title}>{item.label}</Text>
                  <Text style={styles.price}>{item.price}</Text>
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
    borderRadius: 10,
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
