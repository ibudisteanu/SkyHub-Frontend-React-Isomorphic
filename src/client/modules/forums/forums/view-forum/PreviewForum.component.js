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
          <a title="Forum not found" data-gallery="">
            <img style={{backgroundColor: "red"}} />
            <span>Forum not found!</span>
          </a>
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


                      <a href="http://webapplayers.com/inspinia_admin-v2.7.1/img/gallery/1.jpg" title={this.state.forum.title} data-gallery="">
                        <img src={this.state.forum.iconPic} style={{backgroundColor: this.state.forum.coverColor||"#79B0EC"}} />
                        <span>{this.state.forum.title}</span>
                      </a>

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
