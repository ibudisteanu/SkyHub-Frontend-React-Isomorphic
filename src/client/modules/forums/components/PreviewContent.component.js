/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/4/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";
import { Link, withRouter } from 'react-router';

import {getPath} from 'common/common-functions';
import { AuthService } from 'modules/services/REST/authentication/auth.service';
import { ContentObjectService } from 'modules/services/REST/forums/content/ContentObject.service';

import {Forum} from '../forums/models/Forum.model.js';
import {PreviewForum} from '../forums/view-forum/PreviewForum.component';

@withRouter
@connect(
    state => ({
        userAuthenticated : state.userAuthenticated,
    }),
    dispatch => ({dispatch}),
)
export class PreviewContent extends React.Component {

    constructor(props){
        super(props);

    }

    renderForum(){
        let forum = new Forum(this.props.object);

        return (
            <PreviewForum key={forum.id} forum = {forum} />
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
