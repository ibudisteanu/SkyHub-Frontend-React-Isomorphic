/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/9/2017.
 * (C) BIT TECHNOLOGIES
 */

export const defaultTestReduxState = {

  value1 : 0,
  value2 : 0,

};

export default function testReduxReducer(state = {}, action) {

  switch (action.type) {
    case 'NEW_TEST_REDUX_VALUE_1':
      return {
        ...state,
        ['value1']: action.payload.value,
      };
    case 'NEW_TEST_REDUX_VALUE_2':
      return {
        ...state,
        ['value2']: action.payload.value,
      };
    default:
      return state;
  }

}
