/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/24/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";

import AuthService  from './../../../services/REST/authentication/Auth.service';

import AddForumForm from './../forums/components/AddForum.form.component'

export default class ButtonsContent extends React.Component {

    constructor(props){
        super(props);

        console.log("FORUM BUTTONS CONSTRUCTOR");
        this.state = {
            showAddTopicForm : props.showAddTopicForm||false,
            showAddForumForm : props.showAddForumForm||false,
            showAddReplyForm : props.showAddReplyForm||false,

            btnAddTopic : props.btnAddTopic||true,
            btnAddForum : props.btnAddForum||true,
            btnAddReply : props.btnAddReply||true,
        };

    }

    handleAddForum(e){
        //e.preventDefault(); e.stopPropagation();

        this.setState({
            showAddForumForm : true,
        });
    }

    handleAddTopic(e){
        e.preventDefault(); e.stopPropagation();
    }

    handleAddReply(e){
        e.preventDefault(); e.stopPropagation();
    }


    showAddForum(){
        console.log('a mers222');
        return (
            <AddForumForm/>
        )
    }

    showAddTopic(){
        return (
            <AddForumForm/>
        )
    }

    render() {

        return (
            <div className="row">
                {console.log(this.state)}
                <div style={{paddingTop:20}}>

                    {this.state.btnAddForum ? (
                        <button type="button" className="btn btn-warning dim btn-rounded" data-toggle="button" aria-pressed="true"  onClick={::this.handleAddForum} style={{marginRight: 5}} >
                            <i className="fa fa-users" style={{marginRight: 5}}  />
                            Forum
                        </button>
                    ) : '' }

                    {this.state.btnAddTopic ? (
                        <button type="button" className="btn btn-success dim btn-rounded" onClick={::this.handleAddTopic} style={{marginRight: 5}} >
                            <i className="fa fa-pencil" style={{marginRight: 5}}  />
                            Topic
                        </button>
                    ) : '' }

                    {this.state.btnAddReply ? (
                        <button type="button" className="btn btn-danger dim btn-rounded" onClick={::this.handleAddTopic} style={{marginRight: 5}} >
                            <i className="fa fa-comment" style={{marginRight: 5}}  />
                            Reply
                        </button>
                    ) : '' }

                </div>

                {this.state.showAddForumForm ? this.showAddForum() : ''}

            </div>
        );
    }
}
