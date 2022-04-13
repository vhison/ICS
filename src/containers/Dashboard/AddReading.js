import React, { Component, Fragment } from "react";
import { View,Image,Alert,BackHandler,FlatList,AsyncStorage, NativeModules, TouchableOpacity, Keyboard } from 'react-native';
import { Container,Header,Content,Label,Form, Item, Input,Left,Right,Body,Title,Button,Icon,Text,Spinner,Picker } from 'native-base';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import * as yup from 'yup';
import { Formik } from 'formik';
import theme from  '../../config/theme';
import {styles} from '../../config/style';
import { upperCase } from '../../helpers';
import { addMeterReadingAPI, getChargeCodesDetailsAPI } from '../../api/methods/waterUsersAPI';
import ReadingSchema from "../../service/ReadingSchema";
var meterReadingsArray = [];
var ccArray = [];
var readingSchema = new ReadingSchema;
var ImagePicker = NativeModules.ImageCropPicker;

export default class AddReading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newimage : null,
      codes : null,
      loading : false,
      date : new Date(),
      charge_code: undefined
    };
  }
  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress); 
    this.fillChargeCodes()
  }
  componentDidMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
    console.log("ICS OFFLINE_READINGS 5 : ", meterReadingsArray)
  }
  componentWillUnmount() {    
    this.backHandler.remove();     
  }
  handleBackPress = () => {
    Actions.pop();
    return true;
  }  
  fillChargeCodes = async () => {   
    AsyncStorage.getItem('CHARGE_CODES').then(req => {  
      console.log("ICS CHARGE_CODES 1: ", typeof req)       
      if(req != null) {
        ccArray = JSON.parse(req);
        this.setState({ codes : ccArray, charge_code : ccArray[0].id })
        console.log("ICS CHARGE_CODES 2: ", req)
      }      
    })    
  }
 
  pickSingleBase64(cropit) {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: cropit,
      includeBase64: true,
      includeExif: true,
      compressImageQuality:0.5,
      loadingLabelText : 'Uploading..',
      mediaType : 'photo',
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      
    }).then(image => {
      console.log('received base64 image');
      this.setState({
        newimage: { 
          uri: Platform.OS === 'ios' ? `data:${image.mime};base64,`+ image.data : image.path, 
          width: image.width, 
          height: image.height
        }
      });
    }).catch(e =>  Alert.alert(
      "",
      e.message,
      [{
        text: "OK",
        style: "cancel",
        onPress: () => { this.setState({ newimage : null})}
        },                  
      ],
      { cancelable: true }
    ))
  }

  pickSingleWithCamera(cropping, mediaType = 'photo') {
    ImagePicker.openCamera({
      width: 400,
      height: 400,      
      cropping: cropping,
      includeBase64: true,
      includeExif: true,
      compressImageQuality:0.5,
      loadingLabelText : 'Uploading..',
      mediaType,
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
    })
    .then(image => {
      console.log('received base64 image');
      this.setState({
        newimage: { 
          uri: Platform.OS === 'ios' ? `data:${image.mime};base64,`+ image.data : image.path, 
          width: image.width, 
          height: image.height
        }
      });
    }).catch(e =>  Alert.alert(
      "",
      e.message,
      [{
        text: "OK",
        style: "cancel",
        onPress: () => { this.setState({ newimage : null})}
        },                  
      ],
      { cancelable: true }
    ))
  }

  setDate(newDate) {
    this.setState({ date : newDate });
    Keyboard.dismiss();
  } 
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hr = d.getHours(),
        min = d.getMinutes(),
        sec = d.getSeconds();
        
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if (hr < 10) 
        hr = "0" + hr;
    if (min < 10) 
        min = "0" + min;
    if (sec < 10) 
        sec = "0" + sec;
        // 2020-10-09 04:27:00
    return year+'-'+month+'-'+day+' '+hr+':'+min+':'+sec;
    
  }
  addReading(values, newimage, rdate, meter_id, charge_code){
    console.log("VALUES : ", JSON.stringify(values) + ' date : ' + rdate+ ' meter_id : ' + meter_id+ ' charge_code : ' + charge_code)  
    
    console.log("INSTANCE OF DATE : ", rdate instanceof Date)
    var date;
    if(rdate instanceof Date){
      date = this.formatDate(rdate);
    } else {
      date = rdate;
    }
    console.log("INSTANCE OF DATE FORMATTED : ", date)
    this.setState({ loading : true}) 
    if(charge_code!="" && charge_code != undefined){    
      if(newimage!=null) {
        
        //  if connection is lost, the reading is saved locally         
        var formData = new FormData();          
        formData.append("meter_id", meter_id ); 
        formData.append("meter_reading", values.meter_reading ); 
        formData.append("date", date.toString() ); 
        formData.append("charge_code", charge_code );            

        newimage!=null && formData.append("file", {               
          name: "meterImage.jpg",            
          type: 'image/jpg',
          uri: newimage.uri,  
        } )      
        addMeterReadingAPI(formData)      
        .then(reading => {  
          console.log("Meters Reading SAVED : ",reading.data.message )               
          if(reading.data.status==true){
            Alert.alert(
              "",
              reading.data.message,
              [{
                text: "OK",
                style: "cancel",
                onPress: () => { 
                  Actions.pop()
                  Actions.refresh({key: Math.random()})
                  }          
              }],
              { cancelable: true }
            )     
          }         
        })
        .catch(error => {
          console.log("Meters Reading saved Failed.", error)
          // save reading locally                 
          readingSchema.meterId = meter_id;
          readingSchema.meterName = values.meter_name;
          readingSchema.serialNumber = values.serial_number;
          readingSchema.meterReading = values.meter_reading;
          readingSchema.chargeCode = charge_code;
          readingSchema.dateTime = date.toString();
          readingSchema.meterImage = newimage.uri;
          this.retreiveData(readingSchema);              
          
        })
        .finally(() => {
          this.setState({ newimage : null, loading : false })     
        })        
      }
      else {
        Alert.alert(
          "",
          "Please Upload Meter Image!",
          [{
            text: "OK",
            style: "cancel",
            onPress : () => this.setState({ loading : false })               
          }],
          { cancelable: true }
        )        
      } 
    }
    else {
      Alert.alert(
        "",
        "Please select the Charge Code",
        [{
          text: "OK",
          style: "cancel",
          onPress : () => this.setState({ loading : false })              
        }],
        { cancelable: true }
      )
    }
  }
  retreiveData = async(readingSchema) => {
    try {
      const jsonValue = await AsyncStorage.getItem('OFFLINE_READINGS')
      if(jsonValue != null) {
        meterReadingsArray = JSON.parse(jsonValue);
        console.log("ICS OFFLINE_READINGS 2: ", meterReadingsArray)
      }
      meterReadingsArray.push(readingSchema); 
      this.storeData(meterReadingsArray)
    } catch(e) {
      // error reading value
    } finally {
      meterReadingsArray.splice(0, meterReadingsArray.length);
    }
  }
  storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('OFFLINE_READINGS', jsonValue)
    } catch (e) {
      // saving error
    } finally {
      Alert.alert(
        "Success",
        "Reading saved offline.",
        [{
          text: "OK",
          style: "cancel",
          onPress: () => {
            Actions.pop()          
          }        
        }],
        { cancelable: true }
      )
    }    
  }
  renderLoader(){
    return  <Spinner color="#fff" />
  }
  renderLoaderImage(){
    return  <Spinner color="blue" />
  }
  onValueChange2(value) {
    this.setState({
      charge_code: value
    });
    this.dismissKeypad()
  }
  dismissKeypad(){
    Keyboard.dismiss();
  }
  render() {
    const { meter_id, username, contact_name, serial_number, meter_name, channel_name, property, meternumber, metertype, wr_number, image, createdAt, lastphoto } = this.props
    const { newimage, date, loading, codes,charge_code } = this.state   
    
    let filteredItems = [] ;
    if(codes!=null && codes.length > 0){
      filteredItems = codes;
    }   
   
    return (
      <Container style={styles.containerMainDiscover} >
        <Header transparent>
          <Left>  
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' type="MaterialIcons" style={{ color :"#000" }}  />
            </Button>                   
          </Left>
          <Body>
            <Title style={{color:"#000"}}> Add Reading </Title>
          </Body>
          <Right>             
          </Right>
        </Header>
        <Content>
           <View style={{ backgroundColor : "#fff", justifyContent : "center", alignItems : "center", paddingVertical : 30,height : 250, width : "100%"}}>
           { lastphoto!="" ? <Image source={{ uri : lastphoto }} style={{borderRadius:10,height:165, width:"50%", resizeMode:'cover'}}  onLoadStart={(e)=> console.log("LOADING START : ")}
              onLoadEnd={(e)=> console.log("LOADING END : ")}
              onLoad={(e)=> this.renderLoaderImage()}
              onLoadStart={()=> this.renderLoaderImage()}
              loadingIndicatorSource={theme.EMPTY_RECORD}
              progressiveRenderingEnabled /> : <Image source={theme.ADD_RECORD} style={{borderRadius:10,height:165, width:"50%", resizeMode:'cover'}}/>}                 
            </View> 
            <View style={{ backgroundColor : "#fff", paddingHorizontal : 20, paddingVertical : 30, width : "100%" }}>
            <Formik
              initialValues={{ meter_name: meter_name, serial_number: serial_number, meter_reading: "", charge_code: ""  }}          
                onSubmit={(values) => { this.addReading(values, newimage, date, meter_id, charge_code) }}               
                validationSchema={yup.object().shape({
                  meter_reading: yup
                  .number()
                  .typeError('Must be a number')
                  .lessThan(10000000,'Limit exceeds')
                  .required('* Required')
                  .positive('Must be positive')                                        
                })}
                >
                {({ values, handleReset, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                  <Fragment>
                    
                    <Form>
                      {/* METER NAME */}
                      <Item inlineLabel>                  
                      <Label onPress={()=> this.dismissKeypad()}> Meter Name </Label>
                      <Input 
                        value={upperCase(values.meter_name)}
                        onChangeText={handleChange('meter_name')}
                        onBlur={() => setFieldTouched('meter_name')}
                        placeholder="Meter Name" 
                        placeholderTextColor="#ccc"
                        style={{ color : "#000", textAlign : "right"}}                  
                        autoCapitalize="none"
                        selectionColor="#000"
                        editable={false}
                      />                      
                      </Item>  
                      {/* METER SERIAL NUMBER */}                                 
                      <Item inlineLabel>                  
                      <Label onPress={()=> this.dismissKeypad()}> Serial Number </Label>               
                      <Input 
                        value={upperCase(values.serial_number)}
                        onChangeText={handleChange('serial_number')}
                        onBlur={() => setFieldTouched('serial_number')}
                        placeholder="Serial Number" 
                        placeholderTextColor="#ccc"
                        style={{ color : "#000", textAlign : "right"}}                              
                        autoCapitalize="none"
                        selectionColor="#000"
                        editable={false}
                      />                     
                      </Item> 
                      {/* METER READING VOLUME */}                                                                   
                      <Item inlineLabel>                  
                      <Label onPress={()=> this.dismissKeypad()}> Meter Reading(ML) </Label>              
                      <Input 
                        value={values.meter_reading}
                        onChangeText={handleChange('meter_reading')}
                        onBlur={() => setFieldTouched('meter_reading')}
                        placeholder="Volume" 
                        placeholderTextColor="#ccc"
                        style={{ color : "#000", textAlign : "right"}}                
                        keyboardType="phone-pad"
                        selectionColor="#000"
                      />
                      { touched.meter_reading && errors.meter_reading &&
                        <Text style={{ color : "red", position : "absolute", bottom : 0, right : 10 }} >{errors.meter_reading}</Text> }                        
                      </Item>   
                      {/* METER READING CHARGE CODE DROPDOWN */}
                      <Item inlineLabel >
                        <Label onPress={()=> this.dismissKeypad()} style={{ width: "65%" }}> Charge Code </Label>   
                        {
                          filteredItems.length > 0 ?  <TouchableOpacity style={{ width:"100%"}} onPress={()=> this.dismissKeypad()}><View> 
                            <Picker                            
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons"/>}
                            style={{ width: "40%" }}
                            placeholder=" - "
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={charge_code}
                            onValueChange={this.onValueChange2.bind(this)}
                            >
                              { filteredItems.map(acct => { 
                                return <Picker.Item key={acct.id} label={acct.charge_code} value={acct.id} />; 
                              }) }         
                            </Picker> 
                            </View>
                            </TouchableOpacity> : this.renderLoader()
                        }                                             
                      </Item>                     
                      {/* METER READING DATE AND TIME */}   
                      <Item inlineLabel>                  
                      <Label onPress={()=> this.dismissKeypad()}> Date {`&`} Time </Label>                     
                      <DatePicker
                        style={{width: 200}}
                        date={date}
                        mode="datetime"
                        placeholder={date.toString().substr(4, 21)}
                        format="YYYY-MM-DD hh:mm:ss"                        
                        maxDate={new Date()}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{                         
                          dateInput: {
                            marginLeft: 36,
                            borderColor : "#fff"
                          }                          
                        }}
                        showIcon={false}
                        onDateChange={(d)=>{this.setDate(d)}}
                      />
                      </Item> 
                      {/* METER READING PHOTO */}                                                                                
                      <TouchableOpacity activeOpacity={0.6} onPress={()=>  {
                          Alert.alert(
                            "Please Select!",
                            "",
                            [{
                              text: "Gallery",                            
                              onPress: () => { this.pickSingleBase64(false) }          
                            },
                            {
                              text: "Camera",                            
                              onPress: () => { this.pickSingleWithCamera(false) }          
                            }],
                            { cancelable: true }
                          )  
                          this.dismissKeypad()                                                
                        }}>
                        <View style={{ backgroundColor : "#fff", justifyContent : "center", alignItems : "center", paddingVertical : 30,height : 220, width : "100%"}}>
                        { (newimage == null) ? <Image source={theme.IMAGE_UPLOAD} resizeMode="contain" style={{ width : "100%", height : "100%"}}/> : <Image source={newimage} resizeMode="contain" style={{ width : "100%", height : "100%"}}/> }       
                        </View> 
                      </TouchableOpacity>                        
                      <Button disabled={loading} full style={styles.submitButton} onPress={handleSubmit}>
                        { loading && this.renderLoader()}   
                        <Text style={styles.linkText} >SAVE</Text>
                      </Button>                                    
                    </Form>
                    
                  </Fragment>
                )}
              </Formik>
            </View>
        </Content>        
      </Container>
    );
  }
}