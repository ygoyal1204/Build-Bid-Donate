import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import WelcomeScreen from './screens/WelcomeScreen';
import DonateScreen from './screens/DonateScreen';
import BidScreen from './screens/BidScreen';
import {AppDrawerNavigator} from './components/AppDrawerNavigator';
import BidDetailsScreen from './screens/BidDetailsScreen';

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

  const switchNavigator = createSwitchNavigator({
    WelcomeScreen: {screen: WelcomeScreen},
    Drawer: {screen: AppDrawerNavigator},
    BidDetails: {screen: BidDetailsScreen}
  })

  const AppContainer = createAppContainer(switchNavigator);
