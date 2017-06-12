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
                <HeroHeader>
                    <span>{this.props.routerState.currentRouterObject.object.title}</span>
                </HeroHeader>

            </div>

        )
    }

    renderError(){
        return (
            <Alert danger>
                <h4>Forum NOT Found</h4>
                <strong>{this.props.params.forumURL||""}</strong> was not found. Probably the forum you are looking for doesn't exists or has been deleted.
            </Alert>
        )
    }

    render() {

        console.log("%%%%%%%%%%% VIEW FORUM " , this.props.routerState.currentRouterObject.object);

        return (
            <div>

                { ((this.props.routerState.currentRouterObject.object !== null) && (this.props.routerState.currentRouterObject.objectNotFound === false))
                    ?
                    <HeaderCover title={this.props.routerState.currentRouterObject.object.title||""}
                                 subTitle={this.props.routerState.currentRouterObject.object.description||""}
                                 icon={this.props.routerState.currentRouterObject.object.iconPic||""}
                                 cover={this.props.routerState.currentRouterObject.object.coverPic||''}
                                 backgroundColor={this.props.routerState.currentRouterObject.object.coverColor||''} />

                    :

                    <WebsiteHeaderCover />
                }


                <Hero style={{position: 'relative', zIndex: 2}}>

                    {this.props.routerState.currentRouterObject.object !== null ? ::this.renderForum() : ::this.renderError}

                </Hero>

                <DisplayContent/>


            </div>
        )
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

export default connect(mapState, mapDispatch)(ViewForum);
