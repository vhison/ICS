import React, { Component } from 'react';
import { View,Image,ScrollView,TouchableHighlight, Modal, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { Text, Icon, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {styles} from './style';
import theme from  '../../config/theme';
import { dateMonthOfTimestamp } from '../../helpers/functions'

export default class MeterReadingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible : false
    };
  }
  toggleModal(modalVisible){
    this.setState({ modalVisible : !modalVisible})
  }
  render() {
    const { id,meter_id,meter_reading,date_of_reading,charge_code,photo,wr_number,type,channel,serial,metername,meterproperty,meteractive,metercomment,username,contact_name,email,contact,phone,address,stock_supply } = this.props

    const { modalVisible } = this.state
    return (
    <View key={id} style={styles.albumContainer}>
      <TouchableOpacity activeOpacity={0.6} 
        onPress={()=> this.toggleModal(modalVisible)}        
      >  
        <View style={styles.verticalListComponentInner}>
          <View style={styles.verticalListComponentRow}>
            <Image source={{uri: photo}} style={{borderRadius:10,height:63, width:"18%", resizeMode:'cover'}}
              onLoadStart={(e)=> console.log("LOADING START : ")}
              onLoadEnd={(e)=> console.log("LOADING END : ")}
              onLoad={(e)=> console.log("LOADING ON : ")}
              loadingIndicatorSource={theme.EMPTY_RECORD}
              progressiveRenderingEnabled
            />  
            {/* <Image source={theme.ONE} style={{borderRadius:10,height:63, width:"18%", resizeMode:'cover'}}/>   */}
            <View style={styles.verticalListComponentColumn}>
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.verticalListComponentTitleOne}>Reading</Text>              
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.verticalListComponentTitle}>Date of Reading</Text>              
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.verticalListComponentTitle}>Charge Code</Text>              
              {/* <Text ellipsizeMode='tail' numberOfLines={1} style={styles.verticalListComponentTitle}>Client</Text>               */}
            </View>
            <View style={styles.verticalListComponentColumn}>              
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.verticalListTitleOne}> : {meter_reading} ML</Text>
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.verticalListComponentTitle}> : {dateMonthOfTimestamp(date_of_reading)}</Text>              
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.verticalListComponentTitle}> : {charge_code}</Text>
              {/* <Text ellipsizeMode='tail' numberOfLines={1} style={styles.verticalListComponentTitle}> : {username}</Text>               */}
            </View>
          </View>              
        </View>        
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle="overFullScreen"
        visible={modalVisible}
        onRequestClose={()=> this.toggleModal(modalVisible)}
      >
        <TouchableOpacity             
            activeOpacity={1} 
            onPressOut={() => {this.toggleModal(modalVisible)}}
          >
            <ScrollView 
              showsVerticalScrollIndicator={false}
              directionalLockEnabled={true}               
            >
              <View style={styles.downloadComponentOuter}>
                <TouchableWithoutFeedback>
                  <View style={styles.downloadComponentInner}>
                    {/* <View style={styles.downloadComponentClose}>
                    <Button transparent style={styles.downloadComponentTopButton} onPress={()=> this.toggleModal(modalVisible)} >
                    <Icon name='close' type="MaterialIcons" style={{ color :"#000" }} /> 
                    </Button>                
                    </View>  */}
                      <Image source={{uri: photo}} style={{ height: "90%", width:"95%", resizeMode:'cover' }}
                        onLoadStart={(e)=> console.log("LOADING START : ")}
                        onLoadEnd={(e)=> console.log("LOADING END : ")}
                        onLoad={(e)=> console.log("LOADING ON : ")}
                        loadingIndicatorSource={theme.EMPTY_RECORD}
                        progressiveRenderingEnabled
                      />            
                  </View>
                </TouchableWithoutFeedback>
              </View> 
            </ScrollView>
        </TouchableOpacity>
      </Modal>
    </View>
    );
  }
}
