/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/13/2017.
 * (C) BIT TECHNOLOGIES
 */
import ContentObjectService from '~services/REST/forums/content/ContentObject.service';

export function defaultContentState (initial) {

  return{

    routerObject : initial.routerObject || {
      type: 'none',//'none','forum','topic','user',
      object: null,
      notFound: false,
      pageURL: '',
    },

    routerParentObject : initial.routerParentObject || {
      type: 'none',//'none','forum','topic','user',
      object: null,
      notFound: false,
    },


    contentObjects: initial.contentObjects || {
      pageIndex: 1,
      pageCount: 8,
      hasNext: true,
      objects: [],
    },

    contentForums : initial.contentForums || {
      pageIndex: 1,
      pageCount: 8,
      hasNext: true,
      objects: [],
    },

    contentReplies : initial.contentReplies || {
      pageIndex: 1,
      pageCount: 8,
      hasNext: true,
      objects: [],
    },

  }

};

export default function ContentStateReducer  ( state = defaultContentState, action)  {

  switch (action.type) {

    case 'SET_NEW_CONTENT_STATE_ROUTER_OBJECT':
      console.log("!!!!!!!!!!!!!!! SET_NEW_CONTENT_STATE_ROUTER_OBJECT",action);
      return {
        ...state,
        routerObject: {
          ...state.routerObject,
          type:  action.payload.routerObject.type,
          object:  action.payload.routerObject.object,
          notFound:  action.payload.routerObject.notFound,
          pageURL:  action.payload.routerObject.pageURL,
        },
        ['routerParentObject']: action.payload.routerParentObject,
        ['contentObjects']: action.payload.contentObjects,
        ['contentForums']: action.payload.contentForums,
        ['contentReplies']: action.payload.contentReplies,
      };

    case 'SET_NEW_CONTENT_STATE_ROUTER_PARENT_OBJECT':
      return {
        ...state,
        routerParentObject:{
          ...state.routerParentObject,
          type: action.payload.routerParentObject.type,
          object: action.payload.routerParentObject.object,
          notFound: action.payload.routerParentObject.notFound,
        },
      };

    case 'ADD_CONTENT_OBJECTS':
      //console.log("NEW_ROUTER_OBJECT_ARGUMENT_ADD_TO_CONTENT_ARRAY",action);
      return {
        ...state,
        contentObjects: {
          ...state.contentObjects,
          objects:  Array.concat(...state.contentObjects.objects, action.payload),
        },

      };

    case 'ADD_CONTENT_FORUMS_OBJECTS':
      return {
        ...state,
        contentForums: {
          ...state.contentForums,
          objects:  Array.concat(...state.contentForums.objects, action.payload),
        },
      };

    case 'ADD_CONTENT_REPLIES_OBJECTS':
      return {
        ...state,
        contentReplies: {
          ...state.contentReplies,
          objects:  Array.concat(...state.contentReplies.objects, action.payload),
        },
      };

    default:
      return state;

  }

};

