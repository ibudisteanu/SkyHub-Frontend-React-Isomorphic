/* eslint-disable import/prefer-default-export */


export const defaultSocketStatus = {
    connectionOffline: false,
    message : '',

    icon : '',
    showOnlineStatus : false,
};

export default function SocketStatusReducer  ( state = defaultSocketStatus, action)  {

    let newState = state;

    switch (action.type) {

        case 'NEW_SOCKET_STATUS':

            newState = action.status;
            break;
    }

    return newState;
};

