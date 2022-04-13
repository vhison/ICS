import React, { Component, Fragment } from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity, BackHandler, NativeModules, Alert} from 'react-native';
import { Container, Header, Icon, Content, Form, Item, Input, ListItem, Radio, Right, Left, Button, Spinner  } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as yup from 'yup';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions';
import theme from  '../../config/theme';
import {styles} from '../../config/style';
var ImagePicker = NativeModules.ImageCropPicker;

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newimage: null
    };    
  }  
  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress); 
  }
  componentDidMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
  }
  componentWillUnmount(){    
    this.backHandler.remove();     
  }
  handleBackPress = () => {
    Actions.pop();
    return true;
  }
  renderLoader(){
    return  <Spinner color="red" />
  }
  pickSingleBase64(cropit) {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: cropit,
      includeBase64: true,
      includeExif: true,
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
        style: "cancel"
        },                  
      ],
      { cancelable: true }
    ))
  }
  signupuser(values, newimage){
    console.log("signupuser > VALUES : ", values + newimage)
    const { username, email, password } = values
    var formData = new FormData();    
    formData.append("username", username); 
    formData.append("email", email); 
    formData.append("password", password);    
    // newimage!=null && formData.append("file", {               
    //   name: "operator",            
    //   type: 'image/jpg',
    //   uri: newimage.uri,  
    // } ); 

    console.log("signupuser > formData : ", formData)
    this.props.registerUser(formData);
  }

  render() {
    const { user, loading } = this.props
    const { newimage } = this.state
    return (
      <ImageBackground source={theme.BACKGROUND} style={{width: '100%', height: '100%'}}>
        <Container style={styles.containerMain} >
          <Content showsVerticalScrollIndicator ={false}> 
            <View style ={styles.containerInnerSignup}>
              <View style={styles.containerInnerimg} >
                  {/* <Image source={theme.LOGO_APP} style={styles.logoSignIn} />  */}
               </View>
               <Formik
                  initialValues={{ username : "", email: "", password: "", confirmpassword: "" }}                
                  onSubmit={values => this.signupuser(values,newimage)}
                  validationSchema={yup.object().shape({                  
                    username: yup
                      .string()                    
                      .trim()
                      .required('Username is required!'),
                    email: yup
                      .string()
                      .email('Enter valid email address!')
                      .trim()
                      .required('Email is required!'),                    
                    password: yup
                      .string()
                      .trim()
                      .required('Password is required!'),
                    confirmpassword: yup
                      .string()
                      .trim()
                      .required('confirm password is required!')
                      .test('passwords-match', 'Passwords must match', function(value) {
                        return this.parent.password === value;
                      })                
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
                      <Icon name='envelope' type="EvilIcons" />
                      <Input 
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={() => setFieldTouched('email')}
                        placeholder="Email"                                                            
                        underlineColor="transparent"                 
                        autoCapitalize="none"
                      />
                      { touched.email && errors.email &&
                        <Text style={styles.errorInput} >{errors.email}</Text>
                      }
                    </Item>                    
                    <Item style={styles.inputItem} >
                      <Icon name='lock' type="EvilIcons" />
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
                    <Item style={styles.inputItem} >
                      <Icon name='lock' type="EvilIcons" />
                      <Input 
                        value={values.confirmpassword}
                        onChangeText={handleChange('confirmpassword')}
                        onBlur={() => setFieldTouched('confirmpassword')}
                        placeholder="Confirm Password"                        
                        underlineColor="transparent"                      
                        autoCapitalize="none"
                        secureTextEntry={true}                        
                      />
                      { touched.confirmpassword && errors.confirmpassword &&
                        <Text style={styles.errorInput} >{errors.confirmpassword}</Text>
                      }  
                    </Item>                      
                      {/* <TouchableOpacity onPress={() => this.pickSingleBase64(false)}>
                        <Button full style={styles.submitButton} onPress={() => this.pickSingleBase64(false)}>
                          <Text style={styles.linkText} > ADD IMAGE </Text>
                        </Button>                  
                      </TouchableOpacity> */}                                       
                    <Button full style={styles.submitButton} onPress={handleSubmit}>
                      <Text style={styles.linkText} > REGISTER </Text>
                    </Button>                  
                  </Form>
                </Fragment>
                  )}
              </Formik>  
            </View>     
            { loading && this.renderLoader()}           
            <View style={styles.bottomLinks}>
              <View style={styles.bottomTextTermsConditions}> 
                <Text style={{color : theme.WHITE_COLOR, height : 40,paddingVertical : 10}}>Already Have an Account?</Text>
                <Text style={{color : theme.WHITE_COLOR, height : 40,paddingVertical : 10,fontWeight:"bold"}} onPress={()=>Actions.pop()} > Login </Text>           
              </View>   
              <View>
                <Text style={styles.footerLinkText} > Terms {`&`} Conditions </Text>   
              </View>  
            </View>
          </Content>
        </Container>
     </ImageBackground>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { user, error, loading } = auth;

  return { user, error, loading };
};

export default connect(mapStateToProps, { registerUser })(Registration);