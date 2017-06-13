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

              <div className="row">

                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/1.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/1s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>FOARTE MISTO COOL</span></div>
                  </div>
                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/2.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/2s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>Maler<br />und<br />Tapezierarbeiten</span></div>
                  </div>
                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/3.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/3s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>Maler<br />und<br />Tapezierarbeiten</span></div>
                  </div>
                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>Maler<br />und<br />Tapezierarbeiten</span></div>
                  </div>
                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>Maler<br />und<br />Tapezierarbeiten</span></div>
                  </div>
                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/6.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/6s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>Maler<br />und<br />Tapezierarbeiten</span></div>
                  </div>
                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/7.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/7s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>Maler<br />und<br />Tapezierarbeiten</span></div>
                  </div>
                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/8.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/8s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>Maler<br />und<br />Tapezierarbeiten</span></div>
                  </div>
                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/9.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/9s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>Maler<br />und<br />Tapezierarbeiten</span></div>
                  </div>
                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/10.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/10s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>Maler<br />und<br />Tapezierarbeiten</span></div>
                  </div>
                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/11.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/11s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>Maler<br />und<br />Tapezierarbeiten</span></div>
                  </div>
                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/12.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/12s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>Maler<br />und<br />Tapezierarbeiten</span></div>
                  </div>
                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/13.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/1s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>Maler<br />und<br />Tapezierarbeiten</span></div>
                  </div>
                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/1.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/2s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>Maler<br />und<br />Tapezierarbeiten</span></div>
                  </div>
                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/1.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/3s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>Maler<br />und<br />Tapezierarbeiten</span></div>
                  </div>
                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/1.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>Maler<br />und<br />Tapezierarbeiten</span></div>
                  </div>
                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/1.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>Maler<br />und<br />Tapezierarbeiten</span></div>
                  </div>
                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/1.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/6s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>Maler<br />und<br />Tapezierarbeiten</span></div>
                  </div>
                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/1.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/7s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>Maler<br />und<br />Tapezierarbeiten</span></div>
                  </div>
                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/1.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/8s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>Maler<br />und<br />Tapezierarbeiten</span></div>
                  </div>
                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/1.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/9s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>Maler<br />und<br />Tapezierarbeiten</span></div>
                  </div>
                  <div className="image-caption-box">
                    <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/1.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/10s.jpg"/></a>
                    <div className="image-caption-box-h3"><span>Maler<br />und<br />Tapezierarbeiten</span></div>
                  </div>

              </div>

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
