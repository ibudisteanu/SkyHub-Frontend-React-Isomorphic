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
      <div className="wrapper wrapper-content">

        <div className="col-xl-8 col-xl-offset-2 col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12" style={{padding:0}}>
          {this.props.children}
        </div>

      </div>
    )
  };
}

export default Content;
