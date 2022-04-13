import React, { Component, Fragment } from "react";
import { StyleSheet,View,Text,Dimensions,Image, BackHandler,SafeAreaView,Alert, AsyncStorage, TouchableHighlight } from 'react-native';
import { Container,Header,Icon,Content,Form,Item,Input,ListItem,Radio,Right,Left,Button,Spinner,Toast } from 'native-base';
import NetInfo from "@react-native-community/netinfo";
import TouchID from 'react-native-touch-id';
import {Actions} from 'react-native-router-flux';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { loginUser } from '../../redux/actions';
// import { upperCase } from '../../helpers';
import theme from  '../../config/theme';
import {styles} from '../../config/style';

import DataSync from '../../service/DataSync';
var dataSync = new DataSync;

const optionalConfigObject = {
  title: 'Authentication Required', // Android
  imageColor: '#173a65', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Touch sensor', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};
// Subscribe
const unsubscribe = NetInfo.addEventListener(state => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
  if(state.isConnected){
    dataSync.viewLog(true);
    Toast.show({
      text: "You are Online.",
      textStyle : { color : "#fff", textAlign : "center" },    
      duration: 3000,
      useNativeDriver: true,
      style: {  backgroundColor : "#173a65" }    
    }) 
  }
  else {
    dataSync.viewLog(false);
    Toast.show({
      text: "You are Offline.",
      textStyle : { color : "#fff", textAlign : "center" },    
      duration: 3000,
      useNativeDriver: true,
      style: {  backgroundColor : "#173a65" }    
    }) 
  }
});

// Unsubscribe 
// unsubscribe();  // uncomment if want to check netstate only at once

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };    
  }
  componentWillMount(){     
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);    
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);    
  }
  componentWillUnmount() {    
    this.backHandler.remove();
  }

  handleBackPress = () => {
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
    return true;
  }
 
  usersignin(values)  {    
    const { username, password } = values
    var formData = new FormData();    
    formData.append("username", username); 
    formData.append("password", password);     
    this.props.loginUser(formData); //Action
  }
  renderLoader(){
    return  <Spinner style={styles.loadingContainer} color="#173a65" />
  }
  loginSuccess(){
    Actions.jump('home');
  }  

  _pressHandler() {
    TouchID.authenticate('', optionalConfigObject)
      .then(success => {
        console.log("TOUCH success")
        this.loginSuccess()
        // Alert.alert('Authenticated Successfully');
      })
      .catch(error => {
        console.log("TOUCH err")
        Alert.alert('Authentication Failed');
      });
  }
 

  render() {
    const { user, loading, error } = this.props        
    return (
      <Container style={styles.containerMain}>
        <Content showsVerticalScrollIndicator ={false} > 
          <View style={styles.outerSignIn}>
          <View style ={styles.containerInnerSignIn}>            
            <View style={styles.containerInnerimg} >
                <Image
                  source={theme.LOGO_APP}                       
                  style={styles.logoSignIn}       
                /> 
             </View>
             {/* <View style={styles.formInputsSignIn}> */}
              <Formik
                  initialValues={{ username: "", password: "" }}                
                  // initialValues={{ username: "test@gmail.com", password: "ntf12345" }}                
                  onSubmit={values => this.usersignin(values)}
                  validationSchema={yup.object().shape({
                    username: yup
                    .string()                    
                    .trim()
                    .required('Username is required!'),                    
                    password: yup
                      .string()
                      .trim()
                      .required('Password is required!')                
                  })}
                  >
                  {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                <Fragment>
                  <Form>                  
                  <Item style={styles.inputItem} >
                    <Icon name='user' type="EvilIcons" />
                    <Input 
                      value={values.username}
                      onChangeText={handleChange('username')}
                      onBlur={() => setFieldTouched('username')}
                      placeholder='Username'                                                             
                      underlineColor="transparent"                 
                      autoCapitalize="none"                    
                    />
                    { touched.username && errors.username &&
                      <Text style={styles.errorInput} >{errors.username}</Text>
                    }
                  </Item>     
                  <Item style={styles.inputItem} >
                    <Icon  name='lock' type="EvilIcons" />
                    <Input 
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={() => setFieldTouched('password')}
                      placeholder="Password"                      
                      underlineColor="transparent"                      
                      autoCapitalize="none"
                      secureTextEntry={true}                        
                    />
                    { touched.password && errors.password &&
                      <Text style={styles.errorInput} >{errors.password}</Text>
                    }  
                  </Item>                   
                  <Button full style={styles.submitButton} onPress={handleSubmit}>
                      <Text style={styles.linkText} >SIGN IN</Text>
                  </Button>                     
                  </Form>
                </Fragment>
                  )}
              </Formik>  
            {/* </View> */}
          </View>
          </View>
           { loading && this.renderLoader()}         
           { error!='' && <View>
                <Text style={{ color : "red", position : "absolute", textAlign : "center", paddingHorizontal : 50}} >{error}</Text>
             </View>}         
           <View style={styles.bottomLinks}>
              {/* <View style={styles.bottomTextTermsConditions}>      
                <Text style={{color : theme.WHITE_COLOR, height : 40,paddingVertical : 10}}>Need an Account?</Text>
                <Text style={{color : theme.WHITE_COLOR, height : 40,paddingVertical : 10,fontWeight:"bold"}} onPress={()=>Actions.jump('signup')} > Sign up </Text>                          
              </View>   */}
              <View style={styles.bottomTextTermsConditions}>      
              <TouchableHighlight onPress={()=>this._pressHandler()}>
                <Text>
                  Authenticate with Fingerprint
                </Text>
              </TouchableHighlight>               
              </View>  
              {/* <View>
              <Text 
                style={styles.footerLinkText} 
                onPress={() => { Actions.jump('forgotpassword')}}
              > Forgot Password</Text>   
              </View>   */}
           </View>                      
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  const { user, error, loading } = auth;
  return { user, error, loading };
};
export default connect(mapStateToProps, { loginUser })(Login);