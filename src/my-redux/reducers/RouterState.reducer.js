/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/5/2017.
 * (C) BIT TECHNOLOGIES
 */

/* eslint-disable import/prefer-default-export */


import {Forum} from '../../client/modules/forums/forums/models/Forum.model';

export const defaultRouterState = {

    currentRouterObject : {
        type : 'none',//'none','forum','topic','user',
        object: null,
        notFound : false,
    },

};

export default function RouterStatusReducer  ( state = defaultRouterState, action)  {

  switch (action.type) {

    case 'NEW_ROUTER_OBJECT_ARGUMENT':
      return {
        ...state,
        ['currentRouterObject']: action.payload.object,
      };
    default:
      return state;

  }

};

