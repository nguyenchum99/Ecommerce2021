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

export default class FollowingScreen extends React.Component {
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
    }
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
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={require("../assets/icons/iphonex.jpg")}
                    style={styles.image}
                  />
                  <View
                    style={{
                      flexDirection: "column",
                      marginLeft: 10,
                      marginTop: 10,
                    }}
                  >
                    <Text style={styles.title}>{item.label}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    marginTop: 15,
                    marginRight: 10,
                    backgroundColor: "#f2f2f2",
                    height: 35,
                    width: 100,
                    justifyContent: 'center'
                  }}
                >
                  <Text
                    style={{ textAlign: "center", justifyContent: "center", padding: 5 }}
                  >
                    Following
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }}
          keyExtractor={this._keyExtractor}
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
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    margin: 5,
  },
  image: {
    margin: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  title: {
    color: "#000000",
    fontWeight: "bold",
  },
  price: {
    color: "#000000",
  },
});
