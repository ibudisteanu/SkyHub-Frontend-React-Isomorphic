/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/24/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";

import AuthService from './../../../../client/services/REST/authentication/Auth.service';
import ForumsService from './../../../../client/services/REST/forums/forums/Forums.service';

import HeaderCover from './../../../../client/components/Template/Template-components/Header/Cover/HeaderCover.component';
import WebsiteHeaderCover from './../../../../client/components/Template/Template-components/Header/Cover/WebsiteHeaderCover.component';

import DisplayContent from './../../../../client/modules/forums/content/DisplayContent.component';

export class ViewForum extends React.Component {

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

        console.log("%%%%%%%%%%% VIEW FORUM " , this.props.contentState.routerObject);

        return (
            <div>

                { ((this.props.contentState.routerObject.object !== null) && (this.props.contentState.routerObject.notFound === false))
                    ?
                    <HeaderCover title={this.props.contentState.routerObject.object.title||""}
                                 subTitle={this.props.contentState.routerObject.object.description||""}
                                 icon={this.props.contentState.routerObject.object.iconPic||""}
                                 cover={this.props.contentState.routerObject.object.coverPic||''}
                                 coverColor={this.props.contentState.routerObject.object.coverColor||''}
                                 breadcrumbs={this.props.contentState.routerObject.object.breadcrumbs||[]}
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

export default connect(mapState, mapDispatch)(ViewForum);
