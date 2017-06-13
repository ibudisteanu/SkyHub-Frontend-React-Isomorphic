/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/5/2017.
 * (C) BIT TECHNOLOGIES
 */

/* eslint-disable import/prefer-default-export */


import Forum from '../../client/modules/forums/forums/models/Forum.model';

export function defaultRouterState  (initial) {

  return{

    refAuthenticationModal : initial.refAuthenticationModal||null,

    currentRouterObject: initial.currentRouterObject || {
      type: 'none',//'none','forum','topic','user',
      object: null,
      notFound: false,
      pageURL: '',
      pageIndex: 1,
      pageCount: 8,
      pageNext: true,
      contentObjects: [],
    },

  }

};

export default function RouterStateReducer  ( state = defaultRouterState, action)  {

  switch (action.type) {

    case 'NEW_ROUTER_OBJECT_ARGUMENT':
      return {
        ...state,
        ['currentRouterObject']: action.payload,
      };

    case 'NEW_ROUTER_OBJECT_ARGUMENT_CONTENT_ARRAY':
      return {
        ...state,
        ['currentRouterObject.contentObjects'] : action.payload,
      };

    case 'NEW_ROUTER_OBJECT_ARGUMENT_ADD_TO_CONTENT_ARRAY':
      //console.log("NEW_ROUTER_OBJECT_ARGUMENT_ADD_TO_CONTENT_ARRAY",action);
      return {
        ...state,
        currentRouterObject: {
            ...state.currentRouterObject,
            contentObjects:  Array.concat(...state.currentRouterObject.contentObjects, action.payload),
          }

      };

    case 'SET_AUTHENTICATION_MODAL_ELEMENT':
      return {
        ...state,
        ['refAuthenticationModal'] : action.payload.refAuthenticationModal,
      };

    default:
      return state;

  }

};

