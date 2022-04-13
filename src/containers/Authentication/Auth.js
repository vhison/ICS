import React, { Component } from 'react';
import {View, AsyncStorage, PanResponder, Text} from "react-native";
import { Actions } from 'react-native-router-flux';
class Auth extends Component {   
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }
  componentWillMount = async () => {          
    AsyncStorage.getItem('usertoken').then(res => {      
        if(res!==null){
            this.setState({isLogin: true});
        } else {
            this.setState({isLogin: false});
        }
    })   
  } 
  goTOLogin(){
    Actions.jump('auth');
  }
  goToHome(){      
    Actions.jump('home'); 
  }
  
  render() {  
    const { isLogin } = this.state 
    return (
        <View>             
          { isLogin ? this.goToHome() : this.goTOLogin() }
        </View>
    );
  }
}
export default Auth;