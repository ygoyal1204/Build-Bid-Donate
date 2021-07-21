import React from 'react';
import { Header,Avatar} from 'react-native-elements';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from 'firebase';
import db from '../config';

export default class SideBarMenu extends React.Component{
  constructor(){
    super();
     this.state = {
       userId : firebase.auth().currentUser.email,
       image : "#",
       name : "",
       docId : ""
     }
  }

selectPicture = async () => {
   const {cancelled,uri} = await ImagePicker.launchImageLibraryAsync({
     mediaTypes : ImagePicker.MediaTypeOptions.All,
     allowsEditing : true,
     aspect : [4,3],
     quality : 1
   })

   if(!cancelled){
     this.setState({
       image : uri
     })
    this.uploadImage(uri,this.state.userId)
   }
}

uploadImage = async (uri,imageName) => {
   var response = await fetch(uri);
   var blob = await response.blob();
   var ref = firebase.storage().ref().child("User_Profiles/"+ imageName);

   return ref.put(blob).then((response)=>{
     this.fetchImage(imageName)
   })
}

componentDidMount(){
  this.fetchImage(this.state.userId);
  this.getUserProfile();
}

fetchImage = (imageName) => {
   var storageRef = firebase.storage().ref().child("User_Profiles/"+ imageName);
   storageRef.getDownloadURL().then((url)=>{
     this.setState({
       image : url
     })
   })
   .catch((error)=>{
     this.setState({
       image : "#"
     })
   })
}

getUserProfile(){
 db.collection("users").where("email","==",this.state.userId)
 .onSnapshot((snapshot)=>{
   snapshot.forEach((doc)=>{
     this.setState({
       name : doc.data().first_name + " " + doc.data().last_name,
       docId : doc.id,
       image : doc.data().image
     })
   })
 })
}

  render(){
    return(
      <View style={styles.container}>
      <View style={{flex : 0.5,alignItems : 'center',backgroundColor : "#b0c9af"}}>
       <Avatar
         rounded 
        icon={{name: 'user', type: 'font-awesome'}}
         source={{
          uri : this.state.image
         }}
         size = "large"
         onPress={()=>
         this.selectPicture()
         }
         containerStyle = {styles.imageContainer}
         showEditButton
       />
       <Text style={{fontSize : 15,paddingTop : 10}}>
         {this.state.name}
       </Text>
      </View>
      <View style={styles.drawerItemsContainer}>
      <DrawerItems
        {...this.props}
      />
      </View>
      <View>
       <TouchableOpacity style={styles.logoutButton} 
       onPress = {()=>{
         this.props.navigation.navigate('WelcomeScreen')
         firebase.auth().signOut()
       }}
       >
       <Icon 
       name = "sign-out"
       type = "font-awesome"
       size = {20}
       />
       <Text style={styles.buttonText}> 
       Logout 
       </Text>
       </TouchableOpacity>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

container : {
  flex : 1,
},

  drawerItemsContainer : {
  flex : 0.8,
  },

  logoutButton : {
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
  fontWeight : "300"
},

imageContainer : {
  flex : 0.7,
  margin : 20,
  width : "40%",
  height : "20%",
  borderRadius : 60
}
})