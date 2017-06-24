/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/21/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";

import AuthService from './../../../../client/services/REST/authentication/Auth.service';
import ForumsService from './../../../../client/services/REST/forums/forums/Forums.service';

import HeaderCover from './../../../../client/components/Template/Template-components/Header/Cover/HeaderCover.component';
import WebsiteHeaderCover from './../../../../client/components/Template/Template-components/Header/Cover/WebsiteHeaderCover.component';

import Topic from './../../../../client/modules/forums/topics/models/Topic.model';
import ShowDate from '../../../../client/components/util-components/UI/show-date/ShowDate.component';

import DisplayTopicContent from '../../../../client/modules/forums/topics/view-topic/DisplayTopicContent.component';

export class ViewTopic extends React.Component {

  constructor(props){
    super(props);
  }


  renderTopic(){

    let sImage = Topic.getImage(this.props.topic);

    return (
      <div  className="anchor col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1 col-xxs-12 col-xxs-offset-0 col-tn-12 col-tn-offset-0" style={{paddingLeft: 40, paddingBottom: 20}}>


        {
          /*
           <a href="http://skyhub.me/profile/muflonel2000">
           <img className="avatar-topic-question-image" src="http://skyhub.me/uploads/images/avatars/57ddb59508e581fc1200006e/muflonel-1474148373-19926_50.jpg" alt="George Muflonel">
           </a>

           <img className="avatar-topic-question-circle" src="http://skyhub.me/theme/assets/images/user/offline.png" alt="offline" />
           */
        }

        {
          /*
           <div id="Vote58f7e46bc24edd8c07016631" className="upvote voting-topic-question">
           <a className="upvote upvote-on upvote-enabled" title="This is good stuff. Vote it up! (Click again to undo)"></a>
           <span className="count" title="Total number of votes">0</span>
           <a className="downvote  upvote-enabled" title="This is not useful. Vote it down. (Click again to undo)"></a>
           <a className="star  upvote-enabled" title="Mark as favorite. (Click again to undo)"></a>
           </div>
           */
        }


        <div className="topic-question" style={{overflow: "hidden"}} >

          <time className="date information" datetime="2016-Dec-04 00:07" data-toggle="tooltip" data-placement="left" title="" data-original-title="2016-Dec-04 00:07"><i className="fa fa-clock-o"></i> 6m  20d </time>
          <span className="views information" data-toggle="tooltip" data-placement="left" title="" data-original-title="Views 468"><i className="fa fa-eye"></i> 468</span>
          <span className="unique-views information" data-toggle="tooltip" data-placement="left" title="" data-original-title="Unique Views 216"><i className="fa fa-eye-slash"></i> 216</span>

          <a className="topic-question-header author" href="http://skyhub.me/profile/muflonel2000"> George Muflonel</a>

          <h1>
            {Topic.getTitle(this.props.topic)||""}
          </h1>

          <div className="formHeadLine"> </div>

          <div className="articleContent anchor">
            <div className="container-fluid topic-question-body">



              { (sImage !== '')
                ?
                <a href="https://media.giphy.com/media/dzaUX7CAG0Ihi/giphy.gif">
                  <img src={sImage} alt={Topic.getTitle(this.props.topic)||'no title'} className="topic-question-image" />
                </a>
                :
                ''
              }

              <p>{this.props.topic.description} </p>

            </div>
          </div>


          <div className="topic-question-footer">
            <div className="col-xs-12 col-sm-5 topic-question-footer-buttons" style={{overflow: "hidden"}}>
              <a id="addReplyButton_58435025f23ffe11318b4577" className="btn btn-primary btn-circle" style={{width: "initial"}}>
                <i className="fa fa-comment btn-circle-icon" style={{margin: "0 8px 0 8px"}}> <div className="btn-circle-text">Reply</div> </i>
              </a>            </div>

            <div className="col-xs-12 col-sm-7 topic-question-footer-later-edit" style={{textAlign: "right"}}>
              <ShowDate date={this.props.topic.dtCreation} />
              by <i className="glyphicon glyphicon-user"></i> <span> <a href="http://skyhub.me/profile\admin&quot;">Alexandru Ionut Budisteanu</a> </span>                </div>
          </div>

        </div>

      </div>

    )
  }

  renderError(){
    return (
      <div className="row">

        <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <div className="alert alert-danger ">
            <h4 style={{textAlign: "center"}}>Forum <strong>NOT Found</strong></h4>
            <strong>{this.props.URL||"/"}</strong> was not found. Probably what you've been looking for doesn't exists or has been deleted in the mean while.
          </div>
        </div>

      </div>
    )
  }

  render() {

    console.log("%%%%%%%%%%% VIEW TOPIC " , this.props.contentState.routerObject);

    let parent = this.props.contentState.routerParentObject.object;

    return (
      <div>

        { ((this.props.topic !== null) && (this.props.contentState.routerObject.notFound === false))
          ?
          <WebsiteHeaderCover title={Topic.getTitle(this.props.topic)||""}
                              subTitle=" "
                              icon={ parent !== null ? parent.iconPic : ""}
                              cover={parent !== null ? parent.coverPic : ''}
                              coverColor={parent !== null ? parent.coverColor :''}
                              breadcrumbs={this.props.topic.arrBreadcrumbs||[]}
                              url={this.props.topic.URL}
          />

          :

          <WebsiteHeaderCover />
        }




        <div style={{position: 'relative', zIndex: 2}}>

          {this.props.topic !== null ? ::this.renderTopic() : ::this.renderError}

        </div>

        <DisplayTopicContent />

      </div>
    )
  }
}

function mapState (state){
  return {
    userAuthenticated: state.userAuthenticated,
    contentState: state.contentState,
    topic: state.contentState.routerObject.object,
  }
};

function mapDispatch (dispatch) {
  return {
    dispatch : dispatch,
  }
};

export default connect(mapState, mapDispatch)(ViewTopic);
