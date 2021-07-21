import React,{Component} from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';
import { Header,Badge,ListItem} from 'react-native-elements';
import {View, Text, StyleSheet,Dimensions,TouchableHighlight,Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import db from '../config';


export default class SwipeableFlatlist extends Component {

constructor(props){
  super(props);
  this.state = {
    allNotifications : this.props.allNotifications
  }
}

updateMarkAsRead = (notification) => {
   db.collection("notifications").doc(notification.docId)
   .update({
     notificationStatus : "Read"
   })
}

onSwipeValueChange = swipeData => {
    var allNotifications = this.state.allNotifications
   const {key,value} = swipeData
    if( value < -Dimensions.get("window").width){
     const newData = [...allNotifications];
      this.updateMarkAsRead(allNotifications[key]);
    console.log(allNotifications[key]);
      newData.splice(key,1)
      this.setState({
        allNotifications : newData
      })
      //console.log(newData);
  }
}


renderItem = data =>(
  <Animated.View>
    <ListItem
    leftElement = {<Icon name = "book" color = "#EAC927" type = "font-awesome"/>}
    title={data.item.bookName}
    titleStyle={{color : "black",fontweight : "bold",fontSize : 20}}
    subtitle={data.item.message}
    bottomDivider
    />
  </Animated.View>
)

renderHiddenItem = () => (
    <View style={styles.rowBack}>
      <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Text style={styles.backTextWhite}>Mark as read</Text>
      </View>
    </View>
  );


  render()
  {
    return(
    <View>
      <SwipeListView
        disableRightSwipe
        data = {this.state.allNotifications}
        renderItem = {this.renderItem}
        renderHiddenItem = {this.renderHiddenItem}
        rightOpenValue = {-Dimensions.get("window").width}
        previewRowKey = {"0"}
        previewOpenValue = {-40}
        previewOpenDelay = {3000}
        onSwipeValueChange = {this.onSwipeValueChange}
        keyExtractor = {(item,index) => index.toString()}
      />
    </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  backTextWhite: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    alignSelf: "flex-start"
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#29b6f6",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 100
  },
  backRightBtnRight: {
    backgroundColor: "#29b6f6",
    right: 0
  }
})