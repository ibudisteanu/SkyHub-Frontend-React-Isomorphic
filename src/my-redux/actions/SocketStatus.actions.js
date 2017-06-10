/* eslint-disable import/prefer-default-export */

export function socketConnectingError() {
    return {
        type: "NEW_SOCKET_STATUS",
        payload: {
            connectionOffline: true,
            showOnlineStatus: false,
            message: 'Error Connecting to the SkyHub Server. Check your internet connection or contact us at contact@skyhub.me',
            icon: 'fa fa-warning',
        }
    }
}

export function socketDisconnected() {
    return {
        type: "NEW_SOCKET_STATUS",
        payload: {
            connectionOffline: true,
            showOnlineStatus: false,
            message: 'Connection Problem',
            icon: 'fa fa-warning',
        }
    }
}

export function socketConnectionSuccessfully() {
    return {
        type: "NEW_SOCKET_STATUS",
        payload: {
            connectionOffline: false,
            showOnlineStatus: true,
            message: 'Connection established to SkyHub',
            icon: 'fa fa-check',
        }
    }
}

export function socketHideSocketStatusMessage() {
    return {
        type: "NEW_SOCKET_STATUS",
        payload: {
            connectionOffline: false,
            showOnlineStatus: false,
            message: '',
            icon: '',
        }
    }
}
