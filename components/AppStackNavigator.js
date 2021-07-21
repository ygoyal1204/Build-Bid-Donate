import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import BidDetailsScreen from '../screens/BidDetailsScreen';
import BidScreen from '../screens/BidScreen';
import MyPurchases from '../screens/MyPurchases'

export const AppStackNavigator = createStackNavigator({
  Bid : {
    screen : BidScreen,
     navigationOptions: {
        headerShown: false,
      },
  },
  BidDetails : {
    screen : BidDetailsScreen,
     navigationOptions: {
        headerShown: false,
      },
  },

  MyPurchases : {
  screen : MyPurchases,
   navigationOptions: {
        headerShown: false,
      },
}
},

{
   initialRouteName : 'Bid'
})