/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/24/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";

import AuthService from './../../../services/REST/authentication/Auth.service';
import ContentService from './../../../services/REST/forums/content/Content.service';

import ButtonsContent from '../components/ContentButtons.component';

import PreviewContent from '../components/PreviewContent.component';

class DisplayContent extends React.Component {

    constructor(props){
        super(props);

    }


    renderContent() {
        const objects = this.props.contentState.contentObjects.objects;
        if ((objects === null)||(typeof objects === "undefined")) return '';

        return (
            objects.map((object) =>
                <PreviewContent key={object.id} object={object}></PreviewContent>
            )
        );
    }

    render() {

        return (
            <div style={{marginBottom:0}}>



                <ButtonsContent />


                <div className="row" style={{paddingBottom: 20}}>
                  <div className="text-center">
                    <div className="navy-line"></div>
                    <h3 style={{fontSize:30}}>What's hot on SkyHub</h3>
                  </div>
                </div>

                <div className="row">

                    {::this.renderContent()}

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

export default connect(mapState, mapDispatch)(DisplayContent);
