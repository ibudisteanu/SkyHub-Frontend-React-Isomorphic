/**
 * Created by ERAZER-ALEX on 6/4/2017.
 */

import {SocketService} from 'modules/services/REST/socket/socket.service';
import * as UserAuthenticatedActions from '../../../../../my-redux/actions/UserAuthenticated.actions.js';

import {Forum} from 'modules/forums/forums/models/Forum.model';

let contentServiceInstance = null;

export class ContentService {

    dispatch = null;
    SocketService = null;

    constructor(dispatch) {

        if (contentServiceInstance === null){

            this.SocketService = new SocketService(dispatch);
            this.dispatch = dispatch;

            contentServiceInstance = this;
        }

        return contentServiceInstance;
    }

    async fetchTopContent(parent, pageIndex, pageCount){

        //Using Promise

        return this.SocketService.sendRequestGetDataPromise("content/get-top-content",{parent: parent, pageIndex:pageIndex, pageCount: pageCount});

    }

    async fetchContent(id){
        return this.SocketService.sendRequestGetDataPromise("content/get-content",{id: id});
    }

    async fetchContentHTTP(parent, pageIndex, pageCount){

        return this.SocketService.sendRequestGetDataPromise("content/get-content",{parent: parent, pageIndex:pageIndex, pageCount: pageCount});

    }


}
