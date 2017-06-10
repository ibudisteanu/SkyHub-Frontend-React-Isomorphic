/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/9/2017.
 * (C) BIT TECHNOLOGIES
 */


import React from 'react';
import Layout from '../../../client/components/Template/Layout';
import Page from '../../../client/components/Page';

import TestRedux from '../../../my-redux/test-redux/TestRedux.component';

export default {

  path: '/about',

  async action() {

    return {
      title: "TESTING REDUX",
      description: 'TESTING REDUX',
      chunk: 'test-redux',
      component:
        <Layout>

          <Page title="TESTING REDUX" html="" >

            <TestRedux />

          </Page>


        </Layout>,
    };
  },

};
