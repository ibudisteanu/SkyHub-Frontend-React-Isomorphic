import {User} from 'modules/users/models/User.model';

export const defaultUserState = {
    user: new User(),
    error : '',
};

export function UserReducer  ( state = defaultUserState, action)  {

    let newState = state;

    switch (action.type) {

        case 'NEW_USER_AUTHENTICATED':

            action.user.loggedIn = true;
            newState = {
                user: action.user,
                error: '',
            };

            break;

        case 'LOGOUT_USER':

            newState = defaultUserState;

            break;
    }

    return newState;
};

