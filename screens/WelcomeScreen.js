import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput, Image, Modal, ScrollView, KeyboardAvoidingView, ImageBackground} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends React.Component{
  constructor(){
    super();
    this.state ={
      emailId: "",
      password: "",
      isModalVisible: "false",
      firstName: "",
      lastName: "",
      address: "",
      contact: "",
      confirmPassword: ""
    }
  }

  userLogin=(email, password)=>{
    firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
      this.props.navigation.navigate("BidScreen")
    })
    .catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      return alert(errorMessage);
    })
  }
  

  userSignUp=(email, password, confirmPassword)=>{
    if(password!==confirmPassword){
      return alert("Your password doesn't match.")
    } else{
      firebase.auth().createUserWithEmailAndPassword(email, password).then((response)=>{
        db.collection('users').add({
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          contact: this.state.contact,
          email: this.state.emailId,
          address: this.state.address
        })
        return alert(
                 'User Added Successfully',
                 '',
                 [
                   {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
                 ]
             );
      })
      .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage)
      });
    }
  }

  showModal=()=>(
    <Modal animationType="fade"
    transparent={true}
    visible={this.state.isModalVisible}>

    <View style={styles.modalContainer}>
            <ScrollView style={{width: "100%"}}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
            <Text style={styles.modalTitle}>
            Registration
            </Text>
            <TextInput style={styles.formTextInput}
            placeholder={"First Name"}
            maxLength={10}
            onChangeText={(text)=>{
                this.setState({
                    firstName: text
                })
            }}/>
            <TextInput style={styles.formTextInput}
            placeholder={"Last Name"}
            maxLength={10}
            onChangeText={(text)=>{
                this.setState({
                    lastName: text
                })
            }}/>
            <TextInput style={styles.formTextInput}
            placeholder={"Contact"}
            maxLength={10}
            keyboardType={"numeric"}
            onChangeText={(text)=>{
                this.setState({
                    contact: text
                })
            }}/>
            <TextInput style={styles.formTextInput}
            placeholder={"Address"}
            multiline={true}
            onChangeText={(text)=>{
                this.setState({
                    address: text
                })
            }}/>
            <TextInput style={styles.formTextInput}
            placeholder={"Email"}
            keyboardType={"email-address"}
            onChangeText={(text)=>{
                this.setState({
                    emailId: text
                })
            }}/>
            <TextInput style={styles.formTextInput}
            placeholder={"Password"}
            secureTextEntry={true}
            onChangeText={(text)=>{
                this.setState({
                    password: text
                })
            }}/>
            <TextInput style={styles.formTextInput}
            placeholder={"Confirm Password"}
            secureTextEntry={true}
            onChangeText={(text)=>{
                this.setState({
                    confirmPassword: text
                })
            }}/>
            <View style={styles.modalBackButton}>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={()=>
                  this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                }
              >
              <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBackButton}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={()=>this.setState({"isModalVisible":false})}
              >
              <Text style={{color:'black'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
  )

  render(){
    return(
      <View style={styles.container}>
      <ImageBackground source={require('../assets/background.jpg')}> 

      <View style={{justifyContent:'center',alignItems:'center', marginTop: -60}}>
          {
            this.showModal()
          }
        </View>

        <Image style={{height: 200, width: 250, marginBottom: 50, marginTop: -50, alignSelf: 'center'}}  
      source={require('../assets/logo.png')}/>
    
      <View>
      <TextInput style={styles.loginBoxEmail}
      placeholder="ABC@example.com"
      placeholderTextColor="black"
      keyboardType="email-address"
      onChangeText={(text)=>{
        this.setState({emailId: text})
      }}/>
      <TextInput style={styles.loginBox}
      secureTextEntry={true}
      placeholderTextColor="black"
      placeholder="Password"
      onChangeText={(text)=>{
        this.setState({password: text})
      }}/>
      <TouchableOpacity style={[styles.button, {marginBottom: 20, marginTop: 20}]}
      onPress={()=>{
        this.userLogin(this.state.emailId, this.state.password)
      }}>
      <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, {marginBottom: 20, marginTop: 20}]}
      onPress={()=>{
        this.setState({
          isModalVisible: true
        })
      }}>
      <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      </View>
      </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
    flex:1, 
    alignItems: 'center'
 }, 
 title :{
    fontSize:40,
    marginBottom: 20,
    color : 'black',
    alignSelf: 'center',
    fontFamily: 'times',
    marginTop: 20,
    marginBottom: -40
 }, 
 loginBoxEmail:{
  width: 300, 
  height: 40, 
  borderBottomWidth: 2, 
  borderColor : '#bee0bc', 
  fontSize: 20, 
  margin:10, 
  paddingLeft:10,
  marginTop: -30
}, 

loginBox: {
  width: 300, 
  height: 40, 
  borderBottomWidth: 2, 
  borderColor : '#bee0bc', 
  fontSize: 20, 
  margin:10, 
  paddingLeft:10
},

button:{ 
    width:300, 
    height:50, 
    justifyContent:'center', 
    alignItems:'center', 
    borderRadius:25, 
    backgroundColor:"#bee0bc", 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 15, }, 
    shadowOpacity: 0.30, 
    shadowRadius: 10.32, 
    elevation: 16,
    alignSelf: 'center'
},
 buttonText:{ 
     color:'black',  
     fontSize:20 
    },
    keyboardAvoidingView:{
     flex:1,
     justifyContent:'center',
     alignItems:'center'
   },
   modalTitle :{
     justifyContent:'center',
     alignSelf:'center',
     fontSize:30,
     marginLeft:50,
     marginRight: 50,
     marginTop: 10,
     marginBottom: 10
   },
   modalContainer:{
     flex:1,
     borderRadius:20,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:"#bee0bc",
     marginRight:30,
     marginLeft : 30,
     marginTop:80,
     marginBottom:80,
   },
   formTextInput:{
     width:"80%",
     height:35,
     alignSelf:'center',
     borderColor:'grey',
     borderRadius:10,
     borderWidth:1,
     marginTop:15,
     padding:10
   },
   registerButton:{
     width:200,
     height:40,
     alignItems:'center',
     justifyContent:'center',
     borderWidth:1,
     borderRadius:10,
     marginTop:30
   },
   registerButtonText:{
     color:'black',
     fontSize:15,
     fontWeight:'bold'
   },
   cancelButton:{
     width:200,
     height:30,
     justifyContent:'center',
     alignItems:'center',
     marginTop:10,
     marginBottom: 10
   },
   
})