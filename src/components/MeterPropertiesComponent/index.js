import React, { Component } from 'react';
import { View,Image,TouchableHighlight} from 'react-native';
import { Text, Thumbnail, Card, CardItem, Icon, Left, Body, Right, Badge } from 'native-base';
import {styles} from './style';
import theme from '../../config/theme';

export default class MeterPropertiesComponent extends Component {
  render() {
    const { photo, wr_number, type, channel, serial, metername, meterproperty, username, contact_name } = this.props      
    return (
      <View style={styles.albumContainer}>
        <View style={{ justifyContent : "center", alignItems : "center", paddingVertical : 30}}> 
          
          { photo!="" ? <Thumbnail large source={{ uri : photo}} /> : <Thumbnail large source={theme.ADD_RECORD} />}

          <Text style={{ paddingTop : 10, textAlign : "center", fontWeight : "600"}}>{metername!="" ? metername : ""} </Text>
          <View style={{ flexDirection : "row"}}>
            {/* <Text style={{ fontWeight : "400", color : "#ccc", textAlign : "center"}}> Contact Name </Text> */}
            <Text style={{ fontWeight : "400", color : "#ccc", textAlign : "center"}}>{serial?serial:""}</Text>
          </View>
        </View>
          {/* Meter Details (CORE INFO) */}
          <View style={{ backgroundColor : "#fff" }} >
            <Card>
              <CardItem >
                <Left>
                  <Text style={{ fontWeight : "500", textAlign : "left"}}>Meter Details </Text>
                </Left>                              
              </CardItem>
              {/*  Water Right  */}
              <CardItem>
                <Left>                  
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>Water Right</Text>
                </Left>
                <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontStyle: "italic",fontSize : 14, textAlign : "right"}}> {wr_number?wr_number:""}</Text>              
              </CardItem>
              {/*  Meter Type  */}
              <CardItem>
                <Left>                  
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>Meter Type</Text>
                </Left>              
                  <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontStyle: "italic", fontSize : 14, textAlign : "right"}}> {type?type:""}</Text>              
              </CardItem>
              {/*  Channel  */}
              <CardItem>
                <Left>                  
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>Channel</Text>
                </Left>              
    <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontStyle: "italic", fontSize : 14, textAlign : "right"}}> {channel?channel:""}</Text>              
              </CardItem>
              {/*  User Name  */}
              <CardItem>
                <Left>
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>User Name </Text>
                </Left>              
    <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontStyle: "italic",fontSize : 14, color : "green",textAlign : "right"}}>{username?username:""}</Text>              
              </CardItem>
              {/* Property */}
              <CardItem>
                <Left>
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>Property</Text>
                </Left>
                <Text ellipsizeMode='tail' numberOfLines={2} style={{ width: "50%",fontStyle: "italic",fontSize : 14,textAlign : "right"}}>{meterproperty?meterproperty:""}</Text>              
              </CardItem>            
            </Card>
          </View>               
      </View>
    );
  }
}
