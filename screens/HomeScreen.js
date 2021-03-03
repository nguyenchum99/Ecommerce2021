import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
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
  ActivityIndicator
} from 'react-native';
import SearchItem from '../Components/SearchItem';
import HomeTopNavigator from '../navigation/HomeTopNavigator';
import LocalScreen from './LocalScreen';
import {useSelector} from 'react-redux';

const HomeScreen = (props) => {
  const userId = useSelector((state) => state.auth.userName);
  return (
    
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>
      <Text>Hello {userId}</Text>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, marginTop: 15, marginLeft: 10, marginRight: 5}}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Search')}>
            <Image
              source={require('../assets/icons/menu.png')}
              style={{height: 25, width: 25}}></Image>
          </TouchableOpacity>
        </View>
        <View style={{flex: 10}}>
          <SearchItem />
        </View>
      </View>
      <LocalScreen {...props} />
    </View>
    
  );
};

const styles = StyleSheet.create({});
export default HomeScreen;
