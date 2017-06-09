/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/26/2017.
 * (C) BIT TECHNOLOGIES
 */

/* eslint-disable import/prefer-default-export */


export const defaultLocalization = {
    country: '',
    countryCode : '',
    city : '',
    latitude : '',
    longitude : '',
    ip : '',
    timeZone: '',
};


export default function LocalizationReducer  ( state = defaultLocalization, action)  {


  switch (action.type) {

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
      };

    default:
      return state;

  }

}
