/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/19/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';

export default class ShowDate extends React.Component {

  constructor(props) {
    super(props);
  }

  calculateDateDiff() {

    let dateNow = new Date();

    let diffDate = Math.abs(dateNow.getTime() - this.props.date.getTime());

    let diffDays = diffDate.getDate();
    let diffMonths = diffDate.getMonth();
    let diff = diffDate.getMonth();

  }

  render(){

    return (

      <span className="time" data-toggle="tooltip" data-placement="right" title={this.props.date.toString()}> <i className="fa fa-clock-o"></i> 1m  27d </span>


    );

  }

}
