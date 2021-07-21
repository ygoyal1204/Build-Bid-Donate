import React, {Component} from 'react';
import { View, StyleSheet, Text, TextInput,KeyboardAvoidingView,TouchableOpacity,Alert, ToastAndroid, ImageBackground } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class ExchangeScreen extends React.Component{
  constructor(){
    super();
    this.state={
      userName: firebase.auth().currentUser.email,
      itemName: "",
      itemDetails: ""
    }
  }

  createUniqueId(){
  return Math.random().toString(36)
}

  addItem=(itemName, itemDetails)=>{
    var userName = this.state.userName
    var randomDonateId = this.createUniqueId()
    db.collection("donations").add({
      "username": userName,
      "item_name": itemName,
      "item_details": itemDetails,
      "donate_id": randomDonateId,
      "status": "donated"
    })

    this.setState({
      itemName: "",
      itemDetails: ""
    })

    return alert(
      'Item ready to exchange',
      '',
      [
        {text: 'OK', onPress: ()=>{
          this.props.navigation.navigate("HomeScreen")
        }}
      ]
    );
  }

  render(){
    return(
      <View style={{flex: 1}}>
       <ImageBackground source={require('../assets/background3.jpg')} style={styles.backgroundImage}> 
      <MyHeader title="Donate Junk" navigation ={this.props.navigation}/>

      <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput style={styles.formInputBox}
      placeholder={"Item Name"}
      maxLength= {15}
      onChangeText={(text)=>{
        this.setState({
          itemName: text
        })
      }}
      value={this.state.itemName}
      />
      <TextInput 
      multiline
      numberOfLines={4}
      style={[styles.formInputBox, {height: 100}]}
      placeholder={"Item Details"}
      onChangeText={(text)=>{
        this.setState({
          itemDetails: text
        })
      }}
      value={this.state.itemDetails}
      />
      <TouchableOpacity
      style={[styles.button, {marginTop: 10}]}
      onPress={()=>{
        this.addItem(this.state.itemName, this.state.itemDetails)
      }}>
      <Text style={{color:'black', fontSize:18, fontWeight:'bold'}}>Donate</Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>
      </ImageBackground>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  formInputBox:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#b0c9af',
    borderRadius:7,
    borderWidth:2.5,
    marginTop:20,
    padding:10
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#fff7b2",
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 8,},
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
})