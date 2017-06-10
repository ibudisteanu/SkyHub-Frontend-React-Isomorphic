/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../client/components/Template/Layout';

//import Login from './Login';
import Login from './../../client/modules/users/authentication/login/login.page';

const title = 'Log In';

export default {

  path: '/login',

  action() {
    return {
      title,
      component:
        <Layout>
          <Login title={title} />
        </Layout>,
    };
  },

};
