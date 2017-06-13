/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/5/2017.
 * (C) BIT TECHNOLOGIES
 */

/* eslint-disable import/prefer-default-export */


import ContentObjectService  from './../../client/services/REST/forums/content/ContentObject.service';

export function newRouterObjectArgumentAction(newRouterObject, objectNotFound, pageURL, pageIndex, pageCount, pageNext, contentObjects ) {

    return {
        type: "NEW_ROUTER_OBJECT_ARGUMENT",
        payload: {

              type: ContentObjectService.extractObjectTypeFromId(newRouterObject),
              object: ContentObjectService.createObject(newRouterObject),
              notFound : (objectNotFound !== null ? objectNotFound : true),
              pageURL: pageURL||'',
              pageIndex: pageIndex||0,
              pageCount: pageCount || 8,
              pageNext: (pageNext !== null ? pageNext : true),
              contentObjects: contentObjects||[],

        }
    }
}

export function newRouterObjectArgument_ContentArrayAction(contentObjects){
  return {
    type: "NEW_ROUTER_OBJECT_ARGUMENT_CONTENT_ARRAY",
    payload: contentObjects,
  }
}

export function newRouterObjectArgument_AddContentArrayAction(toBeAdded){
  return {
    type: "NEW_ROUTER_OBJECT_ARGUMENT_ADD_TO_CONTENT_ARRAY",
    payload: toBeAdded,
  }
}

export function setAuthenticationModalElement(refAuthenticationModal){

  return {
    type: 'SET_AUTHENTICATION_MODAL_ELEMENT',
    payload: {
      refAuthenticationModal: refAuthenticationModal,
    },
  };

}
