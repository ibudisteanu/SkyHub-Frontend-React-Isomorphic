/* eslint-disable import/prefer-default-export */

import User from '~models/User/User';

export function defaultUserState(initial)  {
  return {
    user: new User(initial.user||{}),
    error: initial.error||'',
  }
};

export default function UserReducer  ( state = defaultUserState, action)  {

  switch (action.type) {
    case 'NEW_USER_AUTHENTICATED':
      var newState =  {
        ...state,
        ['user']: new User(action.payload.user),
        ['error']: action.payload.error,
      };

      if ((typeof document !== "undefined")&&(newState.user.isLoggedIn()))
        document.body.classList.remove("top-navigation");
      //  document.body.addClass("top-navigation");

      return newState;

    case 'LOGOUT_USER':
      var newState = {
        ...state,
        ['user']: defaultUserState({}).user,
        ['error']: defaultUserState({}).error,
      };

      if ((typeof document !== "undefined")&&(!newState.user.isLoggedIn()))
        document.body.classList.add("top-navigation");

      return newState;

    default:
      return state;
  }

};

