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
import { Provider as ReduxProvider } from 'react-redux';

import {connect} from 'react-redux';

const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  // Universal HTTP client
  fetch: PropTypes.func.isRequired,
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  ...ReduxProvider.childContextTypes,
};

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */
class App extends React.PureComponent {

  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired,

    SocketService: PropTypes.object,
  };

  static childContextTypes = ContextType;

  constructor(props){

    super(props);

  }

  getChildContext() {
    return this.props.context;
  }

  bInitialized = false;

  initializeClientApp(){

    if (this.bInitialized) return;
    this.bInitialized = true;

    console.log("APP",this.props);

    var SocketServiceFile = require('./services/Communication/socket/socket.service').default;

    var SocketService = SocketServiceFile.SocketService;
    SocketService.startService(this.props.context.store.dispatch);

    var AuthServiceFile = require ('./services/REST/authentication/auth.service').default;
    var AuthService = AuthServiceFile.AuthService;
    AuthService.startService(this.props.context.store.dispatch, SocketService);

    //this.props.context.SocketService = SocketService;

/*    React.Children.map(this.props.children, (child, i) => {
      // Ignore the first child

      child.context.SocketService = SocketService;

      if (i < 1) return
      return child
    });*/

    // React.Children.forEach(this.props.children, function(thisArg){
    //
    //   //console.log(thisArg);
    //   thisArg.props.SocketService = '555';
    //
    // });

    // this.props.children.forEach( function(child){
    //
    //   child.componentDidMountClient();
    //
    // });
  }

  componentDidMount(){

    requestAnimationFrame(() => { //Make sure it is on client only

      this.setState({appIsMounted: true});

    });
  }

  render() {
    if (process.env.BROWSER) {
      console.log("APP RENDERED FIRST");
      this.initializeClientApp();
    }
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    return React.Children.only(this.props.children);
  }

}



export default (App);
