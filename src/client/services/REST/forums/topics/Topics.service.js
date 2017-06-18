/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/16/2017.
 * (C) BIT TECHNOLOGIES
 */

import SocketService from '../../../../services/Communication/socket/Socket.service';

class TopicsServiceClass {

  dispatch = null;

  constructor() {
  }

  startService(dispatch){
    this.dispatch = dispatch;
  }

  async topicAdd(sParentId, sName, sTitle, sDescription,  arrKeywords, sCountryCode, sLanguage, sCity, latitude, longitude, iTimeZone) {


    try {

      //Using Promise
      let resData  = await SocketService.sendRequestGetDataPromise("topics/add-topic",{parent : sParentId, name:sName, title: sTitle, description: sDescription, keywords : arrKeywords,
                                                        country: sCountryCode, language:sLanguage, city : sCity, latitude: latitude, longitude : longitude,  timeZone: iTimeZone});

      console.log('Answer from TOPIC ', resData);

      return resData;

    }
    catch (Exception){
      console.log("Exception adding a new topic",Exception);
      throw Exception;
    }

  }

  getForumAsync(sId){

    //Using Promise
    return SocketService.sendRequestGetDataPromise("forums/get-forum",{id: sId});

  }

}

var TopicsService = new TopicsServiceClass();
export default TopicsService;
