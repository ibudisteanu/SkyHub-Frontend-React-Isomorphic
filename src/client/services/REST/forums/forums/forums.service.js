/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/26/2017.
 * (C) BIT TECHNOLOGIES
 */

import SocketService from '../../../../services/Communication/socket/Socket.service';
import * as UserAuthenticatedActions from '../../../../../my-redux/actions/UserAuthenticated.actions';

class ForumsServiceClass {

    dispatch = null;

    constructor() {
    }

    startService(dispatch){
      this.dispatch = dispatch;
    }

    forumAddAsync(sParentId, sName, sTitle, sDescription,  arrKeywords, sCountryCode, sLanguage, sCity, latitude, longitude, iTimeZone) {

        return new Promise( (resolve)=> {

            //Using Promise
            SocketService.sendRequestGetDataPromise("forums/add-forum",{parent : sParentId, name:sName, title: sTitle, description: sDescription, keywords : arrKeywords,
                country: sCountryCode, language:sLanguage, city : sCity, latitude: latitude, longitude : longitude,  timeZone: iTimeZone})

                .then( (resData ) => {

                    console.log('Answer from FORUM ', resData);

                    // if(resData.result === true) {
                    //     this.loginProvidingUser(resData.user, resData.token);
                    // }

                    resolve(resData);
                });

        });

    }

    getForumAsync(sId){

            //Using Promise
        return SocketService.sendRequestGetDataPromise("forums/get-forum",{id: sId});

    }

}

var ForumsService = new ForumsServiceClass();
export default ForumsService;
