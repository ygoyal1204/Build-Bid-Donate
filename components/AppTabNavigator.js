import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import BidScreen from '../screens/BidScreen';
import DonateScreen from '../screens/DonateScreen';

export const AppTabNavigator = createBottomTabNavigator({
  BidScreen: {
    screen: BidScreen,
    navigationOptions :{
      tabBarLabel : "Bid"
    }
  },
  DonateScreen: {
    screen: DonateScreen,
    navigationOptions :{
      tabBarLabel : "Donate"
    }
  }
});