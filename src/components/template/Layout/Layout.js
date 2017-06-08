/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import localCSS from './Layout.css';
import Body from '../template-components/Body/Body';
import Feedback from '../../Feedback/Feedback';
import Footer from '../template-components/Footer/Footer';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div id="wrapper">

        <Body />

        {this.props.children}

        <Feedback />

        <Footer />
      </div>
    );
  }
}

export default withStyles(localCSS)(Layout);
