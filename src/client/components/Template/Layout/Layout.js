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

// external-global styles must be imported in your JS.

import Body from '../Template-components/Body';
import Feedback from '../../Feedback/Feedback';

import {connect} from 'react-redux';

import {startLocalizationFetchingAsync} from './../../../../my-redux/actions/Localization.actions';

class Layout extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  static contextTypes = {
    SocketService : PropTypes.object,
    AuthService : PropTypes.object,
  };

  static childContextTypes = {
    userAuthenticated: PropTypes.any,
  };


  getChildContext() {
    return {
      userAuthenticated: this.props.userAuthenticated,
    }
  };

  constructor(props){

    super(props);
  }

  async componentDidMount() {
   // this.props.dispatch(startLocalizationFetchingAsync());

    requestAnimationFrame(() => { //Make sure it is on client only



    });

  }


  render() {

    //console.log("################### Layout",this);


    return (
      <div id="wrapper">



        <Body>
          Country: {this.props.localization.country}

          {this.props.children}

        </Body>



        <Feedback />

      </div>
    );
  }
}



function mapState (state){
  return {
    localization: state.localization,
    userAuthenticated: state.userAuthenticated,
  }
};

function mapDispatch (dispatch) {
  return {
    dispatch : dispatch,
  }
};


export default connect(mapState, mapDispatch)(Layout);

