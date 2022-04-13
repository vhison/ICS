import React, { Component } from 'react';
import { View,Image,TouchableOpacity, Linking} from 'react-native';
import { Text, Thumbnail, Card, CardItem, Icon, Left, Body, Right, Toast } from 'native-base';
import {styles} from './style';
import theme from '../../config/theme';
export default class UserProfileComponent extends Component {

  sendEmail(email){
    if(email!="" && email!=null && email!=undefined){
      Linking.openURL(`mailto:${email}`)
    }
    else {
      Toast.show({
        text: "Email is not valid.",    
        textStyle : { color : "#fff", textAlign : "center" },    
        duration: 3000,
        useNativeDriver: true,
        style: {  backgroundColor : "#173a65" }   
      })
    }
  }
  callNumber(number){
    if(number!="" && number!=null && number!=undefined){
      Linking.openURL(`tel:+91${number}`)
    }
    else {
      Toast.show({
        text: "Phone is not valid.",    
        textStyle : { color : "#fff", textAlign : "center" },    
        duration: 3000,
        useNativeDriver: true,
        style: {  backgroundColor : "#173a65" }     
      })
    }
  }

  render() {
    const { details } = this.props
    console.log("DETAILS : ", details)
    return (
      <View style={styles.albumContainer}>
        {/* <View style={{ justifyContent : "center", alignItems : "center", paddingVertical : 30}}>            
          <Thumbnail large source={theme.ONE} />
    <Text style={{ paddingTop : 10, textAlign : "center", fontWeight : "600"}}> { details[0].username}</Text>
          <View style={{ flexDirection : "row"}}>            
            <Text style={{ fontWeight : "400", color : "#ccc", textAlign : "center"}}> { details[0].contact_name!=""?details[0].contact_name:' - '}</Text>
          </View>
        </View> */}
          {/* Contact Info */}
          <View style={{ backgroundColor : "white" }} >
            <Card >
              <CardItem>
                <Left>
                  <Text style={{ fontWeight : "500", textAlign : "left"}}>Contact Info </Text>
                </Left>                              
              </CardItem>
              {/*  User Name */}
              <CardItem>
                <Left>                  
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>User Name </Text>
                </Left>              
                  <Text ellipsizeMode='tail' numberOfLines={1} style={{ width: "50%",fontSize : 14, fontStyle:"italic", textAlign : "right"}}> { details[0].username!=""?details[0].username:' - '} </Text>              
              </CardItem>
              {/*  Contact Name */}
              <CardItem>
                <Left>                  
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>Contact Name </Text>
                </Left>              
                  <Text ellipsizeMode='tail' numberOfLines={1} style={{ width: "50%",fontSize : 14,fontStyle:"italic", textAlign : "right"}}> { details[0].contact_name!=""?details[0].contact_name:' - '} </Text>              
              </CardItem>
              {/*  Full Address  */}
              <CardItem>
                <Left>                  
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>Full Address </Text>
                </Left>              
                  <Text ellipsizeMode='tail' numberOfLines={3} style={{ width: "50%",fontSize : 14, fontStyle:"italic", textAlign : "right"}}> { details[0].address!=""?details[0].address:' - '} </Text>              
              </CardItem>
              {/*  Phone  */}
              <CardItem>
                <Left>
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>Phone </Text>
                </Left> 
                <TouchableOpacity onPress={()=> this.callNumber(details[0].phone)}>
                  <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize : 14, fontStyle:"italic", color : "green",textAlign : "right"}}> { details[0].phone!=""? '+91 '+ details[0].phone:' - '}</Text>              
                </TouchableOpacity>             
              </CardItem>            
              {/* Email */}
              <CardItem>
                <Left>
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>Email </Text>
                </Left>
                <TouchableOpacity onPress={()=> this.sendEmail(details[0].email)}>
                  <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize : 14, fontStyle:"italic", color : "dodgerblue", textAlign : "right"}}>{ details[0].email!=""?details[0].email:' - '}</Text>              
                </TouchableOpacity>
              </CardItem>
              {/* Stock Supply */}
              <CardItem>
                <Left>
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>Stock {`&`} Domestic </Text>
                </Left>
                <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize : 14, fontStyle:"italic", textAlign : "right"}}>{ details[0].stock_supply==1?'Yes':'No'}</Text>              
              </CardItem>
             
            </Card>
          </View>               
      </View>
    );
  }
}
