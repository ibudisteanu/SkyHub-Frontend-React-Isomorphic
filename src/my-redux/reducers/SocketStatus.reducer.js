/* eslint-disable import/prefer-default-export */


export const defaultSocketStatus = {
    connectionOffline: false,
    message : '',

    icon : '',
    showOnlineStatus : false,
};

export default function SocketStatusReducer  ( state = defaultSocketStatus, action)  {


  switch (action.type) {
    case 'NEW_SOCKET_STATUS':
      return {
        ...state,
        ['connectionOffline']: action.payload.connectionOffline,
        ['message']: action.payload.message,
        ['icon']: action.payload.icon,
        ['showOnlineStatus']: action.payload.showOnlineStatus,
      };

    default:
      return state;
  }

};

