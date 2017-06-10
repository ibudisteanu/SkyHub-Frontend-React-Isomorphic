/* eslint-disable import/prefer-default-export */

import {User} from '../../client/modules/users/models/User.model';

export const defaultUserState = {
    user: new User(),
    error : '',
};

export default function UserReducer  ( state = defaultUserState, action)  {

  switch (action.type) {
    case 'NEW_USER_AUTHENTICATED':
      return {
        ...state,
        ['user']: action.payload.user,
        ['error']: action.payload.error,
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        ['user']: defaultUserState.user,
        ['error']: defaultUserState.error,
      };
    default:
      return state;
  }

};

