/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/18/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";

import {newRouterObjectArgumentAction} from '../../../../../my-redux/actions/RouterState.actions';

import AuthService from '../../../../services/REST/authentication/Auth.service.js';
import ForumsService from '../../../../services/REST/forums/forums/Forums.service';

import Topic from '../models/Topic.model';
import Link from '../../../../components/Link/Link';

/*
 PreviewTopic can also work with a prop id="1_frm_3333", and it fetch automatically the forum from you
 */

class PreviewTopic extends React.Component {

  constructor(props){
    super(props);
  }

  renderError(){
    return (
      <a title="Forums not found" data-gallery="">
        <img style={{backgroundColor: "red"}} />
        <span>Forum not found!</span>
      </a>
    )
  }

  setTopicArgument(){

  }

  render() {

    console.log("preview topic",this.props.topic);

    return (


        <tr>
            <td id={"TopicTable_"+this.props.topic.id} className="anchor">

              <div className="anchor" style={{paddingLeft:42}}>

                  <a href={this.props.topic.URL||''}>
                    <img className="table-forums-topic-image" src="https://citation-beweb.netdna-ssl.com/img/compose.png" alt={this.props.topic.title||'no title'} />
                  </a>

                  <a href={this.props.topic.URL||''}>
                    <h4 className="table-forums-topic-title">{this.props.topic.title||'no title'}</h4>

                    <br />

                    <p className="table-forums-topic-body">
                      {this.props.topic.description||'no description'}
                    </p>

                  </a>

              </div>


              <div style={{display: "inline"}}>
                {/*
                AUTHOR avatar
                */}
              </div>

              <span className="time" data-toggle="tooltip" data-placement="right" title="2017-Apr-22 10:56"><i className="fa fa-clock-o"></i> 1m  27d </span>
              <br />

              <div className="topic-question-footer">

              </div>

            </td>
            <td>1<br /> </td>
            <td>5<br /> </td>
        </tr>
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

export default connect(mapState, mapDispatch)(PreviewTopic);
