/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/18/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';

import PreviewTopic from '../view-topic/PreviewTopic.component';
import PreviewAllTopics from '../view-topic/PreviewAllTopics.component';

import Topic from '../models/Topic.model';

class PreviewNewTopic extends React.Component {

  constructor(props){
    super(props);

    this.state=({
      topic: new Topic({}),
    });
  }


  render() {

    this.state.topic = new Topic({
      title: this.props.title||'NO TITLE',
      description: this.props.description||'no description',
      attachments: this.props.attachments||[],
      keywords: this.props.keywords||[],
      authorId: this.props.authodId||'',

      preview: true,
    });

    return (

      <div style={{backgroundColor: "aliceblue"}}>

        <PreviewAllTopics hideHeader={true} topics={ [this.state.topic] } />

      </div>

    );
  }
}

export default (PreviewNewTopic);
