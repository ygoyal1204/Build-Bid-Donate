import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image} from 'react-native';
import {Card,Header,Icon} from 'react-native-elements';
import Constants from 'expo-constants';
import MyHeader from "../components/MyHeader";

export default class OurBeneficiaries extends React.Component{
  render(){
    return(
      <View style={{flex: 1, justifyContent: 'center'}}>
      <ImageBackground source={require('../assets/background7.jpg')} style={styles.bgImage}>
      <MyHeader title="Our Beneficiaries" navigation={this.props.navigation}/>
      <a href='www.cry.org/' style={{textAlign:'center', marginTop: 180 }}>
      <Text style={styles.textName}>CRY (Child Rights and You)
</Text>
    </a>
    <Text style={styles.info}>Cry, one of the oldest and best NGO in India thrives to improve the situation of the underprivileged children of India.</Text>
    <a href="https://www.pratham.org/" style={{textAlign:'center', marginTop: 20 }}>
    <Text style={styles.textName}>Pratham
</Text>
</a>
    <Text style={styles.info}>Pratham is one of the largest NGO in India that provides innovative learning to improve the quality of education in the country.</Text>
    <a href="https://www.nanhikali.org/" style={{textAlign:'center', marginTop: 20 }}>
    <Text style={styles.textName}>Nanhi Kali
</Text></a>
    <Text style={styles.info}>This education NGO in Mumbai aims to positively impact India’s development by educating girls and encouraging people to contribute to a worthy cause.</Text>
      </ImageBackground>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  bgImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    textName: {
      fontSize: 17,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 70
    },
    text: {
      textAlign: 'center'
    },
    info: {
      textAlign: 'center',
      fontSize: 14
    }
})