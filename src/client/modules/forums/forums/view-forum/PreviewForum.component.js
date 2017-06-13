/**
 * Created by BIT TECHNOLOGIES on 5/28/2017.
 */

import React from 'react';
import {connect} from "react-redux";

import {newRouterObjectArgumentAction} from '../../../../../my-redux/actions/RouterState.actions';

import AuthService from '../../../../services/REST/authentication/Auth.service.js';
import ForumsService from '../../../../services/REST/forums/forums/Forums.service';

import Forum from '../models/Forum.model';

/*
    PreviewForum can also work with a prop id="1_frm_3333", and it fetch automatically the forum from you
 */

 class PreviewForum extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            forum: props.forum || (new Forum({title:"TEST FORUM",description:"DESCRIPTION"})),
            forumNotFound: props.forumNotFound||false,
        };
    }

    componentDidMount (){

        if (typeof this.props.forum !== "undefined"){
            this.setState({
                forum: new Forum(this.props.forum),
                forumNotFound: this.props.forum === null,
            });
            return;
        }

        if (typeof this.props.id !== "undefined"){
            let forumId = this.props.id || '';

            ForumsService.getForumAsync(forumId).then ( (forumAnswer) => {

                this.setState({
                    forum: forumAnswer,
                    forumNotFound : (forumAnswer !== null),
                })

            });
        }

    }

    renderError(){
        return (
          <div className="row">

            <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
              <div className="alert alert-danger ">
                <h4 style={{textAlign: "center"}}>NOT Found</h4>
                <strong>{this.props.URL||"/"}</strong> was not found. Probably what you've been looking for doesn't exists or has been deleted in the mean while.
              </div>
            </div>

          </div>
        )
    }

    setForumArgument(){

    }

    render() {


        return (

            <div >

                {
                  ((this.state.forum !== null) && (this.state.forumNotFound === false))

                  ?

                    <div className="lightBoxGallery">
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/1.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/1s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/2.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/2s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/3.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/3s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/6.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/6s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/7.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/7s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/8.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/8s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/9.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/9s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/10.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/10s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/12.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/12s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/6.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/6s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/7.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/7s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/2.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/2s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/3.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/3s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/1.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/1s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/9.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/9s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/10.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/10s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/11.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/11s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/12.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/12s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/6.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/6s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/12.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/12s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/10.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/10s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/1.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/1s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/2.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/2s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/3.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/3s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/6.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/6s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/7.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/7s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/8.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/8s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/9.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/9s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/10.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/10s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/11.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/11s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/12.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/12s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/6.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/6s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/7.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/7s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/2.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/2s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/3.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/3s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/1.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/1s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/9.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/9s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/10.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/10s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/11.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/11s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/12.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/12s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/7.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/7s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/8.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/8s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/9.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/9s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/10.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/10s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/11.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/11s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/12.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/12s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/6.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/6s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/12.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/12s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/4s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/5s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/10.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/10s.jpg"/></a>
                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/11.jpg" title="Image from Unsplash" data-gallery=""><img src="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/11s.jpg"/></a>


                      <div className="sub-category-box">

                        <div className="info-box-icon bg-white" style={{backgroundImage: 'url('+this.state.forum.coverPic+')', backgroundColor: this.state.forum.coverColor||"#79B0EC"}} >
                          <span className="sub-category-box-text">{this.state.forum.title}</span>
                        </div>

                      </div>

                    </div>



                    :

                    ::this.renderError()

                }


            </div >
        );
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

export default connect(mapState, mapDispatch)(PreviewForum);
