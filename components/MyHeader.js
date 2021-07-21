import React, {Component} from 'react';
import { Header,Badge} from 'react-native-elements';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import db from '../config';

export default class MyHeader extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value : "",
    }
  }

getNoOfNotifications(){
  db.collection("notifications").where('notificationStatus', '==','Unread' )
  .onSnapshot((snapshot)=>{
    var unreadNotifications = snapshot.docs.map((doc)=>doc.data())
    console.log(unreadNotifications.length)
    this.setState({
      value : unreadNotifications.length
    })
    //console.log(this.state.value);
  })
}

bellIcon = () => {
  return(
    <View>
     <Icon name = "bell" type = "font-awesome" color = "black" size = {20}
        onPress = {()=>
        this.props.navigation.navigate("Notifications")}
      />
      <Badge 
      value ={this.state.value}
      containerStyle = {{position : 'absolute', top : -4 , right : -4}}
      />
    </View>
  )
}

componentDidMount(){
  this.getNoOfNotifications();
} 

  render(){
    return(
      <Header
      leftComponent = {<Icon name = "bars" type = "font-awesome" color = "black"
        onPress = {()=>
          this.props.navigation.toggleDrawer()}
        />}
        centerComponent = {{text : this.props.title, 
        style : {color : "black", fontSize : 20, fontWeight :"bold", fontFamily : "serif",width : 300, textAlign: 'center'}}}
        backgroundColor = "#b0c9af"
        rightComponent = {<this.bellIcon{...this.props}/>}
        />
    )
  }
}