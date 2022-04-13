import React, { Component, Fragment } from "react";
import { StyleSheet,View,Dimensions,Image,Alert,BackHandler,FlatList,AsyncStorage,NativeModules,TouchableOpacity,Keyboard } from 'react-native';
import { Container,Header,Content,Card,CardItem,Label,Form, Item, Input,Left,Right,Body,Title,Button,Icon,Text,ListItem,List,Spinner,Picker } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as yup from 'yup';
import { Formik } from 'formik';
import theme from  '../../config/theme';
import {styles} from '../../config/style';
import { MetersListComponent, EmptyComponent } from '../../components';
var connectionsArray = [];

export default class OfflineMeterConnections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message : null,
      metersList : null,
      textstring : ""
    };
  }
  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);     
  }
  componentDidMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
    this.retreiveMeterConnections()
  }
  componentWillUnmount() {    
    this.backHandler.remove();     
  } 
  handleBackPress = () => {
    Actions.pop();
    return true;
  }  
  retreiveMeterConnections = async () => {
    try {
      AsyncStorage.getItem('METER_CONNECTIONS').then(req => {  
        console.log("ICS METER_CONNECTIONS 1: ", typeof req)       
        if(req != null) {
          connectionsArray = JSON.parse(req);          
          // console.log("ICS METER_CONNECTIONS 2: ", req)
          if(connectionsArray.length > 0){
            this.setState({ metersList : connectionsArray, message : null })           
          }
          else {
            this.setState({ metersList : null, message : "Connections not found" })           
          } 
        }       
      })   
    } catch (e) {
      // saving error
      console.log("ICS METER_CONNECTIONS saving error : ", e)    
    } 
  }
  searchMeter(values){
    console.log("VALUES :", values.text)
    // console.log("VALUES :", values.text + JSON.stringify(connectionsArray))
    this.setState({ textstring : values.text})  
    const newData = connectionsArray.filter(item => {
      const itemData = `${item.username.toUpperCase()}   
      ${item.contact_name.toUpperCase()}${item.serial_number.toUpperCase()}${item.meter_name.toUpperCase()}`;
      const textData = this.state.textstring.toUpperCase();      
      return itemData.indexOf(textData) > -1; 
    });
    this.setState({ metersList : newData });
  }
  refreshCurrentPage = async () => {
    Actions.refresh({key: Math.random()})
  }

  render() {
    const { metersList, message, textstring } = this.state
    return (
      <Container style={styles.containerMainDiscover} >
        <Header transparent>
          <Left>  
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' type="MaterialIcons" style={{ color :"#000" }}  />
            </Button>                   
          </Left>
          <Body>
            <Title style={{color:"#000"}}> Connections </Title>
          </Body>
          <Right>  
            <Icon name='refresh' type="MaterialIcons" style={{ color :"#000",paddingRight : 15 }}  onPress={()=> this.refreshCurrentPage()}/>
          </Right>          
        </Header>
        <View style={{ marginHorizontal : 20 }}>
              <Formik
                initialValues={{ text: ""}}          
                onSubmit={values => this.searchMeter(values)}
                validationSchema={yup.object().shape({
                  text: yup
                  .string()                 
                  .trim()
                  .required('Please fill to search!')                
                })}
                >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                  <Fragment>
                    <Form>
                      <Item searchBar rounded style={{ height:40 }}>                 
                      <Input 
                        value={textstring}
                        onChangeText={(text) => this.searchMeter({ text : text})}
                        // onBlur={() => setFieldTouched('text')}
                        placeholder="Search Connections Offline" 
                        placeholderTextColor="#ccc"
                        style={{ color : "#000", paddingLeft : 40}}                  
                        autoCapitalize="none"
                        selectionColor="#000"
                      />                     
                        <Icon name="magnifier" type="SimpleLineIcons" style={{ color: "#000", paddingRight : 10 }} />
                      </Item>                                   
                    </Form>
                  </Fragment>
                )}
              </Formik>           
            </View>
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
              renderItem={({ item }) => <MetersListComponent                                            
                id = {item.id} 
                username = {item.username} 
                contact_name = {item.contact_name}                   
                serial_number = {item.serial_number}                                     
                meter_name = {item.meter_name}                                     
                channel_name = {item.channel_name}                                     
                property = {item.property}                                     
                meternumber = {item.meternumber}                                     
                metertype = {item.metertype}                                     
                wr_number = {item.wr_number}                                     
                image = {item.image}                                     
                createdAt = {item.createdAt}                                                   
                lastphoto = {item.lastphoto}                                                   
              /> }
            keyExtractor={(item, index) => {
              return item.id.toString()
            }}                    
          /> } 
          </View>
          <View>
          { message != null &&  <EmptyComponent/> }
          </View>
        </Content>
      </Container>
    );
  }
}
