/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/26/2017.
 * (C) BIT TECHNOLOGIES
 */

import {SocketService} from 'modules/services/REST/socket/socket.service';
import * as UserAuthenticatedActions from '../../../../my-redux/actions/UserAuthenticated.actions.js';

let forumServiceInstance = null;

export class ForumsService {

    dispatch = null;
    SocketService = null;

    constructor(dispatch) {

        if (forumServiceInstance === null){

            this.SocketService = new SocketService(dispatch);
            this.dispatch = dispatch;

            forumServiceInstance = this;
        }

        return forumServiceInstance;
    }

    forumAddAsync(sParentId, sTitle, sDescription,  arrKeywords, sCountryCode, sLanguage, sCity, latitude, longitude, iTimeZone)
    {

        return new Promise( (resolve)=> {

            //Using Promise
            this.SocketService.sendRequestGetDataPromise("forums/add-forum",{parent : sParentId, title: sTitle, description: sDescription, keywords : arrKeywords,
                country: sCountryCode, language:sLanguage, city : sCity, latitude: latitude, longitude : longitude,  timeZone: iTimeZone})

                .then( (resData ) => {

                    console.log('Answer from FORUM ', resData);

                    // if(resData.result === "true") {
                    //     this.loginProvidingUser(resData.user, resData.token);
                    // }

                    resolve(resData);
                });

        });

    }

    getForumAsync(sId){

            //Using Promise
        return this.SocketService.sendRequestGetDataPromise("forums/get-forum",{id: sId});

    }



}
