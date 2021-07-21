import * as React from 'react';
import { Text, View, StyleSheet, Image,TextInput,TouchableOpacity,Modal,ScrollView,KeyboardAvoidingView,FlatList, ImageBackground} from 'react-native';
import {Card,Header,ListItem} from 'react-native-elements';
import Constants from 'expo-constants';
import firebase from 'firebase';
import db from "../config";
import Icon from 'react-native-vector-icons/FontAwesome';
import SwipeableFlatlist from '../components/SwipeableFlatlist';
import MyHeader from '../components/MyHeader';

export default class NotificationScreen extends React.Component{
  constructor(props){
  super(props);
  this.state = {
    donorId : firebase.auth().currentUser.email,
    allNotifications : []
  }
  this.notifyRef = null;
}

getAllNotifications = () =>{
   this.notifyRef = db.collection("notifications").where("notificationStatus","==","Unread").where("targetedUserId","==",this.state.donorId)
   .onSnapshot((snapshot)=>{
     var allNotifications = []
     snapshot.docs.map((doc)=>{
       var notification = doc.data()
       notification["docId"] = doc.id
       allNotifications.push(notification)
     })
     

     this.setState({
      allNotifications : allNotifications
     })
   
   })
}

componentDidMount(){
  this.getAllNotifications();
}

componentWillUnmount(){
  this.notifyRef();
}

keyExtractor=(item,index)=>index.toString();

renderItem=({item,i})=>{
  return(
    <ListItem
    key={i}
    leftElement = {<Icon name = "book" color = "green" type = "font-awesome"/>}
    title={item.itemName}
    subtitle={item.message}
    titleStyle={{color : "black",fontweight : "bold",fontSize : 20}}
    bottomDivider
    />
  );
}
 render()
  {
    return(
      //<View style = {styles.container}>
      <View style={styles.container}>
      
      <MyHeader title="Notifications" navigation={this.props.navigation}/>
        {
          this.state.allNotifications.length === 0 ? (
            <View style={styles.subContainer}>
            <Text style={styles.title}>You have no Notifications yet</Text>
            </View>
          )
          : (
            <SwipeableFlatlist allNotifications = {this.state.allNotifications}/>
          )
        }

      </View>
      //</View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : "center",
    backgroundColor: '#fff7b2'
  },

title : {

fontSize : 25,
fontWeight : "bold",

},

subContainer : {
  flex : 1,
  fontSize : 20,
  justifyContent : "center",
  alignItems : "center"
},
backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    }

})