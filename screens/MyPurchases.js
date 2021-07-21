import * as React from 'react';
import { Text, View, StyleSheet, Image,TextInput,TouchableOpacity,Modal,ScrollView,KeyboardAvoidingView,FlatList, ImageBackground} from 'react-native';
import {Card,Header,Icon,ListItem} from 'react-native-elements';
import Constants from 'expo-constants';
import firebase from 'firebase';
import db from "../config";
import MyHeader from "../components/MyHeader";

export default class MyPurchases extends React.Component{
constructor(){
  super();
  this.state = {
    userId : firebase.auth().currentUser.email,
    userName : "",
    allPurchases : []
  }
  this.requestRef = null;
}

getUserDetails = (userId) =>{
  db.collection("users").where("email","==",userId).get()
  .then(snapshot=>{
    snapshot.forEach(doc=>{
      this.setState({
        userName : doc.data().first_name + " " + doc.data().last_name 
      })
    })
  })

}

getAllPurchases = () =>{
   this.requestRef = db.collection("allBids").where("user_id","==",this.state.userId)
   .onSnapshot((snapshot)=>{
     var allPurchases = []
     snapshot.docs.map((doc)=>{
       var purchase = doc.data()
       purchase["docId"] = doc.id
       allPurchases.push(purchase)
     })

     this.setState({
      allPurchases : allPurchases
     })
   })
}



componentDidMount(){
  this.getUserDetails(this.state.userId);
  this.getAllPurchases();
}

componentWillUnmount(){
  this.requestRef();
}

keyExtractor=(item,index)=>index.toString();

renderItem=({item,i})=>{
  return(
    <ListItem
    key={i}
    title={item.item_name}
    subtitle={"Item Status: " + item.item_status}
    titleStyle={{color : "black",fontweight : "bold",fontSize : 15}}
    
    bottomDivider
    />
  );
}

  render()
  {
    return(
      //<View style = {styles.container}>
      <View style={styles.container}>
      <ImageBackground source={require('../assets/background6.jpg')} style={styles.backgroundImage}>
      <MyHeader title="My Purchases" navigation={this.props.navigation}/>
        {
          this.state.allPurchases.length === 0 ? (
            <View style={styles.subContainer}>
            <Text style={styles.title}> List of all Your Purchases </Text>
            </View>
          )
          : (
            <FlatList
              keyExtractor = {this.keyExtractor}
              data = {this.state.allPurchases}
              renderItem = {this.renderItem}
            />
          )
        }
        </ImageBackground>

      </View>
      //</View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : "center",
    alignItems : "center"
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