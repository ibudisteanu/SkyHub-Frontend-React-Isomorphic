/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/9/2017.
 * (C) BIT TECHNOLOGIES
 */


import React from 'react';
import PropTypes from 'prop-types';

class ChatButton extends React.Component {
  static propTypes = {

  };

  render() {
    return (
      <div id="small-chat">

        <span className="badge badge-warning pull-right">5</span>

        <a className="open-small-chat">

          <i className="fa fa-comments"></i>

        </a>

      </div>
  )
};
}

export default ChatButton;
