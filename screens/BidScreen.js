import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    ScrollView, 
    KeyboardAvoidingView,
    Alert,
    TextInput, 
    Modal,
    FlatList,
    ImageBackground,
    Platform,
    StatusBar,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {ListItem} from 'react-native-elements';
import MyHeader from '../components/MyHeader';


export default class HomeScreen extends React.Component{
  constructor(){
    super();
    this.state={
      donations: []
    }
    this.requestRef = null
  }

  getDonations =()=>{

        this.requestRef = db.collection("donations").where('status', '==', 'donated')

        .onSnapshot((snapshot)=>{
          var donatedList = snapshot.docs.map(document => document.data());

      this.setState({
        donations: donatedList
      });
    })
  }

  componentDidMount(){
    this.getDonations()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem=({item, i})=>{
    return(
      <ListItem
      key={i}
      title={item.item_name}
      subtitle={item.item_details}
      titleStyle= {{color: 'black', fontWeight: 'bold'}}
      rightElement={
        <TouchableOpacity style={styles.button}
      onPress = {()=>{
        this.props.navigation.navigate("BidDetails",{"details" : item})
      }}
      >
          <Text style={{color:'white',fontSize: 15}}>View</Text>
        </TouchableOpacity>
      }
      bottomDivider
      />
    )
  }

  render(){
    return(
      
      <View style={{flex:1}}>
      <ImageBackground source={require('../assets/background9.jpg')} style={styles.backgroundImage}> 
      <View style={{flex:1}}>
      <MyHeader title="List of Items" navigation ={this.props.navigation}/>
      {
        this.state.donations.length === 0
        ?(
          <View style={styles.keyBoardStyle}>
          <Text style={{ fontSize: 20, color: '#fc5622'}}>Bid on your favourite upcycled creation!</Text>
          </View>
        )
        :(
          <View>
          <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.donations}
          renderItem={this.renderItem}
          />
          </View>
        )
      }
      </View>
      </ImageBackground>
      
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    button:{
      width:"45%",
      height:43,
      justifyContent:'center',
      alignItems:'center',
      borderColor: 'black',
      backgroundColor:"#b0c9af",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:10
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    droidSafeArea: { marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
    }
  )