/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/6/2017.
 * (C) BIT TECHNOLOGIES
 */

//import {CookiesService} from 'modules/services/Cookies/Cookies.service';

import axios from 'axios';

//import { Configuration } from '../app.constants';

class HTTPServiceClass {

    serverHTTP = "http://myskyhub.ddns.net:4000/";
    serverHTTPApi = this.serverHTTP+"api/";

    constructor() {

        console.log("Creating HTTP Service");

    }

    async getRequest(sRequest, post){

        console.log(""); console.log(""); console.log(""); console.log(this.addTrailingSlash(this.serverHTTPApi)+sRequest);  console.log(post);
        return axios.get(this.addTrailingSlash(this.serverHTTPApi)+sRequest, post);
    }

    async postRequest(sRequest, post){

        return axios.post(this.addTrailingSlash(this.serverHTTPApi)+sRequest, post);
    }

  async checkAuthCookie(cookie){

    let authCookie = '';

    //based on this https://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server
    cookie && cookie.split(';').forEach( function( cookie ) {
      let parts = cookie.split('=');

      let cookieName = parts.shift().trim();

      if (cookieName === 'token')
        authCookie = decodeURI(parts.join('='));

    });

    if ((authCookie !== '')&&(authCookie.length > 5)){

      return await this.getRequest("auth/login-token", authCookie);

    } else {
      return {
        result: "false",
        message: "cookie invalid",
      }
    }

  }

    addTrailingSlash(url){
        var lastChar = url.substr(-1); // Selects the last character
        if (lastChar != '/') {         // If the last character is not a slash
            url = url + '/';            // Append a slash to it.
        }
        return url;
    }

}

var HTTPService = new HTTPServiceClass();

export default {
  HTTPService: HTTPService,
  createNewInstance: function (){
    HTTPService = new HTTPServiceClass();
  }
};

// module.exports = {
//     HTTPService : new HTTPServiceClass(),
// }
