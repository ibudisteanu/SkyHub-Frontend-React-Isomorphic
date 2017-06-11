/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/26/2017.
 * (C) BIT TECHNOLOGIES
 */

/* eslint-disable import/prefer-default-export */


export function defaultLocalization (initial) {
  return {
    country: initial.country || '',
    countryCode: initial.countryCode||'',
    city: initial.city||'',
    latitude: initial.latitude||'',
    longitude: initial.longtitude||'',
    IP: initial.IP||'',
    timeZone: initial.timeZone||'',

    clientIP: initial.clientIP||'',

    request: initial.request|| {
      sent: false,
      done: false,
      error: false,
    }
  }
};


export default function LocalizationReducer  ( state = defaultLocalization, action)  {


  switch (action.type) {

    case 'NEW_LOCALIZATION_IP':
      return {
        ...state,
        ['clientIP']: action.payload.clientIP,
      };

    case 'NEW_LOCALIZATION_REQUEST_SENT':
      return {
        ...state,
        ['request.sent']: action.payload.request.sent,
      }

    case 'NEW_LOCALIZATION':
      return {
        ...state,
        ['country']: action.payload.country,
        ['countryCode']: action.payload.countryCode,
        ['city']: action.payload.city,
        ['latitude']: action.payload.latitude,
        ['longtitude']: action.payload.longitude,
        ['ip']: action.payload.ip,
        ['timeZone']: action.payload.timeZone,
        ['request'] : action.payload.request,
      };

    case 'NEW_LOCALIZATION_REQUEST_ERROR':
      return {
        ...state,
        ['request.error']: true,
      };

    default:
      return state;

  }

}


