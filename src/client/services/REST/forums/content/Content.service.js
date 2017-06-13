/**
 * Created by ERAZER-ALEX on 6/4/2017.
 */

import {newRouterObjectArgumentAction, newRouterObjectArgument_AddContentArrayAction} from '../../../../../my-redux/actions/RouterState.actions';

import Forum from './../../../../modules/forums/forums/models/Forum.model';

import SocketService from './../../../../services/Communication/socket/Socket.service';
import HTTPService from './../../../Communication/http/Http.service';

class ContentServiceClass {

    routerState = null; //from redux store
    dispatch = null;

    constructor(props){

      console.log("@@@@ ContentService - CREATE instance");

    }

    startService(dispatch, routerState ){
      this.dispatch = dispatch;
      this.routerState = routerState;

      //console.log("@@@@ ContentService - STARTING Service", dispatch, routerState);
    }

    async getTopContent(parent, pageIndex, pageCount){
      return SocketService.sendRequestGetDataPromise("content/get-top-content",{parent: parent, pageIndex:pageIndex, pageCount: pageCount});
    }

    async getTopContentHTTP(parent, pageIndex, pageCount){
      return HTTPService.getRequest("content/get-top-content",{parent: parent, pageIndex:pageIndex, pageCount: pageCount});
    }

    async fetchTopContent(parent, pageIndex, pageCount, protocol){

      let answer = {result : false};

      if (protocol === 'http') answer = await this.getTopContentHTTP(parent, pageIndex, pageCount);
      else answer = await this.getTopContent(parent, pageIndex, pageCount);

      console.log("ANSWER TOP CONTENT",answer);

      if (answer.result === true){

        let toBeAdded = this.processNewContent(answer.content);

        if (toBeAdded !== [])
          await this.dispatch(newRouterObjectArgument_AddContentArrayAction(toBeAdded ));

        return toBeAdded;
      }
    }


    processNewContent(newContentObjects){

      if (newContentObjects.constructor !== Array) newContentObjects = [newContentObjects];

      let toBeAdded = [];

      for (let i=0; i<newContentObjects.length; i++ ){

        let newObject = newContentObjects[i].object;

        let bFound=false;

        if ((this.routerState.currentRouterObject !== null) && (this.routerState.currentRouterObject.contentObjects !== null))
        for (let obj in this.routerState.currentRouterObject.contentObjects)
          if (newObject.id === obj.id){
            bFound=true;
            break;
          }

        if ((!bFound)&&(newObject!==null)&&(newObject.id !== null)) {
          toBeAdded.push(newObject);
        }
      }

      return toBeAdded;
    }










    async getRouterObjectContent(sContentToSearchId){
      if (sContentToSearchId !== '')
        return SocketService.sendRequestGetDataPromise("content/get-content",{id: sContentToSearchId});
      else
        return {result: true, data: {content: null}};
    }

    async getRouterObjectContentHTTP(sContentToSearchId){

      if (sContentToSearchId !== '') {
        return HTTPService.getRequest('content/get-content', {id: sContentToSearchId});
      }
      else
        return {result: true, data: {content: null}};
    }

    /*
      IT WILL FETCH THE DATA from the BACKEND AND STORE THE ANSWER IN THE REDUX
     */

    async fetchRouterObjectAndContent(sContentToSearchId, protocol){

      let answer = {result : false};

      if (protocol === "http") answer = await this.getRouterObjectContentHTTP(sContentToSearchId);
      else answer = await this.getRouterObjectContent(sContentToSearchId);

      console.log("ANSWER FOR ", sContentToSearchId, answer);

      if (answer.result === true){

        await this.dispatch(newRouterObjectArgumentAction( answer.data.content, false, sContentToSearchId,  1, 8, true, [] ));

        await this.fetchTopContent(sContentToSearchId, 1, 8, protocol);

        return answer.data.content;

      } else {

        await this.dispatch(newRouterObjectArgumentAction(null, true, sContentToSearchId, 1, 8, [] ));
      }

      return null;

    }

}

var ContentServiceInstance = new ContentServiceClass();

export default ContentServiceInstance;
