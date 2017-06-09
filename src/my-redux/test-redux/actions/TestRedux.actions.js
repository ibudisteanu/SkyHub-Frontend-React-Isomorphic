/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/9/2017.
 * (C) BIT TECHNOLOGIES
 */

/* eslint-disable import/prefer-default-export */


export function newTestReduxValue1(iNewValue ) {

  console.log("ACTION 1 FIRED",iNewValue);

  return {
    type: "NEW_TEST_REDUX_VALUE_1",
    status: {

      value : iNewValue,


    }
  }
}

export function newTestReduxValue2(iNewValue ) {

  console.log("ACTION 2 FIRED",iNewValue);

  return {
    type: "NEW_TEST_REDUX_VALUE_2",
    status: {

      value : iNewValue,

    }
  }
}
