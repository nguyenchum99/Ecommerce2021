
import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import UserTopNavigator from "../navigation/UserTopNavigator";

export default class UserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            source={require("../assets/icons/avatar.png")}
            style={styles.image}
          />
          <View>
          <Text style={styles.title}>nguyenchum</Text>
          <Text style={styles.location}>Location: Ha noi</Text>
          </View>
        </View>
        <UserTopNavigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: "row" ,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  title: {
    marginTop: 10,
    marginLeft: 25,
    color: "#000000",
    fontWeight: "bold",
    fontSize: 20,
  },
  location: {
    fontSize: 15,
    marginLeft: 25,
  },
  price: {
    marginLeft: 20,
    color: "#000000",
  },
});
