/* eslint-disable import/prefer-default-export */

export function newUserAuthenticated(user) {
    return {
        type: "NEW_USER_AUTHENTICATED",
        payload:{
          user: user,
          error: '',
        },
    }
}

export function logoutUserAuthenticated() {
    return {
        type: "LOGOUT_USER",
    }
}

