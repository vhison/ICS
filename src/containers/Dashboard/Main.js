import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView,Alert,Image,AsyncStorage, Platform } from 'react-native';
import { Container, Header, Content,Form ,Input,Item, Footer,Left,Right,Body,Title, Button, Icon, Text,Card, CardItem, Thumbnail, ListItem, List, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import NetInfo from "@react-native-community/netinfo";
import theme from  '../../config/theme';
import {styles} from '../../config/style';
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  addMeterReading(){
    NetInfo.fetch().then(state => {      
      console.log("Is connected?", state.isConnected);
      if(state.isConnected){
        Actions.jump('addmeterreading');                    
        setTimeout(()=>{
          Actions.drawerClose();    
        }, 400)
      }
      else {
        // Actions.jump('addreadingoffline');                    
        Actions.jump('offlineconnections');                    
        setTimeout(()=>{
          Actions.drawerClose();    
        }, 400)
      }
    });    
  }
  viewUsers(){
    Actions.jump('users');                    
    setTimeout(()=>{
      Actions.drawerClose();    
    }, 400)
  }
  viewMeters(){
    Actions.jump('meters');                    
    setTimeout(()=>{
      Actions.drawerClose();    
    }, 400)
  }
  viewOfflineReadings(){
    Actions.jump('viewofflinereadings');                    
    setTimeout(()=>{
      Actions.drawerClose();    
    }, 400)
  }
  logout = () => {    
    AsyncStorage.clear();   
    Actions.drawerClose();    
    setTimeout(()=>{
      Actions.auth();                    
    }, 600)
  }
  render() {
    return (     
      <View style={{ backgroundColor : 'transparent'}}> 
        <SafeAreaView>  
          <ScrollView style={styles.drawerScollView}>
          <List>                
            <ListItem noBorder>
              <Button transparent onPress={()=> { Actions.drawerClose() } } style={{ marginTop : 20}}>
                  <Icon name='close' type="EvilIcons" style={{ color : "#fff"}} />               
              </Button> 
            </ListItem>                    
            <ListItem iconLeft noBorder>
              <Image     
                source={theme.LOGO_APP_WHITE}
                resizeMode="contain"
                style={{ width :200, height :100, marginLeft : 20 }}
              />
            </ListItem>          
            <ListItem iconLeft noBorder>
              <Button transparent onPress={()=> this.addMeterReading() }>
                <Icon name='speedometer' type="SimpleLineIcons" style={{ color : "#fff"}} />
                <Text style={{color : theme.WHITE_COLOR, fontWeight : "bold", }} > Add Reading </Text>
              </Button> 
            </ListItem>                    
            <ListItem iconLeft noBorder>
              <Button transparent onPress={()=> this.viewUsers() }>
                  <Icon name='user' type="SimpleLineIcons" style={{ color : "#fff"}} />
                  <Text style={{color : theme.WHITE_COLOR, fontWeight : "bold", }} > Users</Text>
              </Button> 
            </ListItem>                    
            <ListItem iconLeft noBorder>
              <Button transparent onPress={()=> this.viewMeters() }>
                  <Icon name='speedometer' type="SimpleLineIcons" style={{ color : "#fff"}} />
                  <Text style={{color : theme.WHITE_COLOR, fontWeight : "bold", }} > Meters</Text>
              </Button> 
            </ListItem>                                   
            <ListItem iconLeft noBorder>
              <Button transparent onPress={()=> this.viewOfflineReadings() }>
                  <Icon name='notebook' type="SimpleLineIcons" style={{ color : "#fff"}} />
                  <Text style={{color : theme.WHITE_COLOR, fontWeight : "bold", }} > Offline Readings</Text>
              </Button> 
            </ListItem>                                   
            <ListItem iconLeft noBorder>
              <Button transparent                    
                onPress={()=>  Alert.alert(
                  'Are You Sure?',
                  '', [{
                      text: 'No',
                      onPress: () => { console.log('SignIn Cancel Pressed') },
                      style: 'cancel'
                  }, {
                      text: 'Yes',
                      onPress: () => {this.logout()}
                  }, ], { cancelable: false }
                ) 
                }>
                  <Icon name='logout' type="SimpleLineIcons" style={{ color : "#fff"}} />
                  <Text style={{color : theme.WHITE_COLOR, fontWeight : "bold", }} > Sign-out </Text>
              </Button> 
            </ListItem>                    
          </List>       
          </ScrollView>   
        </SafeAreaView> 
      </View>    
    );
  }
}
