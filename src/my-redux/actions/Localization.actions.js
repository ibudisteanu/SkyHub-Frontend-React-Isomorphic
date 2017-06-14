/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/26/2017.
 * (C) BIT TECHNOLOGIES
 */

/* eslint-disable import/prefer-default-export */

import axios from 'axios';

export function extractIP(req){

  var ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  //const requestIp = require('request-ip');
  //const ip = requestIp.getClientIp(req);

  console.log('IP::'); console.log(ip);

  return {
    type: 'NEW_LOCALIZATION_IP',
    payload: {
      clientIP: ip,
    },
  };

}

export function startLocalizationFetchingAsync() {
  return async (dispatch, getState) => {

    //console.log("startLocalizationFetchingAsync ",getState());

    if (getState().localization.request.sent ){
      return dispatch({
        type: "LOCALIZATION_SKIPPED",
        payload: {

        },
      });
    }

    let payload = {
      request: {
        sent:true,
      }
    };

    dispatch({
      type: "NEW_LOCALIZATION_REQUEST_SENT",
      payload: payload,
    });

    return axios.get("http://freegeoip.net/json/"+getState().localization.IP)

      .then(res => {

        res = res.data;

        var payload = {
          country: res.country_name||'',
          countryCode : res.country_code||'',
          city : res.city||'',
          latitude : res.latitude||'',
          longitude : res.longitude||'',
          ip : res.ip||'',
          timeZone: res.time_zone||'',
          request: {
            sent:true,
            done:true,
            error:false,
          },
        };

        //console.log("IP STATUS",payload);

        dispatch({
          type: "NEW_LOCALIZATION",
          payload: payload,
        });


      })
      .catch(function (error) {
        console.log("Promise Rejected",error);

        dispatch({
          type: "NEW_LOCALIZATION_REQUEST_ERROR",
          payload: null,
        });

      });

  };
}

