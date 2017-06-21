/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/21/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";

import AuthService from './../../../../client/services/REST/authentication/Auth.service';
import ForumsService from './../../../../client/services/REST/forums/forums/Forums.service';

import HeaderCover from './../../../../client/components/Template/Template-components/Header/Cover/HeaderCover.component';
import WebsiteHeaderCover from './../../../../client/components/Template/Template-components/Header/Cover/WebsiteHeaderCover.component';

import Topic from './../../../../client/modules/forums/topics/models/Topic.model';

import DisplayContent from './../../../../client/modules/forums/content/DisplayContent.component';

export class ViewTopic extends React.Component {

  constructor(props){
    super(props);
  }


  renderForum(){
    return (
      <div>
        <h1>
          <span>{this.props.contentState.routerObject.object.title}</span>
        </h1>

      </div>

    )
  }

  renderError(){
    return (
      <div className="row">

        <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <div className="alert alert-danger ">
            <h4 style={{textAlign: "center"}}>Forum <strong>NOT Found</strong></h4>
            <strong>{this.props.URL||"/"}</strong> was not found. Probably what you've been looking for doesn't exists or has been deleted in the mean while.
          </div>
        </div>

      </div>
    )
  }

  render() {

    console.log("%%%%%%%%%%% VIEW TOPIC " , this.props.contentState.routerObject);

    let parent = this.props.contentState.routerParentObject.object;

    return (
      <div>

        { ((this.props.contentState.routerObject.object !== null) && (this.props.contentState.routerObject.notFound === false))
          ?
          <WebsiteHeaderCover title={Topic.getTitle(this.props.contentState.routerObject.object)||""}
                              subTitle=" "
                              icon={ parent !== null ? parent.iconPic : ""}
                              cover={parent !== null ? parent.coverPic : ''}
                              coverColor={parent !== null ? parent.coverColor :''}
                              breadcrumbs={this.props.contentState.routerObject.object.arrBreadcrumbs||[]}
                              url={this.props.contentState.routerObject.object.URL}
          />

          :

          <WebsiteHeaderCover />
        }


        <div style={{position: 'relative', zIndex: 2}}>

          {this.props.contentState.routerObject.object !== null ? ::this.renderForum() : ::this.renderError}

        </div>

      </div>
    )
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

export default connect(mapState, mapDispatch)(ViewTopic);
