/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import baseStyle from './Header.css';
import Link from '../../../Link/Link';
import Navigation from './top-navbar/Navigation/Navigation';
import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';

import TopNavbar from './top-navbar/TopNavbar';
import LeftSidebar from './left-sidebar/LeftSidebar';

class Header extends React.Component {
  render() {
    return (
      <div className={baseStyle.root}>

        <LeftSidebar />



      </div>
    );
  }
}

export default withStyles(baseStyle)(Header);
