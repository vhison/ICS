import React, { Component } from 'react';
import { View,Image} from 'react-native';
import { Text} from 'native-base';
import {styles} from './style';
import theme from  '../../config/theme';
export default class EmptyComponent extends Component {
  render() {   
    return (
    <View style={styles.albumContainer}>      
        <View style={styles.verticalListComponentInner}>
          <View style={styles.verticalListComponentRow}>            
            <Image source={theme.EMPTY_RECORD} style={{borderRadius:10,height:63, width:"18%", resizeMode:'cover'}}/>  
            <View style={styles.verticalListComponentColumn}>
              <Text style={styles.verticalListComponentTitleOne}>No Record Found</Text>                                        
            </View>           
          </View>              
        </View>                  
    </View>
    );
  }
}