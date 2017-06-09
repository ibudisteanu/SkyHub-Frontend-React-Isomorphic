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

    let newState = state;

    switch (action.type) {

        case 'NEW_LOCALIZATION':

            newState = action.status;
            break;
    }

    return newState;
}