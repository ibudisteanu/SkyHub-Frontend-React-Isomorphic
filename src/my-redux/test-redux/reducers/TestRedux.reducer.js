/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/9/2017.
 * (C) BIT TECHNOLOGIES
 */

export const defaultTestReduxState = {

  value1 : 0,
  value2 : 0,

};

export default function testReduxReducer(state = {}, action) {

  let newState = state;

  switch (action.type) {

    case 'NEW_TEST_REDUX_VALUE_1':

      newState.value1 = action.status.value;
      break;

    case 'NEW_TEST_REDUX_VALUE_2':

      newState.value2 = action.status.value;
      break;
  }

  return newState;
}
