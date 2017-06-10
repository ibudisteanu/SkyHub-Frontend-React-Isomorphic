

import React from 'react';
import Link from '../../../../../Link/Link';
import {connect} from 'react-redux';

import AuthenticatedHeaderNavigationMenu from './AuthenticatedHeaderNavigationMenu';
import NotAuthenticatedHeaderNavigationMenu from './NotAuthenticatedHeaderNavigationMenu';

class NavigationMenu extends React.Component {

  renderNavigationAuthenticated(){

    return(
      <AuthenticatedHeaderNavigationMenu />
    )

  }

  renderNavigationNotAuthenticated(){

    return (
      <NotAuthenticatedHeaderNavigationMenu />
    )

  }

  render() {

    return (

      <div>

        { this.props.userAuthenticated.user.isLoggedIn() ? ::this.renderNavigationAuthenticated() : ::this.renderNavigationNotAuthenticated() }

      </div>


    );
  }
}

function mapState (state){
  return {
    userAuthenticated : state.userAuthenticated,
  }
};

function mapDispatch (dispatch) {
  return {
    dispatch : dispatch,
  }
};


export default connect(mapState, mapDispatch)(NavigationMenu);
