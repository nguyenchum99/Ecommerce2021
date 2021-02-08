import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import React, { Component } from "react";
import { Image } from "react-native";
import DashScreen from "../screens/DashScreen";
import BuyNowScreen from "../screens/BuyNowScreen";
import LocalScreen from "../screens/LocalScreen";
import StackProductDetail from "./StackProductDetail";


const HomeTopNavigator = createMaterialTopTabNavigator(
  {
    Local: {
      screen: LocalScreen,
      navigationOptions: {
        tabBarLabel: "Local",
      },
    },
    Dash: {
      screen: DashScreen,
      navigationOptions: {
        tabBarLabel: "Dash",
      },
    },
    Buy: {
      screen: BuyNowScreen,
      navigationOptions: {
        tabBarLabel: "Buy Now",
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "#D4AF37",
      inactiveTintColor: "gray",
      style: {
        backgroundColor: "white",
      },
      labelStyle: {
        fontSize: 15,
      },
    },
  }
);

export default createAppContainer(HomeTopNavigator);
