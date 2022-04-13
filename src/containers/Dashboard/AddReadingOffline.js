import React, { Component, Fragment } from "react";
import { StyleSheet,View,Dimensions,Image,Alert,BackHandler,FlatList,AsyncStorage,NativeModules,TouchableOpacity,Keyboard } from 'react-native';
import { Container,Header,Content,Card,CardItem,Label,Form, Item, Input,Left,Right,Body,Title,Button,Icon,Text,ListItem,List,Spinner,Picker } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as yup from 'yup';
import { Formik } from 'formik';
import DatePicker from 'react-native-datepicker';
import theme from  '../../config/theme';
import {styles} from '../../config/style';
import { upperCase } from '../../helpers';
import ReadingSchema from "../../service/ReadingSchema";
var meterReadingsArray = [];
var readingSchema = new ReadingSchema;
var ImagePicker = NativeModules.ImageCropPicker;
export default class AddReadingOffline extends Component {
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
  }
  componentDidMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
  }
  componentWillUnmount() {    
    this.backHandler.remove();     
  }
  handleBackPress = () => {
    Actions.pop();
    return true;
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
  addReading(values, newimage, date, meter_id, charge_code){
    console.log("ICS VALUES : ", JSON.stringify(values) + ' date : ' + date+ ' meter_id : ' + meter_id+ ' charge_code : ' + charge_code + " IMAGE : " + newimage.uri)   
    if( values.meter_name!="" && values.serial_number!="" && values.meter_reading!="" && charge_code!="" && date!="" && newimage.uri!=""){
      readingSchema.meterName = values.meter_name;
      readingSchema.serialNumber = values.serial_number;
      readingSchema.meterReading = values.meter_reading;
      readingSchema.chargeCode = charge_code;
      readingSchema.dateTime = date;
      readingSchema.meterImage = newimage.uri;
      AsyncStorage.getItem('OFFLINE_READINGS').then(req => {  
        console.log("ICS OFFLINE_READINGS 1: ", req)       
        if(req != null) {
          meterReadingsArray = JSON.parse(req);
          console.log("ICS OFFLINE_READINGS 2: ", meterReadingsArray)
        }

        meterReadingsArray.push(readingSchema); 
        console.log("ICS OFFLINE_READINGS 3: ", meterReadingsArray)
        AsyncStorage.setItem('OFFLINE_READINGS', JSON.stringify(meterReadingsArray)).then( res => {
          console.log("ICS OFFLINE_READINGS 4: ", res)          
          Alert.alert(
            "Success",
            "Reading saved offline.",
            [{
              text: "OK",
              style: "cancel",
              onPress: () => this.refreshCurrentPage()         
            }],
            { cancelable: true }
          )          
        }).catch((error) => console.log("ICS OFFLINE_READINGS 5: ", error))         
      }).catch((error) => console.log("ICS OFFLINE_READINGS: AsyncStorage error: ",error))
    }
    else {
      Alert.alert("Please fill all the Reading Details");
    }        

  }
  renderLoader(){
    return  <Spinner color="#fff" />
  }
  renderLoaderImage(){
    return  <Spinner color="blue" />
  }
  onValueChange2(value) {
    this.setState({ charge_code: value });
    this.dismissKeypad()
  }
  dismissKeypad(){
    Keyboard.dismiss();
  }
  refreshCurrentPage = async () => {
    Actions.refresh({key: Math.random()})
  }
  render() {  
    const { newimage,date,loading,codes,charge_code } = this.state   
    return (
      <Container style={styles.containerMainDiscover} >
        <Header transparent>
          <Left>  
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' type="MaterialIcons" style={{ color :"#000" }}  />
            </Button>                   
          </Left>
          <Body>
            <Title style={{color:"#000"}}> Add Reading Offline </Title>
          </Body>          
        </Header>
        <Content>
            <View style={{ backgroundColor : "#fff", paddingHorizontal : 20, paddingVertical : 30, width : "100%" }}>
            <Formik 
              initialValues={{ meter_name: "", serial_number: "", meter_reading: "", charge_code: "" }}          
              onSubmit={(values) => { this.addReading(values, newimage, date, "", charge_code) }}                
              validationSchema={yup.object().shape({
                  meter_name: yup                 
                  .string()
                  .required('* Required'),
                  serial_number: yup                 
                  .string()
                  .required('* Required'),                  
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
                        value={values.meter_name}
                        onChangeText={handleChange('meter_name')}
                        onBlur={() => setFieldTouched('meter_name')}
                        placeholder="Meter Name" 
                        placeholderTextColor="#ccc"
                        style={{ color : "#000", textAlign : "right"}}                  
                        autoCapitalize="none"
                        selectionColor="#000"
                        // editable={false}
                      />  
                       { touched.meter_name && errors.meter_name &&
                        <Text style={{ color : "red", position : "absolute", bottom : 0, right : 10 }} >{errors.meter_name}</Text> }                      
                      </Item>  
                      {/* METER SERIAL NUMBER */}                                 
                      <Item inlineLabel>                  
                      <Label onPress={()=> this.dismissKeypad()}> Serial Number </Label>               
                      <Input 
                        value={values.serial_number}
                        onChangeText={handleChange('serial_number')}
                        onBlur={() => setFieldTouched('serial_number')}
                        placeholder="Serial Number" 
                        placeholderTextColor="#ccc"
                        style={{ color : "#000", textAlign : "right"}}                              
                        autoCapitalize="none"
                        selectionColor="#000"
                        // editable={false}
                      />  
                       { touched.serial_number && errors.serial_number &&
                        <Text style={{ color : "red", position : "absolute", bottom : 0, right : 10 }} >{errors.serial_number}</Text> }                     
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
                        <TouchableOpacity style={{ width:"100%"}} onPress={()=> this.dismissKeypad()}>
                          <View>
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
                                <Picker.Item label="Select" value="" />                              
                                <Picker.Item label="CO" value="CO" />                              
                                <Picker.Item label="CE" value="CE" />                              
                                <Picker.Item label="TO" value="TO" />                              
                                <Picker.Item label="TE" value="TE" />                              
                                <Picker.Item label="NC" value="NC" />                              
                                <Picker.Item label="DF" value="DF" />                              
                                <Picker.Item label="LN" value="LN" />                              
                            </Picker>                                             
                          </View>  
                        </TouchableOpacity>
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
                        {  (newimage == null) ? <Image source={theme.IMAGE_UPLOAD} resizeMode="contain" style={{ width : "100%", height : "100%"}}/> : <Image source={newimage} resizeMode="contain" style={{ width : "100%", height : "100%"}}/> }       
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