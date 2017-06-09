/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/5/2017.
 * (C) BIT TECHNOLOGIES
 */

/* eslint-disable import/prefer-default-export */


import {Forum} from 'modules/forums/forums/models/Forum.model';

export const defaultRouterState = {

    currentRouterObject : {
        type : 'none',//'none','forum','topic','user',
        object: null,
        notFound : false,
    },

};

export function RouterStatusReducer  ( state = defaultRouterState, action)  {

    let newState = state;

    switch (action.type) {

        case 'NEW_ROUTER_OBJECT_ARGUMENT':

            console.log("ROUTER ACTION ",action.status);
            newState.currentRouterObject = action.status.object;
            break;

        case 'NEW_ROUTER_TOPIC_ARGUMENT':

            newState.topic = action.status.topic;
            break;
    }

    return newState;
};

