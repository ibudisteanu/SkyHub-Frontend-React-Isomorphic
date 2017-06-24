/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '~client/components/Template/Layout';
import Page from '~client/components/Page';
import TestRedux from '~store/test-redux/TestRedux.component';

export default {

  path: '/about',

  async action( {params}) {
    const data = await require.ensure([], require => require('./about.md'), 'about');

    if (typeof document !== "undefined") {
      alert('about new');
    }

    return {
      title: data.title,
      description: 'About SkyHub',
      chunk: 'about',
      component:
        <Layout>

          <Page {...data} >

            <TestRedux />

          </Page>

        </Layout>,
    };
  },

};
