/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/9/2017.
 * (C) BIT TECHNOLOGIES
 */

/* eslint-disable import/prefer-default-export */

import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { newTestReduxValue1, newTestReduxValue2 } from './actions/TestRedux.actions';

/*@connect(state => ({
  userAuthenticated : state.userAuthenticated,
}))*/

class TestRedux extends React.Component {


  button1Click(e){

    this.props.newTestReduxValue1(this.props.testReduxValue1State+1);

  }

  button2Click(e){

    this.props.newTestReduxValue1(this.props.testReduxValue2State+5);

  }

  render() {

    console.log(this);

    return (
      <div>

        <button key="buttonRedux1" onClick={this.button1Click.bind(this)} > INC Val1 by 1</button>
        <button key="buttonRedux2" onClick={this.button2Click.bind(this)} > INC Val2 by 5</button> <br />

        Val 1 ====<b>{this.props.testReduxValue1State}</b> <br/> Val 2 ====<b>{this.props.testReduxValue1State}</b> <br />


      </div>
    );
  }
}


function mapState (state){

  return {
    testReduxValue1State: state.testReduxState.value1,
    testReduxValue2State: state.testReduxState.value2,

    testReduxState: state.testReduxState,
  }
};

function mapDispatch (dispatch) {
  return {
    newTestReduxValue1: bindActionCreators(newTestReduxValue1, dispatch),
    newTestReduxValue2: bindActionCreators(newTestReduxValue2, dispatch),
  }
};


export default connect(mapState , mapDispatch)(TestRedux);
