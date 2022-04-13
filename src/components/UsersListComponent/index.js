import React, { Component } from 'react';
import {View,Image,TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {styles} from './style';
import { dateMonthOfTimestamp } from '../../helpers/functions'

export default class UsersListComponent extends Component {
  render() {
    const { id,username,contact_name,image,created_at} = this.props
    return (
    <View key={id} style={styles.albumContainer}>
      <TouchableOpacity activeOpacity={0.6} 
        onPress={()=>Actions.jump('userprofile',{id : id, username : username, image : image, created_at : created_at })}
      >       
        <View style={styles.verticalListComponentInner}>
          <View style={styles.verticalListComponentRow}>
            {/* <Image source={{uri: post_image}} style={{borderRadius:radius,height:height, width:width}}/>   */}            
            <View style={styles.verticalListComponentColumn}>
              <Text ellipsizeMode='tail' numberOfLines={2} style={styles.verticalListComponentTitle}>{username}</Text>
              <Text note numberOfLines={2} ellipsizeMode='tail' style={styles.verticalListComponentPost}>{contact_name}</Text>                
            </View>
            <View>              
              <Text style={styles.verticalListComponentPost}>{dateMonthOfTimestamp(created_at)}</Text>
            </View>
          </View>              
        </View>        
      </TouchableOpacity>      
    </View>
    );
  }
}
