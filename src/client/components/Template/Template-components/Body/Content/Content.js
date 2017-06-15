/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/8/2017.
 * (C) BIT TECHNOLOGIES
 */


import React from 'react';
import PropTypes from 'prop-types';

class Content extends React.Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="wrapper wrapper-content" style={{display: "inline-block"}}>

        {this.props.children}

      </div>
    )
  };
}

export default Content;
