import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    Image,
    StatusBar,
    TouchableOpacity,
    ScrollView
  } from "react-native";
  import React, { Component } from "react";
  
  export default class CategoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boolean: true,
        };
      }
  
    render() {
  
      return (
        <ScrollView style={styles.container}>
                  
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
      borderRadius: 10,
      backgroundColor: "#ffffff",
      margin: 5,
  
    },
    image: {
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
      width: 100,
      height: 150,
      borderRadius: 10,
      justifyContent: "center",
    },
    title: {
      marginLeft: 20,
      color: '#000000',
      fontWeight: 'bold'
    },
    price: {
      marginLeft: 20,
      color: '#000000',
    },
  });
  