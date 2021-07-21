import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image } from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';
import Constants from 'expo-constants';
import MyHeader from '../components/MyHeader';

export default class AboutUs extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/background2.png')}
          style={styles.imageBg}>
          <MyHeader title="About Us" navigation={this.props.navigation} />
          <Text style={styles.text}>
            Are you planning to get rid of useless items at your home? Are you
            looking for sustainable upcycled crafts for your decor? Would you be
            interested in bidding for the same? And donating the cost for a
            noble cause?
          </Text>
          <Text style={styles.ideaText}>
            In order to avoid adding up to the earth’s junk, we have taken a
            step to motivate people to come on a platform where they can happily
            donate the unused items lying around in their houses which are
            capable of a renovation. The idea supports the swachh bharat abhiyan
            here! Next we came up with the idea of upcycling things and
            converting them into beautiful things which could be sold! This idea
            supports sustainability and environment friendly ideas. The bid on
            such items is to keep the excitement among people for the items. And
            coming up to the donations in the end which is a saviour for the
            underprivileged people who are in need of money in tough times!!
          </Text>
          <Text style={styles.ideaText}>
            The app brings people of all financial status under one roof. The
            privileged are cleaning up their houses, the people who can afford
            to buy new stuff can bid and donate and hence the donations are
            helping the underprivileged to fulfill their daily needs.
          </Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
  },
  ideaText: {
    fontSize: 15,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
});
