/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import baseStyle from './NavigationMenu.css';
import Link from '../../../../../Link/Link';

class NavigationMenu extends React.Component {
  render() {
    return (
      <div className={baseStyle.root} role="navigation">
        <Link className={baseStyle.link} to="/about">About</Link>
        <Link className={baseStyle.link} to="/contact">Contact</Link>
        <span className={baseStyle.spacer}> | </span>
        <Link className={baseStyle.link} to="/login">Log in</Link>
        <span className={baseStyle.spacer}>or</span>
        <Link className={cx(baseStyle.link, baseStyle.highlight)} to="/register">Sign up</Link>
      </div>
    );
  }
}

export default withStyles(baseStyle)(NavigationMenu);
