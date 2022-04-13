import React, { Component } from 'react';
import { View,Dimensions,Image,Alert,BackHandler,FlatList,AsyncStorage, Modal, TouchableOpacity,SafeAreaView} from 'react-native';
import { Container,Header,Content,Left,Right,Body,Title,Button,Icon,Text,ListItem,List,Spinner,Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import NetInfo from "@react-native-community/netinfo";
import theme from  '../../config/theme';
import {styles} from '../../config/style';
import { OfflineReadingsComponent, EmptyComponent } from '../../components';
import { addMeterReadingAPI, addOfflineReadingAPI, compareAndSaveReadingAPI } from '../../api/methods/waterUsersAPI'

// Subscribe
NetInfo.addEventListener(async (state) => {   
  console.log("Is connected?", state.isConnected);
  if(state.isConnected){   
    Actions.refresh({key: Math.random()})
  }
  else {
    Toast.show({
      text: "You are Offline.",
      textStyle : { color : "#fff", textAlign : "center" },    
      duration: 3000,
      useNativeDriver: true,
      style: {  backgroundColor : "#173a65" }    
    }) 
  }
});

export default class ViewOfflineReadings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message : null,
      metersList : null,
      modalVisible : false
    };
  }
  
  uploadIfConnection = async (metersList) => {
    var init = true;
    NetInfo.fetch().then(state => {      
      console.log("Is connected?", state.isConnected);
      if(state.isConnected && init){  
        init = false;      
        if(metersList!=null){
          console.log("LOCAL METER READINGS", metersList + typeof metersList)
          //  start loader
          try {
            var response = [];
            metersList.forEach( async (row)=>{
              console.log("ROW > metername : ", row.meterName )
              await this.uploadReadingsOnServer(row.meterId,row.meterName,row.serialNumber,row.meterReading,row.meterImage,row.chargeCode,row.dateTime)   
              response.push(row.meterId);
              if(response.length  === metersList.length) {
                //foreach work done
                console.log("ICS VI 4 work done");                
                Toast.show({
                  text: "Readings Syncronized successfully",
                  textStyle : { color : "#fff", textAlign : "center" },    
                  duration: 3000,
                  useNativeDriver: true,
                  style: { backgroundColor : "#173a65" }    
                })
                this.clearReadings()
                this.refreshCurrentPage()
              }
            })  
                     
          } catch(e) {
            // remove error
            console.log("LOCAL forEach", e)
          }           
        }
        else {
          Toast.show({
            text: "No Offline Readings to Sync",
            textStyle : { color : "#fff", textAlign : "center" },    
            duration: 3000,
            useNativeDriver: true,
            style: { backgroundColor : "#173a65" }    
          })
        }         
      }
      else {
        Toast.show({
          text: "You are Offline.",
          textStyle : { color : "#fff", textAlign : "center" },    
          duration: 3000,
          useNativeDriver: true,
          style: {  backgroundColor : "#173a65" }    
        }) 
      }
    })
  }

  uploadReadingsOnServer = async (meter_id,meter_name,serial_number,meter_reading,file,charge_code,date_time) => {
    var formData = new FormData();    
    formData.append("meter_id", meter_id ); 
    formData.append("meter_reading", meter_reading ); 
    formData.append("date", date_time ); 
    formData.append("charge_code", charge_code );    
    formData.append("file", { name: "meterImage.jpg", type: 'image/jpg', uri: file  } );     
    
    // console.log("1 : ", JSON.stringify(formData))
    addMeterReadingAPI(formData)      
    .then(reading => {  
      if(reading.data.status==true){
        return true;
      }   
      else {
        return false;
      }   
    })
    .catch(error => {
      console.log("Meters Reading saved Failed.", error)
      return false;
    })   
  }


  saveReadingOffline = async (meter_name,serial_number,meter_reading,file,charge_code,date_time) => {
    var formData = new FormData();          
    formData.append("meter_name", meter_name ); 
    formData.append("serial_number", serial_number ); 
    formData.append("meter_reading", meter_reading ); 
    formData.append("file", { name: "meterImage.jpg", type: 'image/jpg', uri: file  } ); 
    formData.append("charge_code", charge_code ); 
    formData.append("date_time", date_time ); 
    
    // console.log("1 : ", JSON.stringify(formData))
    await addOfflineReadingAPI(formData)      
    .then(reading => {  
      if(!reading.status){
        return formData;
      }   
      else {
        return null
      }   
    })
    .catch(error => {
      console.log("Meters Reading saved Failed.", error)
      return null
    })
  }
  syncReadings = async () => {
    NetInfo.fetch().then(state => {   
      if(state.isConnected){ 
        this.setState({ modalVisible : true })
        compareAndSaveReadingAPI().then((resp)=>{
          console.log("CS : ", resp)
          if(resp.status){
            this.state.modalVisible && this.setState({ modalVisible : false })
            Toast.show({
              text: resp.message,
              textStyle : { color : "#fff", textAlign : "center" },    
              duration: 3000,
              useNativeDriver: true,
              style: {  backgroundColor : "#173a65" }    
            }) 
          }
          else {
            this.state.modalVisible && this.setState({ modalVisible : false })
            Toast.show({
              text: resp.message,
              textStyle : { color : "#fff", textAlign : "center" },    
              duration: 3000,
              useNativeDriver: true,
              style: {  backgroundColor : "#173a65" }    
            }) 
          }
        }).catch(error => {
          this.state.modalVisible && this.setState({ modalVisible : false })
          Toast.show({
            text: error,
            textStyle : { color : "#fff", textAlign : "center" },    
            duration: 2000,
            useNativeDriver: true,
            style: { backgroundColor : "#173a65" }    
          })
        })
      }
    })
  }

  componentWillMount(){     
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);       
  }
  componentDidMount = async () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress); 
    try {
      const jsonValue = await AsyncStorage.getItem('OFFLINE_READINGS')
      if(jsonValue != null) {
        var storage = JSON.parse(jsonValue)
        if(storage != null && storage.length > 0) {
          this.setState({ metersList : storage, message : null}); 
          this.uploadIfConnection(storage)
        }   
        else {
          this.setState({ metersList : null, message : "No Offline Records"});
        }                          
      } 
      else {
        this.setState({ metersList : null, message : "No Offline Records"});
      }      
    } catch(e) {
      // error reading value
      
    }    
  }
  componentWillUnmount() {    
    this.backHandler.remove();
  }
  handleBackPress = () => {      
    Actions.pop();
    return true;
  }
  clearReadings= async () =>{
    try {
      await AsyncStorage.removeItem('OFFLINE_READINGS')
    } catch(e) {
      // remove error
      console.log("LOCAL METER READINGS clear e", e)
    } 
  }
  clearOlReadings= async () =>{
    try {
      await AsyncStorage.removeItem('OFFLINE_READINGS')
    } catch(e) {
      // remove error
      console.log("LOCAL METER READINGS clear e", e)
    } finally {
      this.refreshCurrentPage()
    }
  }
  refreshCurrentPage = async () => {
    Actions.refresh({key: Math.random()})
  }
  toggleModal(modalVisible){
    this.setState({ modalVisible : !modalVisible})
  }
  render() {
    const { metersList, message, modalVisible } = this.state
    return (
        <Container style={styles.containerMainDiscover} >
            <Header transparent>
                <Left style={{ maxWidth : "20%"}}>  
                    <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                        <Icon name='arrow-back' type="MaterialIcons" style={{ color :"#000" }}  />
                    </Button>                   
                </Left>
                <Body style={{ alignItems : "flex-start"}}>
                    <Title style={{color:"#000"}}> Offline Readings </Title>
                </Body>                
            </Header>
            <View style={{ justifyContent : "center", alignItems : "center", paddingVertical : 10}}>
              <Image     
                source={theme.LOGO_APP}
                resizeMode="contain"
                style={{ width :290, height :100}}
              />  
            </View> 
            <Content>
            <View>
              { metersList != null &&  <FlatList 
                showsHorizontalScrollIndicator={false}              
                data={metersList}
                renderItem={({ item }) => <OfflineReadingsComponent                                            
                  id = {item.dateTime}                                    
                  meter_name = {item.meterName}                                                                 
                  serial_number = {item.serialNumber}
                  meter_reading = {item.meterReading}                                     
                  charge_code = {item.chargeCode}                                     
                  date_time = {item.dateTime}                                                     
                  lastphoto = {item.meterImage}                                                   
                /> }
              keyExtractor={(item, index) => {
                return item.dateTime.toString()
              }}                    
            /> } 
            </View>
            <View>
            { message != null &&  <EmptyComponent/> }
            </View>
            { metersList != null && message == null &&
                <View style={{ paddingVertical : 10}}>            
                    <Button full style={styles.submitButton} onPress={()=>  Alert.alert(
                        'Are You Sure?',
                        '', [{
                            text: 'No',
                            onPress: () => { console.log('SignIn Cancel Pressed') },
                            style: 'cancel'
                        }, {
                            text: 'Yes',
                            onPress: () => { this.clearOlReadings()}
                        }, ], { cancelable: false }
                    )}>
                        <Text style={styles.linkText} > Clear Offline Readings </Text>
                    </Button>  
                </View>
            }
              <Modal
                animationType="slide"
                transparent={true}
                presentationStyle="overFullScreen"
                visible={modalVisible}
                // onRequestClose={()=> this.toggleModal(modalVisible)}
              >
                <View style={styles.offlineSynchronizingModal}>
                  <Spinner color="#173a65" />
                  <Text style={{ textAlign : "center", fontWeight : "bold"}}> Please wait </Text>
                  <Text ellipsizeMode="tail" numberOfLines={1} style={{ textAlign : "center"}}> Offline Readings are synchronizing</Text>
                </View>
              </Modal>
            </Content>
        </Container>
    );
  }
}
