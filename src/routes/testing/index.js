/* eslint-disable import/prefer-default-export */

import React from 'react';

import TestRedux from './test-redux/TestRedux';

const title = 'SkyHub Testing';

export default {
    path: '/testing/redux',

    action() {
      return TestRedux.action();
    },
};


