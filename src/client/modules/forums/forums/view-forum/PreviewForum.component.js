/**
 * Created by BIT TECHNOLOGIES on 5/28/2017.
 */

import React from 'react';
import {connect} from "react-redux";

import {newRouterObjectArgumentAction} from '../../../../../my-redux/actions/RouterState.actions';

import AuthService from '../../../../services/REST/authentication/Auth.service.js';
import ForumsService from '../../../../services/REST/forums/forums/Forums.service';

import Forum from '../models/Forum.model';

 class PreviewForum extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            forum: new Forum({title:"TEST FORUM",description:"DESCRIPTION"}),
            forumNotFound: false,
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
            <Alert danger>
                <h4>Forum NOT Found</h4>
                <strong>{this.props.forumURL||""}</strong> was not found. Probably the forum you are looking for doesn't exists or has been deleted.
            </Alert>
        )
    }

    setForumArgument(){

    }

    render() {


        return (
            <PanelContainer key={this.state.forum.id||'forumId'} controls={false} style={{marginBottom:0}}>

                <Link to={getPath( this, this.state.forum.URL )} onClick = {::this.setForumArgument}> >

                { ((this.state.forum !== null) && (this.state.forumNotFound === false))
                    ?
                    <Panel >
                        <PanelHeader className="forum-preview-cover" style={{backgroundImage: 'url('+this.state.forum.coverPic+')', backgroundColor: this.state.forum.coverColor||"#79B0EC"}}>
                            <Grid>
                                <Row>
                                    <Col xs={12} className='fg-white'>
                                        <h4>{this.state.forum.title}</h4>
                                        <h6>{this.state.forum.description}</h6>
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelHeader>
                        <PanelBody>
                            <Grid>
                                <Row>
                                    <Col xs={12}>
                                        <p>
                                            MISTO DE TOT
                                        </p>
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelBody>
                    </Panel>

                    :

                    ::this.renderError()

                }

                </Link>


            </PanelContainer>
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
