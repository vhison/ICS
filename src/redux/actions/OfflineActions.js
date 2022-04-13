import { CONNECTION_ACTIVE  } from './types';
export const connectionIsOnline = (isonline) => {
    return {
      type: CONNECTION_ACTIVE,
      payload: isonline
    };  
};