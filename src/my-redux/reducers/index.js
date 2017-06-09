import { combineReducers } from 'redux';

import user from './user.reducer';
import runtime from './runtime.reducer';

import LocalizationReducer from './Localization.reducer';
import RouterStateReducer  from './RouterState.reducer';
import SocketStatusReducer from './SocketStatus.reducer';
import UserAuthenticatedReducer from './UserAuthenticated.reducer';

//including TEST-REDUX
import TestReduxReducer from '../test-redux/reducers/TestRedux.reducer';

export default combineReducers({
  user,
  runtime,

  userAuthenticated : UserAuthenticatedReducer,
  socketStatus : SocketStatusReducer,
  localization : LocalizationReducer,

  routerState : RouterStateReducer,

  //including TEST-REDUX
  testReduxState : TestReduxReducer,

});