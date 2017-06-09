/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/12/2017.
 * (C) BIT TECHNOLOGIES
 */

import {CookiesService} from 'modules/services/cookies/cookies.service';
import {SocketService} from 'modules/services/REST/socket/socket.service';

import {User} from 'User.js';


import * as UserAuthenticatedActions from '../../../redux/actions/UserAuthenticated.actions.js';

let authServiceInstance = null;

export class AuthService {

    dispatch = null;
    SocketService = null;

    constructor(dispatch) {

        if (authServiceInstance === null){

            this.SocketService = new SocketService(dispatch);
            this.dispatch = dispatch;
            this.loadCookieUserDocumentReady();

            authServiceInstance = this;
        }

        return authServiceInstance;
    }

    loadCookieUserDocumentReady (){
        this.loadCookieInterval = setInterval(::this.loadCookieUser,500);
        this.loadCookieUser();
    }

    loadCookieUser ( ){

        if ((typeof window !== "undefined")&& (typeof window.document !== "undefined")){
            var token = CookiesService.getTokenCookie();
            if (token !== "")
                this.loginTokenAsync(token);

            this.SocketService.setSocketReadObservable("connect").subscribe(response => {
                var token = CookiesService.getTokenCookie();
                if (token !== "")
                    this.loginTokenAsync(token);
            });

            clearInterval(this.loadCookieInterval);
        }
    }

    loginAsync(sEmailUserName, sPassword)
    {
        this.logout();

        return new Promise( (resolve)=> {

            //Using Promise
            this.SocketService.sendRequestGetDataPromise("auth/login",{emailUsername:sEmailUserName, password:sPassword}).then( (resData) => {

                console.log('Answer from Server Auth Login');
                console.log(resData);

                if(resData.result == "true") {

                    this.loginProvidingUser(resData.user, resData.token);
                }

                resolve(resData);

            });

        });

    }

    loginProvidingUser(userJSON, sToken){
        let userLogged = new User( userJSON);
        this.dispatch(UserAuthenticatedActions.newUserAuthenticated(userLogged));

        CookiesService.setCookie('token', sToken, 365*5, '/');
        console.log('setting cookie'+sToken);
    }

    loginTokenAsync(token){
        return new Promise( (resolve)=> {
            //Using Promise

            //this.SocketService.createClientSocket();
            this.SocketService.sendRequestGetDataPromise("auth/login-token",{token: token}).then( (resData ) => {

                console.log('Answer from Login Token Async');
                console.log(resData);

                if(resData.result == "true") {

                    let userLogged = new User( resData.user);
                    this.dispatch(UserAuthenticatedActions.newUserAuthenticated(userLogged));
                }

                resolve(resData);

            });
        });
    }

    registerAsync(sUsername, sEmailAddress, sPassword, sFirstName, sLastName, sCountry, sLanguage, sCity, sLatitude, sLongitude, iTimeZone){

        return new Promise( (resolve)=> {

            //Using Promise
            this.SocketService.sendRequestGetDataPromise("auth/register",{email:sEmailAddress, username: sUsername, password: sPassword,
                firstName: sFirstName, lastName: sLastName, country: sCountry, language : sLanguage, city : sCity, latitude: sLatitude, longitude : sLongitude, timeZone : iTimeZone })

                .then( (resData ) => {

                console.log('Answer from Server Auth Register', resData);

                if(resData.result === "true") {
                    this.loginAsync(sEmailAddress, sPassword);
                }

                resolve(resData);
            });

        });

    }

    registerOAuthAsync(sSocialNetworkName,sSocialNetworkId, sAccessToken, sEmail, sFirstName, sLastName,sProfilePic, sCoverImage, sCountryCode, sLanguage, sCity, latitude, longitude, sShortBio, iAge, sGender, iTimeZone, bVerified) {


        return new Promise( (resolve)=> {

            //Using Promise
            this.SocketService.sendRequestGetDataPromise("auth/register-oauth",{socialNetwork: sSocialNetworkName, socialNetworkId: sSocialNetworkId, accessToken : sAccessToken,
                email:sEmail, firstName: sFirstName, lastName: sLastName, profilePic : sProfilePic, coverPic : sCoverImage, country: sCountryCode, language:sLanguage, city : sCity,
                latitude: latitude, longitude : longitude,  shortBio: sShortBio, age : iAge, gender : sGender,   timeZone: iTimeZone, verified: bVerified,})

                .then( (resData ) => {

                    console.log('Answer from Oauth', resData);

                    if(resData.result === "true") {
                        this.loginProvidingUser(resData.user, resData.token);
                    }

                    resolve(resData);
                });

        });
    }

    logout(){

        this.SocketService.sendRequest("auth/logout",{});

        CookiesService.deleteCookie("token");
        this.dispatch(UserAuthenticatedActions.logoutUserAuthenticated());
    }

}
