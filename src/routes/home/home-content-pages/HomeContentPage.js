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

  componentDidMount (){

    //I have a forumURL to process

    // let URL = this.props.params.forumURL || '';
    //
    // this.ForumsService.getForumAsync(forumURL).then ( (forumAnswer) => {
    //
    //     this.props.dispatch(newRouterForumArgumentAction(forumAnswer, (forumAnswer !== null) ));
    //
    // });

  }

  renderForum(){
    //console.log("%%%%%%%%%%%RENDER FORUM ",this.props.object);

    return (
      <ViewForum />
    )
  }

  render() {

    console.log('@@@@',this.props.routerState.currentRouterObject.type);

    switch (this.props.routerState.currentRouterObject.type){
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
    routerState: state.routerState,
  }
};

function mapDispatch (dispatch) {
  return {
    dispatch : dispatch,
  }
};

export default connect(mapState, mapDispatch)(HomeContentPage);
