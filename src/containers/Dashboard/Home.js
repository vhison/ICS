import React, { Component } from 'react';
import { ImageBackground,View,Dimensions,Image,Alert,BackHandler,FlatList,AsyncStorage, SafeAreaView} from 'react-native';
import { Container,Header,Content,Left,Right,Body,Title,Button,Icon,Text,ListItem,List,Spinner,H1 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import NetInfo from "@react-native-community/netinfo";
import theme from  '../../config/theme';
import {styles} from '../../config/style';
import { SliderImagesComponent } from '../../components';
import { searchMetersAPI, getChargeCodesDetailsAPI } from '../../api/methods/waterUsersAPI'
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider : null,   
      backClickCount: 0 
    }
  }
  componentWillMount(){     
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);      
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);    
    this.bindSliderBoxImages(DATA)       
    NetInfo.fetch().then(state => {      
      console.log("ICS Is connected?", state.isConnected);
      if(state.isConnected){
        this.saveMeterConnectionsToOffline()
        this.saveChargeCodesToOffline()
      }      
    })    
  }
  componentWillUnmount() {    
    this.backHandler.remove();
  }  

  saveMeterConnectionsToOffline = async () => {
    await searchMetersAPI()
    .then((meters) => {         
      console.log("ICS saveMeterConnectionsToOffline length : ", meters.data.result.length )   
      if(meters.data.result.length > 0){
        // console.log("ICS saveMeterConnectionsToOffline : ", meters.data.result )  
        this.storeMeterConnections(meters.data.result) 
      }   
      else {
        console.log("ICS saveMeterConnectionsToOffline no records")   
      }
    })
    .catch(error => {
      console.log("ICS saveMeterConnectionsToOffline Failed.", error)
    })
  }
  saveChargeCodesToOffline = async () => {    
    await getChargeCodesDetailsAPI()      
    .then((codes) => {                       
      // console.log("ICS saveChargeCodesToOffline : ", codes.data.result)    
      this.storeChargeCodesData(codes.data.result)      

    })
    .catch(error => { console.log("ICS saveChargeCodesToOffline failed.", error) });  
  }
  storeChargeCodesData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('CHARGE_CODES', jsonValue)
      // console.log("ICS saveChargeCodesToOffline jsonValue : ", jsonValue)    
    } catch (e) {
      // saving error
      console.log("ICS saveChargeCodesToOffline saving error : ", e)    
    }
  }
  storeMeterConnections = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('METER_CONNECTIONS', jsonValue)
      // console.log("ICS METER_CONNECTIONS jsonValue : ", jsonValue)    
    } catch (e) {
      // saving error
      console.log("ICS METER_CONNECTIONS saving error : ", e)    
    }
  }
  handleBackPress = () => {
    Actions.drawerClose()  
    this.setState({ backClickCount : this.state.backClickCount + 1 }) 
    console.log("ICS navigation state : ", (this.props.navigation) + this.state.backClickCount)
    if(this.state.backClickCount > 1) {
      this.setState({ backClickCount : 0})
      Alert.alert(
        'Exit App',
        'Exiting the application?', [{
            text: 'Cancel',
            onPress: () => { console.log('Cancel SignIn Exit Pressed') },
            style: 'cancel'
        }, {
            text: 'OK',
            onPress: () => { BackHandler.exitApp()}
        }, ], {
          cancelable: false
        }
      )    
    }
    return true;
  }
  bindSliderBoxImages(images){
    var A = []
    images.forEach((i)=>{
      A.push(i.image)
    })
    this.setState({ slider : A})
  }
  render() {
    const { slider } = this.state
    
    return (
      <Container style={styles.containerMainDiscover} >
        <Header transparent>
          <Left>
            <Button transparent onPress={()=> { Actions.drawerOpen() }} >
              <Icon name='menu' type="SimpleLineIcons" style={{ color :"#000" }}  />              
            </Button>            
          </Left>
          <Body>
            <Title style={{color:"#000", alignSelf : "center"}}> Home </Title>
          </Body>
          <Right>                      
          </Right>
        </Header>
        <ImageBackground source={theme.HOME_SCREEN} style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}>          
        </ImageBackground>
        {/* <Content>    */}        
        {/* <View style={{ justifyContent : "center", alignItems : "center", paddingVertical : 10}}> */}
            {/* <Image     
              source={theme.HOME_SCREEN}
              resizeMode="contain"
              style={{ width :290, height :150}}
            />   */}
          {/* </View>        */}
           {/*  { slider!=null && <SliderImagesComponent sliderimages={slider}/> }                    */}

        {/* <View style={{ flex: 1, alignItems: 'center' }} >
          <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>            
            { slider!=null && <SliderImagesComponent sliderimages={slider}/> }  
          </View>
          <View style = {{ opacity: 0.9, backgroundColor: "transparent"  }}>
          <Image     
              source={theme.LOGO_APP_WHITE}
              resizeMode="contain"
              style={{ width :290, height :150}}
            /> 
          </View>
          <View style={{ marginTop : (SCREEN_HEIGHT * 50)/100}}>
            <H1 style={{ color : "#fff"}}> IRRIGATOR PORTAL </H1>
          </View>
        </View> */}
        {/* </Content> */}
      </Container>
    );
  }
}
const DATA = [
  {  
    id: 1,      
    image: theme.ONE
  }, 
  {  
    id: 2,      
    image: theme.TWO
  }, 
  {  
    id: 3,      
    image: theme.THREE
  }, 
  {  
    id: 4,      
    image: theme.FOUR
  }
]