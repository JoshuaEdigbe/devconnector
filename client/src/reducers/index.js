import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorsReducers from './errorsReducers';
import profileReducer from './profileReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorsReducers,
  profile: profileReducer
});