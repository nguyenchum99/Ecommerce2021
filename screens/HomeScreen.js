
import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import SearchItem from "../Components/SearchItem";
import HomeTopNavigator from "../navigation/HomeTopNavigator";
import LocalScreen from "./LocalScreen";




export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{ flex: 1, marginTop: 15, marginLeft: 10, marginRight: 5 }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Search")}
            >
              <Image
                source={require("../assets/icons/menu.png")}
                style={{ height: 25, width: 25 }}
              ></Image>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 10 }}>
            <SearchItem/>
          </View>
        </View>
        {/* <Image source={require("../assets/icons/sale2.jpg")} style = {{height: 100, width: 450}}></Image> */}
        {/* <FlatListItem {...this.props} /> */}
        {/* <HomeTopNavigator/> */}
        <LocalScreen {...this.props}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
