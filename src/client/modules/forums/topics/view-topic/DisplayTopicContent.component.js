/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/21/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";

import AuthService from '~services/REST/authentication/Auth.service';
import ContentService from '~services/REST/forums/content/Content.service';

import ContentButtons from '../../components/ContentButtons.component';

import PreviewContent from '../../components/PreviewContent.component';
import PreviewAllTopics from './PreviewAllTopics.component';

class DisplayTopicContent extends React.Component {

  constructor(props){
    super(props);

  }

  getForumId(){
    if (this.props.contentState.routerObject.object === null) return '';
    else
      return this.props.contentState.routerObject.object.id;
  }

  getForumName(){
    if (this.props.contentState.routerObject.object === null) return '';
    else
      return this.props.contentState.routerObject.object.name||this.props.contentState.routerObject.object.title;
  }

  getForumTitle(){
    if (this.props.contentState.routerObject.object === null) return 'SkyHub';
    else
      return this.props.contentState.routerObject.object.name||this.props.contentState.routerObject.object.title;
  }

  render() {

    return (
      <div className="col-xl-6 col-xl-offset-3 col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12" style={{padding:0, marginBottom:0}}>

        <div className="row" style={{paddingBottom: 20, paddingTop:20}}>
          <ContentButtons parentId={::this.getForumId()} parentName={::this.getForumName()} style={{textAlign: "center", paddingBottom:20}}/>
        </div>

        <div className="row" style={{paddingBottom: 20}}>

          <PreviewAllTopics title={::this.getForumTitle()} topics={this.props.contentState.contentObjects.objects} />

        </div>


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

export default connect(mapState, mapDispatch)(DisplayTopicContent);
