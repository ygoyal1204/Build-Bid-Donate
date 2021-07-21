import * as React from 'react';
import { Text, View, StyleSheet, Image,TextInput,TouchableOpacity,Modal,ScrollView,KeyboardAvoidingView, ImageBackground} from 'react-native';
import {Card,Header,Icon} from 'react-native-elements';
import Constants from 'expo-constants';
import firebase from 'firebase';
import db from "../config";
import MyHeader from "../components/MyHeader";

export default class BidDetailsScreen  extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userId : firebase.auth().currentUser.email,
      donateId : this.props.navigation.getParam("details")["donate_id"],
      itemName : this.props.navigation.getParam("details")["item_name"],
      itemDetails : this.props.navigation.getParam("details")["item_details"],
      userName : "",
      bidValue: ''
    }
  }

getUserDetails = (userId) =>{
  db.collection("users").where("email","==",userId).get()
  .then(snapshot=>{
    snapshot.forEach(doc=>{
      this.setState({
        userName : doc.data().first_name + " " + doc.data().last_name + " "
      })
    })
  })

}

componentDidMount()
{
  this.getUserDetails(this.state.userId);
}

updateItemStatus = ()=>{
 db.collection("allBids").add({
   item_name : this.state.itemName,
   donate_id : this.state.donateId,
   user_id : this.state.userId,
   item_status : "purchased",
   bid_value : this.state.bidValue
 })

 db.collection('donations').where('donate_id', '==', this.state.donateId).get().then(snapshot=>{
   snapshot.forEach((doc)=>{
     db.collection('donations').doc(doc.id).update({
       status: 'purchased'
     })
   })
 })

 this.setState({
   bidValue: ''
 })
}

addNotifications = () =>{
 var message = "Congratulations " + this.state.userName + "! You are donating for a good cause!"
 db.collection("notifications").add({
   targetedUserId : this.state.userId,
   donateId : this.state.donateId,
   itemName : this.state.itemName,
   date : firebase.firestore.FieldValue.serverTimestamp(),
   notificationStatus : "Unread",
   message : message,
 })
}

render(){
    return(
      <View>
      <ImageBackground source={require('../assets/background2.png')} style={styles.backgroundImage}>
      <MyHeader
      title = "Item Details" navigation={this.props.navigation}
      />

      <View style={{flex : 1}}>
      <Card 
      title={"Item Info"}
      titleStyle={{fontSize : 20,fontWeight : "bold"}}
      >
       <Card 
       containerStyle = {{width : 250,height : 30,justifyContent : "center"}}
       >
         <Text
           style = {{fontWeight : "bold"}}
         > 
         Name : {this.state.itemName}</Text>
       </Card>

        <Card 
        containerStyle = {{width : 250,height : 30,justifyContent : "center"}}
        >
         <Text
          style = {{fontWeight :"bold"}}
         > 
         Details : {this.state.itemDetails}</Text>
        </Card>
      </Card>
      </View>
      <View>
         <Text style={{fontSize: 25, textAlign: 'center', marginTop: 30}}>Donation Info</Text>
         <Text style={{fontSize: 23, textAlign: 'center'}}>'Rs 500 - 2500'</Text>

      </View>

      <View style={{justifyContent : "center",alignItems : "center"}}>
      <TextInput 
      placeholder="Bid for this item"
      style={styles.inputBox}
      keyboardType={'numeric'}
      onChangeText={(text)=>{
        this.setState({
          bidValue: text
        })
      }}/>

           <TouchableOpacity style={styles.button}
           onPress={()=>{
             this.updateItemStatus();
             this.props.navigation.navigate("MyPurchases");
             this.addNotifications()
           }}
           >
           <Text style={styles.buttonText}> I want to Purchase </Text>
           </TouchableOpacity>
         
      </View>
      
      </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
 

  button : {
  backgroundColor : "#b0c9af",
  width : 200,
  height : 40,
  justifyContent : "center",
  alignItems : "center",
  borderRadius : 20,
  shadowOpacity : 0.30,
  shadowRadius : 10,
  elevation : 18,
  marginTop: 70
},

buttonText : {
  fontSize : 17,
  fontWeight : "300",
},

inputBox: {
  width: '85%',
  height: 45,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#b0c9af',
  alignSelf: 'center',
  padding: 5,
  margin: 35
},
backgroundImage: {
        flex: 'flex-end',
        resizeMode: 'cover',
        height: '100%'
    }
})