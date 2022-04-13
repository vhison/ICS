import React, { Component, useRef, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Root } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import ReduxThunk from 'redux-thunk';
import reducers from './redux/reducers';
import Router from './Router';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

const App = () => { 
  // if(Platform.OS !== 'ios'){
    useEffect(()=>{
      SplashScreen.hide()
    });
  // } 

  return (
    <Provider store={store}>
      <Root>
        <Router />
      </Root>
    </Provider>
  );  
}
export default App;