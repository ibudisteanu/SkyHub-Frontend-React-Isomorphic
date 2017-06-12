/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/5/2017.
 * (C) BIT TECHNOLOGIES
 */

/* eslint-disable import/prefer-default-export */


import { ContentObjectService } from './../../client/services/REST/forums/content/ContentObject.service';

export function newRouterObjectArgumentAction(newRouterObject, objectNotFound ) {

    return {
        type: "NEW_ROUTER_OBJECT_ARGUMENT",
        payload: {

            object : {
                type: ContentObjectService.extractObjectTypeFromId(newRouterObject),
                object: ContentObjectService.createObject(newRouterObject),
                notFound : objectNotFound || (newRouterObject === null),

            },


        }
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
