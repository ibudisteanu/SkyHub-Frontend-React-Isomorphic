/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import Layout from '../../client/components/Template/Layout';

import {startLocalizationFetchingAsync} from './../../my-redux/actions/Localization.actions';

import ContentService from './../../client/services/REST/forums/content/Content.service';

export default {

  path: '/:url*',
  //path: '/:filter(active|completed|)',

  async action({ params, fetch, store }) {

    await store.dispatch(startLocalizationFetchingAsync());


    if (typeof document === "undefined")
      ContentService.startService(store.dispatch, store.getState().contentState);


      var contentData = await ContentService.fetchRouterObjectAndContent(params.url || '', (typeof document === "undefined" ? 'http' : ''));

    //if (!data || !data.news) throw new Error('Failed to load the news feed.');

    return {
      title: 'React Starter Kit',
      component:
        <Layout>
          <Home URL={params.url} />
        </Layout>,
    };
  },

};
