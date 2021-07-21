import React from 'react';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator';
import SettingScreen from '../screens/SettingScreen';
import customSidebarMenu from './customSidebarMenu';
import MyPurchases from '../screens/MyPurchases';
import NotificationScreen from '../screens/NotificationScreen';
import AboutUs from '../screens/AboutUs';
import OurBeneficiaries from '../screens/OurBeneficiaries';

export const AppDrawerNavigator = createDrawerNavigator(
  {
    AboutUs: {
      screen: AboutUs,
      navigationOptions: {
        drawerIcon: <Icon name="file" type="font-awesome" size={20} />,
        drawerLabel: 'About Us',
      },
    },
    Home: {
      screen: AppTabNavigator,
      navigationOptions: {
        drawerIcon: <Icon name="home" type="font-awesome" size={20} />,
      },
    },
    MyPurchases: {
      screen: MyPurchases,
      navigationOptions: {
        drawerLabel: 'My Purchases',
        drawerIcon: <Icon name="exchange" type="font-awesome" size={20} />,
      },
    },
    Notifications: {
      screen: NotificationScreen,
      navigationOptions: {
        drawerLabel: 'Notifications',
        drawerIcon: <Icon name="bell" type="font-awesome" size={20} />,
      },
    },
    Settings: {
      screen: SettingScreen,
      navigationOptions: {
        drawerIcon: <Icon name="cog" type="font-awesome" size={20} />,
        drawerLabel: 'Settings',
      },
    },
    OurBeneficiaries: {
      screen: OurBeneficiaries,
      navigationOptions: {
        drawerLabel: 'Our Beneficiaries',
        drawerIcon: <Icon name="handshake-o" type="font-awesome" size={20} />,
      },
    },
  },
  {
    contentComponent: customSidebarMenu,
  },
  {
    initialRouteName: 'Home',
  }
);
