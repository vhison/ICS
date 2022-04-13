import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import OfflineReducer from './OfflineReducer';

export default combineReducers({
  auth: AuthReducer,
  offline: OfflineReducer
});
