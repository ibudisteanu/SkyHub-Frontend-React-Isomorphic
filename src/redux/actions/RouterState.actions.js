/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/5/2017.
 * (C) BIT TECHNOLOGIES
 */

/* eslint-disable import/prefer-default-export */


import { ContentObjectService } from 'services/REST/forums/content/ContentObject.service';

export function newRouterObjectArgumentAction(newRouterObject, objectNotFound ) {

    return {
        type: "NEW_ROUTER_OBJECT_ARGUMENT",
        status: {

            object : {
                type: ContentObjectService.extractObjectTypeFromId(newRouterObject),
                object: ContentObjectService.createObject(newRouterObject),
                notFound : objectNotFound || (newRouterObject === null)

            },


        }
    }
}
