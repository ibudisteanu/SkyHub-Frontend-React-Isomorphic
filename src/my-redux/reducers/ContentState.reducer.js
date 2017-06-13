/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/13/2017.
 * (C) BIT TECHNOLOGIES
 */
import Forum from '../../client/modules/forums/forums/models/Forum.model';

export function defaultContentState (initial) {

  return{

    routerObject : initial.routerObject || {
      type: 'none',//'none','forum','topic','user',
      object: null,
      notFound:false,
      pageURL: '',
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
        ['contentObjects']: action.payload.contentObjects,
        ['contentForums']: action.payload.contentForums,
        ['contentReplies']: action.payload.contentReplies,
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

    case 'ADD_CONTENT_FORUMS':
      return {
        ...state,
        contentForums: {
          ...state.contentForums,
          objects:  Array.concat(...state.contentForums.objects, action.payload),
        },
      };

    case 'ADD_CONTENT_REPLIES':
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

