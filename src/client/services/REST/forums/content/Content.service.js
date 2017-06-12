/**
 * Created by ERAZER-ALEX on 6/4/2017.
 */

import {newRouterObjectArgumentAction, newRouterObjectArgument_ContentArrayAction} from '../../../../../my-redux/actions/RouterState.actions';

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

    async fetchTopContent(parent, pageIndex, pageCount, protocol, dispatch){

      if (typeof dispatch === "undefined") dispatch = true;

      let answer = {result : false};

      if (protocol === 'http') answer = this.getTopContentHTTP(parent, pageIndex, pageCount);
      else answer = this.getTopContent(parent, pageIndex, pageCount);

      if (answer.result === true){
        let newStateArray = this.processNewContent(answer.content);

        if ((newStateArray !== [])&&(dispatch  === true))
          this.dispatch(newRouterObjectArgument_ContentArrayAction(newStateArray ));
      }
    }


    async processNewContent(newContentObjects){

      if (newContentObjects.constructor !== Array) newContentObjects = [newContentObjects];

      let newStateArray = [];
      let bChanges=false;

      //coyping the data... mutable from redux
      if ((this.routerState.currentRouterObject !== null) && (this.routerState.currentRouterObject.contentObjects !== null))
        for (let i =0; i < this.routerState.currentRouterObject.contentObjects.length; i++)
          newStateArray.push(this.routerState.currentRouterObject.contentObjects[i]);


      for (let i=0; i<newContentObjects.length; i++ ){

        let newObject = newContentObjects[i].object;

        let bFound=false;
        for (let j=0; j<newStateArray; j++)
          if (newStateArray[j].id === newObject.id) {
            bFound=true;
            break;
          }

        if ((!bFound)&&(newObject!==null)&&(newObject.id !== null)) {
          newStateArray.push(newObject);
          bChanges=true;
        }
      }

      if (!bChanges) return [];//no change
      else return newStateArray;

    }










    async getRouterObjectContent(sContentToSearchId){
      if (sContentToSearchId !== '')
        return SocketService.sendRequestGetDataPromise("content/get-content",{id: sContentToSearchId});
      else
        return {result: true, data: {content: null}};
    }

    async getRouterObjectContentHTTP(sContentToSearchId){

      if (sContentToSearchId !== '')
        return HTTPService.getRequest('content/get-content', {id: sContentToSearchId});
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

      console.log("ANSWER",answer.data);

      if (answer.result === true){

        let contentObjects = await this.fetchTopContent(sContentToSearchId, 1,8, protocol, false);

        this.dispatch(newRouterObjectArgumentAction( answer.data.content, false, 1, 8, true, contentObjects ));

      } else {
        this.dispatch(newRouterObjectArgumentAction(null, true, 1, 8 ));
      }

    }

}

var ContentServiceInstance = new ContentServiceClass();

export default ContentServiceInstance;
