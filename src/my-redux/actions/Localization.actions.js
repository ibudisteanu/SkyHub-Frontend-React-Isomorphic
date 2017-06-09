/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/26/2017.
 * (C) BIT TECHNOLOGIES
 */

/* eslint-disable import/prefer-default-export */

import axios from 'axios';

export function getDefaultLocalization() {

  return async (dispatch, getState, { client, history }) => {

    axios.get("http://freegeoip.net/json/") .then(res => {

      res = res.data;

      var payload = {
        country: res.country_name||'',
        countryCode : res.country_code||'',
        city : res.city||'',
        latitude : res.latitude||'',
        longitude : res.longitude||'',
        ip : res.ip||'',
        timeZone: res.time_zone||'',
      };

      console.log(status);

      dispatch({
        type: "NEW_LOCALIZATION",
        payload: payload,
      });

    });

  };

}
