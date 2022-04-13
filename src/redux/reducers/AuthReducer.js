import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    USER_ACTIVE
  } from '../actions/types';
  
  const INITIAL_STATE = {    
    user: null,
    error: '',
    loading: false,
    isactive : false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {      
      case LOGIN_USER:
        return { ...state, loading: true, error: '' };
      case LOGIN_USER_SUCCESS:
        return { ...state, ...INITIAL_STATE, user: action.payload, error: '', loading: false };
      case LOGIN_USER_FAIL:
        return { ...state, error: action.payload, loading: false };
      case REGISTER_USER:
        return { ...state, loading: true, error: '' };
      case REGISTER_USER_SUCCESS:
        return { ...state, ...INITIAL_STATE, user: action.payload, error: '', loading: false };
      case REGISTER_USER_FAIL:
        return { ...state, error: action.payload, loading: false };
      case USER_ACTIVE:
        return { ...state, ...INITIAL_STATE, isactive : action.payload };
      default:
        return state;
    }
  };
  