/**
 * Created by ERAZER-ALEX on 6/4/2017.
 */

import {setContentState_NewRouterObject_Action, setContentState_AddContentObjects_Action, setContentState_AddForumsObjects_Action} from '../../../../../my-redux/actions/ContentState.actions';

import Forum from './../../../../modules/forums/forums/models/Forum.model';

import SocketService from './../../../../services/Communication/socket/Socket.service';
import HTTPService from './../../../Communication/http/Http.service';

class ContentServiceClass {

    contentState = null; //from redux store
    dispatch = null;
    bStarted = false;

    constructor(props){

      console.log("@@@@ ContentService - CREATE instance");

    }

    startService(dispatch, contentState ){
      this.dispatch = dispatch;
      this.contentState = contentState;
      this.bStarted=true;

      //console.log("@@@@ ContentService - STARTING Service", dispatch, contentState);
    }


    async getURLSlug(parent, name){
      return SocketService.sendRequestGetDataPromise("content/get-URL-slug",{parent:parent, name: name});
    }

    /*
        FETCHING TOP CONTENT (Topics)
     */

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

      let toBeAdded = [];
      if (answer.result === true){

        toBeAdded = this.processNewContent(answer.content, this.contentState.contentObjects.objects );

        if (toBeAdded !== [])
          await this.dispatch(setContentState_AddContentObjects_Action(toBeAdded ));

      }
      return toBeAdded;
    }


    /*
     FETCHING TOP FORUMS (Topics)
     */

    async getTopForums(parent, pageIndex, pageCount){
      return SocketService.sendRequestGetDataPromise("forums/get-top-forums",{parent: parent, pageIndex:pageIndex, pageCount: pageCount});
    }

    async getTopForumsHTTP(parent, pageIndex, pageCount){
      return HTTPService.getRequest("forums/get-top-forums",{parent: parent, pageIndex:pageIndex, pageCount: pageCount});
    }

    async fetchTopForums(parent, pageIndex, pageCount, protocol){

      let answer = {result : false};

      if (protocol === 'http') answer = await this.getTopForumsHTTP(parent, pageIndex, pageCount);
      else answer = await this.getTopForums(parent, pageIndex, pageCount);

      console.log("ANSWER TOP FORUMS", answer);
      console.log("redux state",this.contentState);

      let toBeAdded = [];
      if (answer.result === true){

        toBeAdded = this.processNewContent(answer.content, this.contentState.contentForums.objects );

        if (toBeAdded !== [])
          await this.dispatch(setContentState_AddForumsObjects_Action(toBeAdded ));

      }
      return toBeAdded;
    }



    processNewContent(newContentObjects, previousContentObjects){

      if (newContentObjects.constructor !== Array) newContentObjects = [newContentObjects];

      let toBeAdded = [];

      for (let i=0; i<newContentObjects.length; i++ ){

        let newObject = newContentObjects[i].object;

        let bFound=false;

        if ((previousContentObjects !== null) )
          for (let obj in previousContentObjects)
            if (newObject.id === obj.id){
              bFound=true;
              break;
            }

        if ((!bFound)&&(newObject!==null)&&(newObject.id !== null))
          toBeAdded.push(newObject);
      }

      return toBeAdded;
    }



    async getRouterObjectContent(sContentToSearchId){
      if (sContentToSearchId !== '')
        return await SocketService.sendRequestGetDataPromise("content/get-content",{id: sContentToSearchId});
      else
        return {result: true, data: {content: null}};
    }

    async getRouterObjectContentHTTP(sContentToSearchId){

      if (sContentToSearchId !== '') {
        return await HTTPService.getRequest('content/get-content', {id: sContentToSearchId});
      }
      else
        return {result: true, data: {content: null}};
    }

    /*
      IT WILL FETCH THE DATA from the BACKEND AND STORE THE ANSWER IN THE REDUX
     */

    async fetchRouterObjectAndContent(sContentToSearchId, protocol){

      let answer = {result : false};

      if (!this.bStarted) return null;

      if (protocol === "http") answer = await this.getRouterObjectContentHTTP(sContentToSearchId);
      else answer = await this.getRouterObjectContent(sContentToSearchId);

      console.log("ANSWER FOR "+protocol, sContentToSearchId, answer);

      if (answer.result === true){

        await this.dispatch(setContentState_NewRouterObject_Action( answer.content, false, sContentToSearchId, 1, 8, [] ));

        await this.fetchTopForums(sContentToSearchId, 1, 8, protocol);
        await this.fetchTopContent(sContentToSearchId, 1, 8, protocol);

        return answer.content;

      } else {

        await this.dispatch(setContentState_NewRouterObject_Action(null, true, sContentToSearchId, 1, 8, [] ));
      }

      return null;


    }

}

var ContentServiceInstance = new ContentServiceClass();

export default ContentServiceInstance;
