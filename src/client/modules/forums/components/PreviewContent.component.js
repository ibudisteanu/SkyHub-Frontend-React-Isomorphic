/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/4/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";

import  AuthService  from './../../../services/REST/authentication/Auth.service';
import  ContentObjectService  from '../../../services/REST/forums/content/ContentObject.service';

import Forum from '../forums/models/Forum.model';
import PreviewForum from '../forums/view-forum/PreviewForum.component';

class PreviewContent extends React.Component {

    constructor(props){
        super(props);

    }

    renderForum(){
        let forum = new Forum(this.props.object);

        return (
            <PreviewForum key={forum.id} forum={forum} />
        )
    }

    render() {

        let extractedIdData = ContentObjectService.extractDataFromIds(this.props.object.id);
        let objectType = extractedIdData.objectType || '';

        switch (objectType){
            case 'frm':
                return this.renderForum();
            case 'us':
                return this.renderForum();
            case 'top':
                return this.renderForum();
        }

    }
}

function mapState (state){
  return {
    userAuthenticated: state.userAuthenticated,
  }
};

function mapDispatch (dispatch) {
  return {
    dispatch : dispatch,
  }
};

export default connect(mapState, mapDispatch)(PreviewContent);
