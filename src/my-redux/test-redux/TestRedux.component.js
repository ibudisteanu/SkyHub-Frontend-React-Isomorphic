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

@connect(
  state => (console.log('STATE @connect',state),{
    testReduxState: state.testReduxState.value1,
    runtime: state.testReduxState.runtime,
  },
  dispatch => ({dispatch})
))
class TestRedux extends React.Component {

  constructor (props){
    super(props);
  }


  button1Click(e){

    //this.newTestReduxValue1(this.props.testReduxState.value1+1);
    this.props.dispatch(newTestReduxValue1(this.props.testReduxState.value1+1));

  }

  button2Click(e){

    //this.props.newTestReduxValue2(this.props.testReduxState.value2+5);
    this.props.dispatch(newTestReduxValue2(this.props.testReduxState.value2+5));

  }

  renderStatus () {
    return (
      <div>
        NASOL

      </div>
    );
  }

  render() {

    console.log('---');console.log('---');console.log('---');console.log('---');
    console.log(this);

    return (
      <div>

        <button key="buttonRedux1" onClick={this.button1Click.bind(this)} > INC Val1 by 1</button>
        <button key="buttonRedux2" onClick={this.button2Click.bind(this)} > INC Val2 by 5</button> <br />


        {this.props.testReduxState !== null ? (this.renderStatus.bind(this)) : 'KKKT'}

        Val 1 ====<b>{this.props.testReduxState.value1}</b> <br/> Val 2 ====<b>{this.props.testReduxState.value2}</b> <br />


      </div>
    );
  }
}


function mapState (state){

  return {
    testReduxState: state.testReduxState,
  }

};

function mapDispatch (dispatch) {
  return {

    dispatch : dispatch,
  }
};


export default /*connect(mapState, mapDispatch)*/(TestRedux);
