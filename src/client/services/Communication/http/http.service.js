/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/6/2017.
 * (C) BIT TECHNOLOGIES
 */


import { Observable, Subscribable } from 'rxjs/Observable';
import {CookiesService} from 'modules/services/Cookies/Cookies.service';

import axios from 'axios';

//import { Configuration } from '../app.constants';

class HTTPServiceClass {

    serverHTTP = "http://myskyhub.ddns.net:3000/";
    serverHTTPApi = this.serverHTTP+"api/";

    constructor() {

        console.log("Creating HTTP Service");

    }

    getRequest(sRequest, post){

        //console.log(""); console.log(""); console.log(""); console.log(post);
        return axios.get(this.addTrailingSlash(this.serverHTTPApi)+sRequest, post);
    }

    postRequest(sRequest, post){

        return axios.post(this.addTrailingSlash(this.serverHTTPApi)+sRequest, post);
    }

    addTrailingSlash(url){
        var lastChar = url.substr(-1); // Selects the last character
        if (lastChar != '/') {         // If the last character is not a slash
            url = url + '/';            // Append a slash to it.
        }
        return url;
    }

}


module.exports = {
    HTTPService : new HTTPServiceClass(),
}
