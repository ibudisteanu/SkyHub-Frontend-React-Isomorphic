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

import DisplayContent from "../../client/modules/forums/content/DisplayContent.component";
import HomeContentPage from "./home-content-pages/HomeContentPage";

import AuthenticatedHome from './home/authenticated/Authenticated-home.component';
import NotAuthenticatedHome from './home/NotAuthenticatedHome.component';

import {connect} from 'react-redux';

class Home extends React.Component {

  static propTypes = {
      URL: PropTypes.string,
  };

  renderError(){
    return (
      <div className="row">

        <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <div className="alert alert-danger ">
            <h4 style={{textAlign: "center"}}>NOT Found</h4>
            <strong>{this.props.URL||"/"}</strong> was not found. Probably what you've been looking for doesn't exists or has been deleted in the mean while.
          </div>
        </div>

      </div>
    )
  }

  renderSimpleWebsite(){

    return (

      <div>
        {
          this.props.userAuthenticated.user.isLoggedIn()
            ?
              <AuthenticatedHome />

            :

            <NotAuthenticatedHome />
        }

      </div>

    )
  }

  renderHomepageComponent(){

    return (
      <HomeContentPage  />
    )

  }

  render() {
    return (
      <div>

        {this.props.contentState.routerObject.object === null ? ::this.renderSimpleWebsite() : ::this.renderHomepageComponent()}

        {this.props.contentState.routerObject.notFound ? ::this.renderError() : ' A FOST GASIT'}


        <DisplayContent />

      </div>
    );
  }
}


function mapState (state){
  return {
    userAuthenticated: state.userAuthenticated,
    contentState: state.contentState,
  }
};

function mapDispatch (dispatch) {
  return {
    dispatch : dispatch,
  }
};

export default connect(mapState, mapDispatch)(Home);
