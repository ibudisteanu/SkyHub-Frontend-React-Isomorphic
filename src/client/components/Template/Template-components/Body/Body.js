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
import baseStyle from './Body.css';
import Link from '../../../Link/Link';

import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';

import PropTypes from 'prop-types';

import Header from '../Header/Header';
import LeftSidebar from './Left-sidebar/LeftSidebar';
import RightSidebar from './Right-sidebar/RightSidebar';
import Content from './Content/Content';
import Footer from '../Footer/Footer';

import Chat from './Chat/Chat';
import ChatButton from './Chat/ChatButton';


import AuthenticationModal from '../../../../modules/users/authentication/modals/Authentication.modal';

class Body extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = {
    refAuthenticationModal: PropTypes.any,
  };

  getChildContext() {
    return {
      refAuthenticationModal: this.refAuthenticationModal,
    }
  };

  componentDidMount() {
    requestAnimationFrame(() => { //Make sure it is on client only



    });
  }

  refAuthenticationModal = null;

  render() {
    //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX BODYY", this);
    return (
      <div className={baseStyle.root}>

        <LeftSidebar />

        <div id="page-wrapper" className="gray-bg" style={{minHeight: 785}}>

          <Header />

          <Content>
            {this.props.children}

            <AuthenticationModal ref={(c) => this.refAuthenticationModal = c}  />

          </Content>


        </div>
        <Footer />

        <Chat />
        <ChatButton />
        <RightSidebar />

      </div>
    );
  }
}

export default withStyles(baseStyle)(Body);
