import { CONNECTION_ACTIVE } from '../actions/types';
  
  const INITIAL_STATE = {        
    isonline: false,    
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {            
      case CONNECTION_ACTIVE:
        return { ...state, isonline: action.payload };      
      default:
        return state;
    }
  };
  