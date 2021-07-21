import * as React from 'react';
import { Text, View, StyleSheet, Image,TextInput,TouchableOpacity,Modal,ScrollView,KeyboardAvoidingView, ImageBackground} from 'react-native';
import Constants from 'expo-constants';
import firebase from 'firebase';
import db from "../config";
import MyHeader from '../components/MyHeader';

export default class SettingsScreen extends React.Component{
  
  constructor(){
    super();
    this.state = {
      emailId : "",
      firstName : "",
      lastName : "",
      address : "",
      contact : "",
      docId : ""
    }
  }

  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection("users").where("email","==",email).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        var data = doc.data()
        this.setState({
          emailId : data.email,
          firstName : data.first_name,
          lastName : data.last_name,
          address : data.address,
          contact : data.contact,
          docId : doc.id
        })
      })

    })
  }

  componentDidMount(){
    this.getUserDetails();
  }

updateUserDetails = () => {
   db.collection("users").doc(this.state.docId).update({
     firstName : this.state.first_name,
     emailId : this.state.email,
      lastName : this.state.last_name,
      address : this.state.address,
      contact : this.state.contact,
   })
   alert("Profile has been updated Successfully...!")
}

  render (){
    return(
      <View style={styles.container}>
      <ImageBackground source={require('../assets/background4.jpg')}
      style={styles.imageBg}>
    <MyHeader
      title = "✨Profile✨" navigation={this.props.navigation}
    />
   <View style={{justifyContent : "center",alignItems : "center"}}>
   <TextInput
              style = {styles.textInputBox}
              placeholder = {"First Name"}
              maxLength = {10}
              onChangeText = {(text) => {
                this.setState ({
                  firstName : text
                })
              }}
              value = {this.state.firstName}
              />

   <TextInput
              style = {styles.textInputBox}
              placeholder = {"Last Name"}
              maxLength = {10}
              onChangeText = {(text) => {
                this.setState ({
                  lastName : text
                })
              }}
              value = {this.state.lastName}
              />

  <TextInput
              style = {styles.textInputBox}
              placeholder = {"Contact Number"}
              maxLength = {10}
              keyboardType = {"numeric"}
              onChangeText = {(text) => {
                this.setState ({
                  contact : text
                })
              }}
              value = {this.state.contact}
              />

  <TextInput
               style={[styles.textInputBox,{height : 100}]}
              placeholder = {"Full Address"}
              multiline = {true}
              onChangeText = {(text) => {
                this.setState ({
                  address : text
                })
              }}
              value = {this.state.address}
              />

  <TextInput
              style = {styles.textInputBox}
              placeholder = {"Email Adress"}
              keyboardType = {"email-address"}
              onChangeText = {(text) => {
                this.setState ({
                  emailId : text
                })
              }}
              value = {this.state.emailId}
              />
   
<TouchableOpacity style={styles.button}
 onPress={()=>{
  this.updateUserDetails();
}}
>
 <Text style={styles.buttonText}> Update </Text>
</TouchableOpacity>

   </View>
   </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
  },

textInputBox : {
   width : 300,
   height : 40,
   justifyContent : "center",
   alignItems : "center",
   borderRadius : 20,
   borderWidth : 1,
    margin : 15
},

button : {
  backgroundColor : "#b0c9af",
  width : 100,
  height : 40,
  justifyContent : "center",
  alignItems : "center",
  borderRadius : 20,
  marginTop : 30,
  shadowOpacity : 0.30,
  shadowRadius : 10,
  elevation : 18,
  margin : 15
},

buttonText : {
  fontSize : 17,
  fontWeight : "300",
},
imageBg: {
        flex: 1,
        resizeMode: 'cover',
    }

})