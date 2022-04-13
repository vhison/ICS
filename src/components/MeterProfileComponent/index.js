import React, { Component } from 'react';
import { View,Image,TouchableHighlight} from 'react-native';
import { Text, Thumbnail, Card, CardItem, Icon, Left, Body, Right, Badge } from 'native-base';
import {styles} from './style';
import theme from '../../config/theme';
import { dateMonthOfTimestamp } from '../../helpers/functions'
export default class MeterProfileComponent extends Component {
  render() {
    const { id,meter_id,meter_reading,date_of_reading,charge_code,photo,wr_number,type,channel,serial,metername,meterproperty,meteractive,metercomment,username,contact_name,email,contact,phone,address,stock_supply } = this.props  
    console.log("DETAILS : ")
    return (
      <View style={styles.albumContainer}>
        <View style={{ justifyContent : "center", alignItems : "center", paddingVertical : 30}}>            
          <Thumbnail large source={{ uri : photo}} />
          <Text style={{ paddingTop : 10, textAlign : "center", fontWeight : "600"}}> { metername ? metername : "" }</Text>
          <View style={{ flexDirection : "row"}}>
            {/* <Text style={{ fontWeight : "400", color : "#ccc", textAlign : "center"}}> Contact Name </Text> */}
            <Text style={{ fontWeight : "400", color : "#ccc", textAlign : "center"}}> { serial ? serial : ""}</Text>
          </View>
        </View>
          {/* Contact Info */}
          <View style={{ backgroundColor : "white" }} >
            <Card transparent>
              <CardItem>
                <Left>
                  <Text style={{ fontWeight : "500", textAlign : "left"}}>Details </Text>
                </Left>                              
              </CardItem>
              {/*  Full Address  */}
              <CardItem>
                <Left>                  
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>Reading </Text>
                </Left>              
                  <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontStyle: "italic", fontSize : 14, textAlign : "right"}}> {meter_reading ? meter_reading + ' ML': ""} </Text>              
              </CardItem>
              {/*  Date Of Reading  */}
              <CardItem>
                <Left>                  
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>Date Of Reading </Text>
                </Left>              
                  <Text ellipsizeMode='tail' numberOfLines={1} style={{fontStyle: "italic", fontSize : 14, textAlign : "right"}}> {date_of_reading ? dateMonthOfTimestamp(date_of_reading) : ""} </Text>              
              </CardItem>
              {/*  Charge Code  */}
              <CardItem>
                <Left>                  
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>Charge Code </Text>
                </Left>              
                  <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontStyle: "italic",fontSize : 14, textAlign : "right"}}> {charge_code ? charge_code : ""} </Text>              
              </CardItem>
              {/*  Water Right  */}
              <CardItem>
                <Left>                  
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>Water Right</Text>
                </Left>              
                  <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontStyle: "italic",fontSize : 14, textAlign : "right"}}> {wr_number ? wr_number : ""} </Text>              
              </CardItem>
              {/*  Meter Type  */}
              <CardItem>
                <Left>                  
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>Meter Type</Text>
                </Left>              
                  <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontStyle: "italic", fontSize : 14, textAlign : "right"}}> {type ? type : ""} </Text>              
              </CardItem>
              {/*  Channel  */}
              <CardItem>
                <Left>                  
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>Channel</Text>
                </Left>              
                  <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontStyle: "italic", fontSize : 14, textAlign : "right"}}> {channel ? channel : ""} </Text>              
              </CardItem>
               {/*  Stock & Domestic  */}
               <CardItem>
                <Left>                  
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>Stock {`&`} Domestic</Text>
                </Left>              
                  <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontStyle: "italic", fontSize : 14, textAlign : "right"}}> {stock_supply == 1 ? 'Yes' : 'No'} </Text>              
              </CardItem>
               {/*  Status  */}
               {/* <CardItem>
                <Left>                  
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>Status</Text>
                </Left>              
    <Badge success>{meteractive == 1 && <Text>ACTIVE</Text> }</Badge>              
              </CardItem> */}
              {/*  User Name  */}
              <CardItem>
                <Left>
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>User Name </Text>
                </Left>              
                  <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontStyle: "italic",fontSize : 14, color : "green",textAlign : "right"}}>   { username ? username : "" }</Text>              
              </CardItem>
              {/*  Contact Name  */}
              <CardItem>
                <Left>
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>Contact Name </Text>
                </Left>              
                <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontStyle: "italic",fontSize : 14, textAlign : "right"}}> { contact_name ? contact_name : "" }</Text>              
              </CardItem>
              {/*  Phone  */}
              <CardItem>
                <Left>
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>Phone </Text>
                </Left>              
                <Text ellipsizeMode='tail' numberOfLines={1} style={{fontStyle: "italic", fontSize : 14, textAlign : "right"}}> { phone ? phone : "" }</Text>              
              </CardItem>
              {/* Property */}
              <CardItem>
                <Left>
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>Property</Text>
                </Left>
                <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontStyle: "italic",fontSize : 14, textAlign : "right"}}>{meterproperty ? meterproperty : ""}</Text>              
              </CardItem>
              {/* Email */}
              <CardItem>
                <Left>
                  <Text style={{ fontWeight : "400", fontSize : 14, textAlign : "left"}}>Email </Text>
                </Left>
                <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontStyle: "italic",fontSize : 14, color : "dodgerblue", textAlign : "right"}}>{email ? email : ""}</Text>              
              </CardItem>
             
            </Card>
          </View>               
      </View>
    );
  }
}
