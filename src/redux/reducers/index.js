import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime.reducer';

export default combineReducers({
  user,
  runtime,
});
