
import { AsyncStorage, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { signInAPI, signUpAPI } from '../../api/methods/authorizationAPI';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  USER_ACTIVE
} from './types';

/*  login user action */ 
export const loginUser = (request) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    signInAPI(request)
    .then(user => loginUserResponse(dispatch, user.data))
    .catch(error => loginUserFail(dispatch, "Authentication Failed. Something went wrong. Please try again."));  
  };
};

const loginUserFail = (dispatch, error) => {
  console.log("loginUserFail:", error);  
  dispatch({ 
    type: LOGIN_USER_FAIL,
    payload: error
  });
};

const loginUserSuccess = (dispatch, user) => {
  console.log("loginUserSuccess > user : ", user);
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  AsyncStorage.setItem("usertoken", user[0].id).then((res) => {
    console.log("set usertoken", user[0].id)
    Actions.jump('home');          
      // setTimeout(() => {        
      //   AsyncStorage.clear();   
      //   Actions.drawerClose();    
      //   Actions.auth();  
      //   Alert.alert(
      //     'Your Session is expired.',
      //     'Please Sign In Again.', 
      //     [{
      //       text: 'Ok',
      //       onPress: () => { console.log('go for the sign in') },
      //       style: 'cancel'
      //     }, 
      //    ], { cancelable: false }
      //   ) 
      // }, 600000) 
      // 600000 = 10 min
  })  
};

const loginUserResponse = (dispatch, user) => {
  console.log('inside loginUserResponse > user : ', user);
  if(user.status == true || user.status == 'true')
  {
    console.log('inside loginUserResponse If');
    loginUserSuccess(dispatch, user.result);
  }
  else
  {
    console.log('inside loginUserResponse Else', user.result);
    loginUserFail(dispatch,user.result);    
  }
};

/*  register user action */ 
export const registerUser = (request) => {
  return (dispatch) => {
    dispatch({ type: REGISTER_USER });
    signUpAPI(request)
    .then(user => registerUserResponse(dispatch, user.data))
    .catch(error => registerUserFail(dispatch, "Registration Failed. Something went wrong. Please try again."));  
  };
};

const registerUserFail = (dispatch, error) => {
  // console.log("registerUserFail:", error);  
  dispatch({ 
    type: REGISTER_USER_FAIL,
    payload: error
  });
};

const registerUserSuccess = (dispatch, user) => {
  // console.log("registerUserSuccess > user : ", user);
  dispatch({
    type: REGISTER_USER_SUCCESS,
    payload: user
  });
  Actions.jump('login'); 
};

const registerUserResponse = (dispatch, user) => {
  console.log('inside registerUserResponse > user : ', user);
  if(user.status == true || user.status == 'true')
  {
    console.log('inside registerUserResponse If');
    registerUserSuccess(dispatch, user.result);
  }
  else
  {
    console.log('inside registerUserResponse Else', user.result);
    registerUserFail(dispatch,user.result);    
  }
};

export const userIsActive = (isactive) => {
  return {
    type: USER_ACTIVE,
    payload: isactive
  };  
};