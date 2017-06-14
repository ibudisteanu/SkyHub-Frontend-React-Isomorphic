/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/12/2017.
 * (C) BIT TECHNOLOGIES
 */
import React from 'react';
import {connect} from "react-redux";


import AuthService from './../../../client/services/REST/authentication/Auth.service';
import HTTPService from './../../../client/services/Communication/http/Http.service';

import Forum from '../../../client/modules/forums/forums/models/Forum.model';
import ViewForum from './pages/ViewForum.component';

export class HomeContentPage extends React.Component {

  constructor(props){

    super(props);

  }

  renderForum(){
    return (
      <ViewForum />
    )
  }

  render() {

    console.log('@@@@',this.props.contentState.routerObject.type);

    switch (this.props.contentState.routerObject.type){
      case 'forum':
        return this.renderForum();
      case 'user':
        return this.renderForum();
      case 'topic':
        return this.renderForum();
    }

    return((<b>no valid content</b>));

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

export default connect(mapState, mapDispatch)(HomeContentPage);
