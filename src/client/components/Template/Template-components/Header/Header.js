/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';

import Link from '../../../Link/Link';

import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';

import TopNavbar from './Top-navbar/TopNavbar';

class Header extends React.Component {
  render() {
    return (

        <div className="row border-bottom">
          <TopNavbar />
        </div>

    );
  }
}

export default Header;
