/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/5/2017.
 * (C) BIT TECHNOLOGIES
 */

/* eslint-disable import/prefer-default-export */


export function setAuthenticationModalElement(refAuthenticationModal){

  return {
    type: 'SET_AUTHENTICATION_MODAL_ELEMENT',
    payload: {
      refAuthenticationModal: refAuthenticationModal,
    },
  };

}
