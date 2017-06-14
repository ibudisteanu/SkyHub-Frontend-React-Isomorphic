/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/13/2017.
 * (C) BIT TECHNOLOGIES
 */

import ContentObjectService  from './../../client/services/REST/forums/content/ContentObject.service';


export function setContentState_NewRouterObject_Action(newRouterObject, objectNotFound, pageURL, pageIndex, pageCount, initialContentObjects) {

  return {
    type: "SET_NEW_CONTENT_STATE_ROUTER_OBJECT",
    payload: {

      routerObject: {
        type: ContentObjectService.extractObjectTypeFromId(newRouterObject),
        object: ContentObjectService.createObject(newRouterObject),
        notFound: (objectNotFound !== null ? objectNotFound : true),
        pageURL: pageURL || '',
      },

      contentObjects:{
        pageIndex: pageIndex||1,
        pageCount: pageCount||8,
        hasNext: true,
        objects: initialContentObjects||[],
      },

      contentForums:{
        pageIndex: 1,
        pageCount: 8,
        hasNext: true,
        objects: [],
      },

      contentReplies:{
        pageIndex: 1,
        pageCount: 8,
        hasNext: true,
        objects: [],
      },

    }
  }
}

export function setContentState_AddContentObjects_Action(toBeAdded){
  return {
    type: "ADD_CONTENT_OBJECTS",
    payload: toBeAdded,
  }
}

export function setContentState_AddForumsObjects_Action(toBeAdded){
  return {
    type: "ADD_CONTENT_FORUMS_OBJECTS",
    payload: toBeAdded,
  }
}

export function newRouterObjectArgument_AddRepliesObjects_Action(toBeAdded){
  return {
    type: "ADD_CONTENT_REPLIES_OBJECTS",
    payload: toBeAdded,
  }
}
