/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/5/2017.
 * (C) BIT TECHNOLOGIES
 */
import Forum from '~models/Forum/Forum';

export function defaultRouterState  (initial) {

  return{

    refAuthenticationModal : initial.refAuthenticationModal||null,

  }

};

export default function RouterStateReducer  ( state = defaultRouterState, action)  {

  switch (action.type) {



    case 'SET_AUTHENTICATION_MODAL_ELEMENT':
      return {
        ...state,
        ['refAuthenticationModal'] : action.payload.refAuthenticationModal,
      };

    default:
      return state;

  }

};

