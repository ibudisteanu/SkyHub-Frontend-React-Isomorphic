/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/24/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";

import AuthService from './../../../services/REST/authentication/Auth.service';
import ContentService from './../../../services/REST/forums/content/Content.service';

import ForumsButtons from './../../forums/components/ForumsButtons.component';

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

              <section id="team" className="gray-section team">

                <div className="container">
                  <div className="row m-b-lg">
                    <div className="col-lg-12 text-center">
                      <div className="navy-line"></div>
                      <h4>What's hot on SkyHub</h4>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 text-center m-t-lg m-b-lg">
                      {::this.renderContent()}
                    </div>
                  </div>


                </div>

              </section>

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
