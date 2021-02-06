import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";

export default class CardInfoShop extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.card} onPress={this.props.onPress}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../assets/icons/avatar.png")}
            style={styles.image}
          />
          <Text style={styles.title}>nguyenchum</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <Text>List</Text>
          <Text>Sold</Text>
          <Text>Rating</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
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
