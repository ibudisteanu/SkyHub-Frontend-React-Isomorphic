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

//import Register from './Register';
import Register from './../../client/modules/users/authentication/registration/registration.form';

const title = 'New User Registration';

export default {

  path: '/register',

  action() {
    return {
      title,
      component:
        <Layout>
          <Register title={title} />
        </Layout>,
    };
  },

};
