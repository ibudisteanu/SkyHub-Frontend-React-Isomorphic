/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import {startLocalizationFetchingAsync} from '~store/actions/Localization.actions';

// The top-level (parent) route
export default {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [

    require('./contact').default,
    require('./login').default,
    require('./register').default,
    require('./about').default,
    require('./privacy').default,
    require('./admin').default,

    require('./testing').default,

    require('./home').default,

    // Wildcard routes, e.g. { path: '*', ... } (must go last)
    require('./notFound').default,
  ],

  async action({ next, store }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'SkyHub Social Network'} - www.skyhub.me`;
    route.description = route.description || '';

    return route;
  },

};
