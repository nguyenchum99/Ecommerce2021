
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import React, { Component } from 'react';
import {Image} from 'react-native';
import ListingScreen from '../screens/ListtingScreen';
import FollowingScreen from '../screens/FollowingScreen';
import FollowersScreen from '../screens/FollowersScreen';

const UserTopNavigator = createMaterialTopTabNavigator(
    {
        Listing: { 
            screen: ListingScreen,
            navigationOptions: {
              tabBarLabel:"Listing",
            },
            
          },
        Following: { 
            screen: FollowingScreen,
            navigationOptions: {
              tabBarLabel:"Following",
            },
        },
        Followers: { 
            screen: FollowersScreen,
            navigationOptions: {
              tabBarLabel:"Followers",
            },
        }
    },
    { 
      tabBarOptions: { 
          activeTintColor: '#D4AF37',
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: 'white', 
          },
          labelStyle: {
          fontSize: 10,
        }
      }
    }
  );

  
export default createAppContainer(UserTopNavigator);