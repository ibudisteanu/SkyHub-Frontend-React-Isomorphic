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

import TestRedux from '../../../../../my-redux/test-redux/TestRedux.component';



class Body extends React.Component {

  static propTypes = {

  };


  componentDidMount() {
    requestAnimationFrame(() => { //Make sure it is on client only

      this.SocketService = require('./../../../../services/Communication/socket/socket.service').default.SocketService;
      console.log("~~~~~~~~~BODY->SOCKETSERVICE",this.SocketService,this);

    });
  }


  render() {
    return (
      <div className={baseStyle.root}>

        <LeftSidebar />

        <div id="page-wrapper" className="gray-bg" style={{minHeight: 785}}>

          <Header />

          <Content>
            {this.props.children}
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
